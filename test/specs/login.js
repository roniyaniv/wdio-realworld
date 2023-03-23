const Auth = require('../pageObjects/Auth.page');
const auth = new Auth();

describe('Login Page', function () {
  beforeEach(async function () {
    await browser.url('./login');
  });   
  
  it('should let you log in', async function () {

    await auth.login('demo@learnwebdriverio.com','wdiodemo');

    // assert that we're logged in
    await expect(auth.$errorMessages).not.toBeExisting();

  });

  it('should error with a missing username', async function () {
    auth.login('','wdiodemo')

    // assert that error message is showing
    await expect(auth.$errorMessages).toHaveText(`email can't be blank`);
    //await browser.debug();
  });

  it('should error with a missing password', async function () {
    auth.login('demo@learnwebdriverio.com','')

    // assert that error message is showing
    await expect(auth.$errorMessages).toHaveText(`password can't be blank`);
  });

});