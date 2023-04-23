const Home = require('../pageObjects/Home.page');
const Auth = require('../pageObjects/Auth.page');
const { user1 } = require('../fixtures/users');

const home = new Home();
const auth = new Auth();

describe('Homepage', function () {
    
    describe('Anonymous', function() {
        before(async function () {
            // load the page
            await home.load();
        });
    
        it('should load properly', async function () {
            // check that top nav/footer exist
            await expect(home.$siteHeader).toBeExisting();
            await expect(home.$siteFooter).toBeExisting();
            await expect(home.$siteNav).toBeExisting();
        });
    
        it('should only show the global feed tab', async function () {
            await expect(await home.feedTabsText).toEqual(['Global Feed']);
        });
    
    });

    describe('Logged in', function () {
        before(async function () {
            // await console.log('before')
            await auth.load();
            await auth.login(user1);

            await home.load();
        });

        it('should show both feed tabs', async function () {
            await expect(await home.feedTabsText).toEqual(['Your Feed', 'Global Feed']);
            // await browser.debug();
        });

        it('should default to showing the global feed', async function () {
            // get all tabs with an 'active' class, check only one returns with correct text
            // await console.log('check');
            await expect(await home.activeFeedTabText).toEqual(['Global Feed']);
        });


        after(async function () {
            // await console.log('after')
            await auth.clearSession();
        });
    });

});