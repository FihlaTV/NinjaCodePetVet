/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const loginUtils = require('./utils/login.utils');
const registerUtils = require('./utils/register.utils');
const async = require('../../common/async');

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

    describe('when the page is loaded', () => {
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
                    expect(btnText).to.contain('Add Your Pet');
                });
        });

        it('expect Profile Info button to ' +
            'show a button for changing password', () => {
            return async()
                .then(() => ui.click('#btn-info'))
                .then(() => ui.getText('button.edit'))
                .then((btnText) => {
                    expect(btnText).to.contain('Change password');
                });
        });

        it('expect Profile Info button ' +
            'to show user\'s phone and address', () => {
            return async()
                .then(() => ui.click('#btn-info'))
                .then(() => ui.getText('#ownerAddress'))
                .then((ownerAddress) => {
                    expect(ownerAddress).to.equal(address);
                })
                .then(() => ui.getText('#ownerPhone'))
                .then((ownerPhone) => {
                    expect(ownerPhone).to.equal(phone);
                });
        });

        it.skip('expect Add Pet button to show a' +
            ' form that enables user to add a pet', () => {
            return async()
                .then(() => ui.click('#btn-add-pet'))
                .then(() => ui.waitForMany('input[placeholder="Pet name"]'))
                .then((el) => {
                    expect(el.attributes.placeholder).to.equal('Pet name');
                });
        });
    });
});