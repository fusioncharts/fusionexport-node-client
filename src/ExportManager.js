const WebSocket = require('ws');
const { EventEmitter } = require('events');
const fs = require('fs-extra');
const path = require('path');
const ExportConfig = require('./ExportConfig');
const config = require('./config.js');
const logger = require('./logger');

const EXPORT_DATA = 'EXPORT_DATA:';
const EXPORT_EVENT = 'EXPORT_EVENT:';

class ExportManager extends EventEmitter {
  constructor(options) {
    super();
    this.outputData = null;
    this.isError = false;
    this.config = options ? Object.assign({}, config, options) : config;
    this.url = `${this.config.host}:${this.config.port}`;
    this.client = null;
    this.clientName = undefined;
  }

  emitData(target, method, exportConfig) {
    const options = exportConfig.getFormattedConfigs();
    const message = `${target}.${method}<=:=>${options}`;
    const buffer = Buffer.from(message, 'utf8');
    this.client.send(buffer, (err) => {
      if (err) {
        this.emit('error', err);
      }
    });
  }
  setWSSClient(cb, secured) {
    this.client = new WebSocket(`ws${secured ? 's' : ''}://${this.url}`, { rejectUnauthorized: false });
    cb();
  }
  setClient(cb) {
    if(this.config.isSecure) {
      const client = new WebSocket(`wss://${this.url}`, { rejectUnauthorized: false });
      let timeOut, secured = false;
      client.on('error', () => {
        console.warn('Warning: HTTPS server not found, overriding requests to an HTTP server.');
        client.close();
      })
      const onOpen = () => {
        clearTimeout(timeOut);
        secured = true;
        client.close();
      }
      timeOut = setTimeout(() => {
        client.removeEventListener('open');
        client.close();
      }, 2000);
      client.on('open', onOpen)
      client.on('close', () => {
        this.setWSSClient(cb, secured);
      })
    } else {
      this.setWSSClient(cb);
    }
  }
  connect() {
    return new Promise((resolve, reject) => {
      let rejectionId;
      this.setClient(() => {
        this.registerOnErrorListener();
        this.registerOnEndListener();
        this.registerOnDataRecievedListener();

        const onOpenListener = () => {
          logger.info('Connected with FusionExport Service');
          clearTimeout(rejectionId);
          resolve();
        };

        rejectionId = setTimeout(() => {
          const errorMsg = 'Unable to connect to FusionExport Service!\nPlease make sure the FusionExport Service is running before executing the command';
          reject(new Error(errorMsg));
          this.client.removeEventListener('open', onOpenListener);
        }, 2000);
        this.client.on('open', onOpenListener);
      });
    });
  }

  registerOnErrorListener() {
    this.client.on('error', (e) => {
      if (e.code === 'ECONNREFUSED') {
        const errorMsg = 'Unable to connect to FusionExport Service!\nPlease make sure the FusionExport Service is running before executing the command';
        this.emit('error', errorMsg);
      } else {
        this.emit('error', e.message);
      }
      this.client.close();
    });
  }

  registerOnEndListener() {
    this.client.on('close', (status) => {
      if (!status) {
        logger.info('disconnected with FusionExport Service');
      }
    });
  }

  registerOnDataRecievedListener() {
    this.client.on('message', (data) => {
      const outputData = data.toString();
      if (outputData) {
        if (outputData.startsWith(EXPORT_DATA)) {
          if (!this.isError) {
            this.outputData = outputData.substr(EXPORT_DATA.length);
            this.emit('exportDone', ExportManager.parseExportedData(this.outputData).data);
            this.client.close();
          }
        }
        if (outputData.startsWith(EXPORT_EVENT)) {
          const meta = JSON.parse(outputData.substr(EXPORT_EVENT.length));
          this.emit('exportStateChange', meta);
        }
      }
    });
  }

  static parseExportedData(data) {
    return JSON.parse(data);
  }

  export(exportConfig) {
    return new Promise((resolve, reject) => {
      if (!(exportConfig instanceof ExportConfig)) {
        const err = new Error('Not an instance of ExportConfig class');
        this.emit('error', err);
        reject(err);
      }
      if (typeof this.clientName !== 'undefined') {
        /* eslint-disable no-param-reassign */
        exportConfig.clientName = this.clientName;
        /* eslint-enable */
      }
      this.connect().then(() => {
        this.emitData('ExportManager', 'export', exportConfig);
        let cyclesCount = 0;
        const cycleStep = 10;
        const MAX_WAIT_TIME = this.config.max_wait_sec * 1000;
        const TOTAL_ALLOWED_CYCLES = MAX_WAIT_TIME / cycleStep;
        const tmtId = setInterval(() => {
          cyclesCount += 1;
          if (this.outputData) {
            clearInterval(tmtId);
            const outputFinalData = ExportManager.parseExportedData(this.outputData).data;
            resolve(outputFinalData);
          }
          if (TOTAL_ALLOWED_CYCLES === cyclesCount) {
            const errorMsg = `Wait timeout reached. Waited for ${this.config.max_wait_sec} seconds`;
            reject(new Error(errorMsg));
            this.emit('error', errorMsg);
            this.isError = true;
          }
        }, cycleStep);
      }).catch((err) => {
        this.emit('error', err.toString());
      });
    });
  }

  static saveExportedFiles(exportedOutput, dirPath = '.') {
    if (!exportedOutput) {
      throw new Error('Exported Output files are missing');
    }
    fs.ensureDirSync(dirPath);
    exportedOutput.forEach((item) => {
      const filePath = path.join(dirPath, item.realName);
      const data = Buffer.from(item.fileContent, 'base64');
      fs.outputFileSync(filePath, data);
    });
  }

  static getExportedFileNames(exportedOutput) {
    if (!exportedOutput) {
      throw new Error('Exported Output files are missing');
    }
    const fileNames = exportedOutput.data.map(item => item.realName);
    return fileNames;
  }
}

module.exports = ExportManager;
