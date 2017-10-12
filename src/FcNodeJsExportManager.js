const net = require('net');
const config = require('./config.js');
const logger = require('./logger');
const { EventEmitter } = require('events');

class FcNodeJsExportManager extends EventEmitter {
  constructor(options) {
    super();
    this.outputData = null;
    this.isError = false;
    this.config = options ? Object.assign({}, config, options) : config;
    this.client = new net.Socket();
    this.connect();
    this.registerOnEndListener();
    this.registerOnDataRecievedListener();
  }

  emitData(target, method, payload) {
    const options = JSON.stringify(payload);
    const message = `${target}.${method}<=:=>${options}`;
    const buffer = Buffer.from(message, 'utf8');
    this.client.write(buffer);
  }

  connect() {
    this.client.connect(this.config.port, this.config.host, () => {
      logger.info('connected with FcExportInterface');
    });
  }

  registerOnEndListener() {
    this.client.on('close', () => {
      logger.info('connection closed');
    });
  }

  registerOnDataRecievedListener() {
    this.client.on('data', (data) => {
      this.outputData = data.toString();
      if (!this.isError) {
        this.emit('exportDone', data.toString());
      }
    });
  }

  export(options) {
    this.emitData('ExportManager', 'export', options);
    return new Promise((resolve, reject) => {
      let cyclesCount = 0;
      const cycleStep = 10;
      const MAX_WAIT_TIME = this.config.max_wait_sec * 1000;
      const TOTAL_ALLOWED_CYCLES = MAX_WAIT_TIME / cycleStep;
      const tmtId = setInterval(() => {
        cyclesCount += 1;
        if (this.outputData) {
          clearInterval(tmtId);
          resolve(this.outputData);
        }
        if (TOTAL_ALLOWED_CYCLES === cyclesCount) {
          const errorMsg = `Wait timeout reached. Waited for ${this.config.max_wait_sec} seconds`;
          reject(new Error(errorMsg));
          this.emit('error', errorMsg);
          this.isError = true;
        }
      }, cycleStep);
    });
  }
}

module.exports = FcNodeJsExportManager;
