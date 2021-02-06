const { expect } = require("chai");
const defaultConfig = require("../src/config");
const ExportManager = require("../src/ExportManager");

describe("ExportManager", () => {
  it("should use default host and port when no argument is passed", () => {
    const exportManager = new ExportManager();
    expect(exportManager.config.host).to.equal(defaultConfig.host);
    expect(exportManager.config.port).to.equal(defaultConfig.port);
  });

  it("should use default host when no host is passed", () => {
    const exportManager = new ExportManager({ port: 2222 });
    expect(exportManager.config.host).to.equal(defaultConfig.host);
  });

  it("should use default port when no port is passed", () => {
    const exportManager = new ExportManager({ host: "127.0.0.2" });
    expect(exportManager.config.port).to.equal(defaultConfig.port);
  });

  it("should use host and port as passed", () => {
    const host = "127.0.0.2";
    const port = 2222;
    const exportManager = new ExportManager({ host, port });
    expect(exportManager.config.host).to.equal(host);
    expect(exportManager.config.port).to.equal(port);
  });
});
