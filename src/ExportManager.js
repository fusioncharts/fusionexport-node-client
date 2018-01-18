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
    this.config.url = `ws://${this.config.host}:${this.config.port}`;
    this.client = null;
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

  connect() {
    return new Promise((resolve, reject) => {
      let rejectionId;
      this.client = new WebSocket(this.config.url);
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
            this.emit('exportDone', ExportManager.parseExportdData(this.outputData));
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

  static parseExportdData(data) {
    return JSON.parse(data);
  }

  export(exportConfig) {
    return new Promise((resolve, reject) => {
      if (!(exportConfig instanceof ExportConfig)) {
        const err = new Error('Not an instance of ExportConfig class');
        this.emit('error', err);
        reject(err);
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
            const outputFinalData = ExportManager.parseExportdData(this.outputData);
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

  static saveExportedFiles(dirPath, exportedOutput) {
    if (!exportedOutput) {
      throw new Error('Exported Output files are missing');
    }
    fs.ensureDirSync(dirPath);
    exportedOutput.data.forEach((item) => {
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
