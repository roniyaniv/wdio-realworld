const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');
const Article = require('../pageObjects/Article.page');

const auth = new Auth();
const editor = new Editor();
const article = new Article();


describe('Post Editor', function () {
  before(async function () {
    // Load the login page
    await auth.load();

    // Login with a valid user
    await auth.login(user1);
  });

  beforeEach(async function () {
    // Load the Post Editor page
    await editor.load();
  });

  it('should load page properly', async function () {
        // Assert the URL is correct
        await expect(browser).toHaveUrl(editor.url.href);

        // Assert the page fields are correct
        await expect(editor.$title).toBeExisting();
        await expect(editor.$body).toBeExisting();
        await expect(editor.$description).toBeExisting();
        await expect(editor.$publish).toBeExisting();
        await expect(editor.$tags).toBeExisting();

    });

  it('should let you publish a new post', async function () {

    const articleDetails = {
      title: global.chance.sentence({ words: 3 }),
      description: global.chance.sentence({ words: 7 }),
      body: global.chance.paragraph({ sentences: 4 }),
      tags: [global.chance.word(), global.chance.word()]
    };
  
    editor.submitArticle(articleDetails);

    await expect(article.$title).toHaveText(articleDetails.title);
    await expect(article.$body).toHaveText(articleDetails.body);
   
    await expect(await article.tags).toEqual(articleDetails.tags);

    // to avoid making a lot of articles, let's just click the delete button to
    // clean it up. We'll talk about a better way to clean it later on.
    await article.$delete.click();

    });
  
  it('should let you edit a post', async function () {

    const articleDetails = {
      title: global.chance.sentence({ words: 3 }),
      description: global.chance.sentence({ words: 7 }),
      body: global.chance.paragraph({ sentences: 4 }),
      tags: [global.chance.word(), global.chance.word()]
    };
  
    editor.submitArticle(articleDetails);

    await editor.$edit.click();

    // console.log('editor.$title.getValue(): ' + await editor.$title.getValue());

    expect(await editor.$title.getValue()).toEqual(articleDetails.title);
    expect(await editor.$body.getValue()).toEqual(articleDetails.body);
    
    expect(await editor.tags).toEqual(articleDetails.tags);

    await editor.$publish.click();

    // to avoid making a lot of articles, let's just click the delete button to
    // clean it up. We'll talk about a better way to clean it later on.
    await article.$delete.click();
  
    });
    
  describe('"Unsaved Changes" alerts', function () {
    
    beforeEach(async function () {
      await editor.$title.setValue('Unsaved Change');
    });
    
    it('it should alert you when using browser navigation', async () => {
      // try refreshing the page
      await browser.refresh();

      // validate error is showing
      await expect(async () => await browser.acceptAlert()).not.toThrow();
    }),
    
    it('should warn you when trying to change URL', async () => {
      // try going to the homepage
      await $('=Home').click();
  
      const alertText = await browser.getAlertText();
  
      await expect(alertText).toEqual(
          'Do you really want to leave? You have unsaved changes!'
      );
  
      // accept the alert to avoid it from preventing further tests from executing
      await browser.acceptAlert();
    }),
    it('it should alert you when clicking a link', ()=>{
    })
  
  });

});

