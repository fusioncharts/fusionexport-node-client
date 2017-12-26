const WebSocket = require('ws');
const { EventEmitter } = require('events');

const ExportConfig = require('./ExportConfig');
const config = require('./config.js');
const logger = require('./logger');

const EXPORT_DATA = 'EXPORT_DATA:';
const EXPORT_EVENT = 'EXPORT_EVENT:';
const UNIQUE_BORDER = ':8780dc3c41214695ae96b3432963d744:';

class ExportManager extends EventEmitter {
  constructor(options) {
    super();
    this.outputData = null;
    this.isError = false;
    this.config = options ? Object.assign({}, config, options) : config;
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
    return new Promise((resolve) => {
      this.client = new WebSocket(this.config.url);
      this.registerOnErrorListener();
      this.registerOnEndListener();
      this.registerOnDataRecievedListener();
      this.client.on('open', () => {
        logger.info('Connected with FusionExport Service');
        resolve();
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
      const msgs = outputData.split(UNIQUE_BORDER);
      msgs.forEach((msg) => {
        if (msg) {
          if (msg.startsWith(EXPORT_DATA)) {
            if (!this.isError) {
              this.outputData = msg.substr(EXPORT_DATA.length);
              this.emit('exportDone', ExportManager.parseExportdData(this.outputData));
            }
          }
          if (msg.startsWith(EXPORT_EVENT)) {
            const meta = JSON.parse(msg.substr(EXPORT_EVENT.length));
            this.emit('exportStateChange', meta);
          }
        }
      });
    });
  }

  static parseExportdData(data) {
    if (data.includes(UNIQUE_BORDER)) {
      return JSON.parse(data.substr(data.indexOf(EXPORT_EVENT)));
    }

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
      });
    });
  }
}

module.exports = ExportManager;
