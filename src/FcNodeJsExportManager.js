const net = require('net');
const path = require('path');
const config = require('./config.js');
const logger = require('./logger');
const {
  EventEmitter,
} = require('events');

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

  // boot() {
  //   this.emitData('ExportManager', 'boot', {});
  // }

  static stringifyWithFunctions(object) {
    return JSON.stringify(object, (key, val) => {
      if (typeof val === 'function') {
        return val.toString().replace(/\n/g, ' ');
      }
      return val;
    });
  }


  emitData(target, method, payload) {
    const outload = payload;

    if (outload.templateFilePath) {
      outload.templateFilePath = path.resolve(outload.templateFilePath);
    }

    if (outload.inputSVG) {
      outload.inputSVG = path.resolve(outload.inputSVG);
    }

    const options = FcNodeJsExportManager.stringifyWithFunctions(outload);

    const message = `${target}.${method}<=:=>${options}`;
    const buffer = Buffer.from(message, 'utf8');
    this.client.write(buffer);
  }

  connect() {
    this.client.connect(this.config.port, this.config.host, () => {
      logger.info('connected with ExportFusion Service');
    });
    this.registerOnErrorListener();
  }

  registerOnErrorListener() {
    this.client.on('error', (e) => {
      if (e.code === 'ECONNREFUSED') {
        logger.error('unable to connect to ExportFusion Service. Please start the ExportFusion Service');
      } else {
        logger.error(e.message);
      }
    });
  }

  registerOnEndListener() {
    this.client.on('close', (status) => {
      if (!status) {
        logger.info('disconnected with ExportFusion Service');
      }
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
          resolve(JSON.parse(this.outputData).data);
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

  // dispose() {
  //   this.emitData('ExportManager', 'dispose', {});
  // }
}

module.exports = FcNodeJsExportManager;
