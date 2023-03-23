describe('Homepage', function () { 
  it('should load properly', async function () { 
    await browser.url('');
    
    await expect(browser).toHaveTitle('Conduit');

    await $('=Sign in').click();

    await expect(browser).toHaveUrl('/login', {containing: true});

    await $('=conduit').click();

    await expect(browser).toHaveTitle('Conduit');
  });
});