const { URL } = require('url');

class Generic {
  constructor(path) {
      this.path = path;
      this.url = new URL(path, browser.options.baseUrl);
  }

  async load() {
      await browser.url(this.path);
  }

  get $siteHeader () { return $('[data-qa-id="site-header"]'); }
  get $siteNav () { return $('[data-qa-id="site-nav"]'); }
  get $siteFooter () { return $('[data-qa-id="site-footer"]'); }

}

module.exports = Generic;
