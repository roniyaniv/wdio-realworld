describe('Homepage', function () { 
  it('should load properly', async function () { 
    await browser.url('');
    
    expect(browser).toHaveTitle('Conduit');

    await $('=Sign in').click();

    expect(browser).toHaveUrl('/login', {containing: true});

    await $('=conduit').click();

    expect(browser).toHaveTitle('Conduit');
  });
});