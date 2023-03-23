const { URL } = require('url');

class Generic {
  constructor(path) {
      this.path = path;
      this.url = new URL(path, browser.options.baseUrl);
  }

  async load() {
      await browser.url(this.path);
  }
}

module.exports = Generic;
