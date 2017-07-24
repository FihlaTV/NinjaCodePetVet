/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const loginUtils = require('../utils/login.utils');
const registerUtils = require('../utils/register.utils');

const async = require('../../../common/async');

describe('Items routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    const appUrl = 'http://localhost:3002';

     beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('User can add pet', () => {
        const username = 'Peshistiya';
        const email = 'someone@some.where';
        const pass = '123456';
        const phone = '02 555 555';
        const address = '1 Osogovo Str';

        before(() => {
            registerUtils.register(username, email, pass, phone, address);
        });

        beforeEach(() => {
            loginUtils.login(username, pass);
        });

        it('expect a button for adding a pet to be visible in /profile', () => {
            return async()
                .then(() => ui.waitFor('#btn-add-pet'))
                .then((btn) => {
                    expect(btn.value()).to.contain('Add');
                });
        });
    });
});
