const Generic = require('./Generic.page');

class Home extends Generic {
  constructor(){
    super('./');
  }

  get $$feedTabs () { return $$('[data-qa-id="feed-tabs"] [data-qa-type="feed-tab"]') }
  get feedTabsText () { return this.$$feedTabs.map($tab => $tab.getText()); }
  get activeFeedTabText() { return $$('[data-qa-id="feed-tabs"] [data-qa-type="feed-tab"] .active').map($tab => $tab.getText());  }

}

module.exports = Home;