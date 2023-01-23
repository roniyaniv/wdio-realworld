describe('Homepage', function () { 
  it('should load properly', async function () { 
    await browser.url('');
    
    if (await browser.getTitle() !== 'Conduit'){
      throw new Error('Title of the page should be "Conduit"');
    };

    await $('=Sign in').click();

    // console.log(await browser.getUrl());

    if (await browser.getUrl() !== 'https://demo.learnwebdriverio.com/login'){
      throw new Error('URL of the login page should be correct');
    };
  });
});