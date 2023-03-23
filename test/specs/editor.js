const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();

describe('Post Editor', function () {
  before(function () {
    // Load the login page
    auth.load();

    // Login with a valid user
    auth.login(user1);
  });

  beforeEach(function () {
    // Load the Post Editor page
    editor.load();
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
});

