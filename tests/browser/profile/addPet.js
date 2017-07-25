/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const loginUtils = require('../utils/login.utils');
const registerUtils = require('../utils/register.utils');
const async = require('../../../common/async');

describe('In Profile page', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';
    const username = 'Peshistiya';
    const email = 'someone@some.where';
    const pass = '123456';
    const phone = '02 555 555';
    const address = '1 Osogovo Str';

    before(() => {
        async()
            .then(() => {
                return registerUtils
                    .register(username, email, pass, phone, address);
            });
    });

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        driver.quit();
    });

    describe('User can add pet', () => {
        beforeEach(() => {
            async()
                .then(() => {
                    return loginUtils.login(username, pass);
                });
        });

        it('expect a button for showing profile details to be visible', () => {
            return async()
                .then(() => ui.getText('#btn-info'))
                .then((btnText) => {
                    expect(btnText).to.contain('Information');
                });
        });

        it('expect a button for adding a pet to be visible', () => {
            return async()
                .then(() => ui.getText('#btn-add-pet'))
                .then((btnText) => {
                    expect(btnText).to.contain('Add');
                });
        });
    });
});
