const Generic = require('./Generic.page');

class Editor extends Generic {

  constructor(){
    super('./editor');
  }

  get $title () { return $('[data-qa-id="editor-title"]'); }
  get $description () { return $('[data-qa-id="editor-description"]'); }
  get $body () { return $('[data-qa-id="editor-body"] textarea'); }
  get $tags () { return $('[data-qa-id="editor-tags"]'); }
  get $$tags () {
    return $$('.tag-list .tag-pill');
  }
  get $publish () { return $('[data-qa-id="editor-publish"]'); }
  get $edit () { return $('[data-qa-id="article-edit"]'); }

  get tags () { return this.$$tags.map($tag => $tag.getText()); }

  async submitArticle({ title, description, body, tags }){
    await this.$title.setValue(title);
    await this.$description.setValue(description);
    await this.$body.setValue(body);
    for (const tag of tags){
      await this.$tags.setValue(tag);
      await browser.keys('Enter');
    }
    await this.$publish.click();
  }

}

module.exports = Editor;

