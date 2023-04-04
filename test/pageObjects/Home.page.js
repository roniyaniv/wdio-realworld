const Generic = require('./Generic.page');

class Home extends Generic {
  constructor(){
    super('./');
  }

  get $$feedTabs () { return $$('[data-qa-id="feed-tabs"] [data-qa-type="feed-tab"]') }
  // original code (got TypeError: $tab.getText(...).trim is not a function): 
  // get feedTabsText () { return this.$$feedTabs.map($tab => $tab.getText().trim()); }
  get feedTabsText () { return this.$$feedTabs.map($tab => $tab.getText()); }
}

module.exports = Home;