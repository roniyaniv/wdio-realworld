const { user1 } = require('../fixtures/users');
const Auth = require('../pageObjects/Auth.page');

const auth = new Auth();

describe('Login Page', function () {
  beforeEach(function () {
    auth.load();
  });   
  
  it('should let you log in', async function () {

    await auth.login(user1);

    // assert that we're logged in
    await expect(auth.$errorMessages).not.toBeExisting();

  });

  it('should error with a missing username', async function () {
    auth.login({
      email: '',
      password: user1.password
    })

    // assert that error message is showing
    await expect(auth.$errorMessages).toHaveText(`email can't be blank`);
    //await browser.debug();
  });

  it('should error with a missing password', async function () {
    auth.login({
      email: user1.email,
      password: ''
    })

    // assert that error message is showing
    await expect(auth.$errorMessages).toHaveText(`password can't be blank`);
  });

});