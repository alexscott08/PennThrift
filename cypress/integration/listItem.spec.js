// listItem.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const URL = 'http://localhost:3000'
const fixtureFile = 'download.jpg';

describe('add item', () => {
    it('add a new item successful', () => {
        cy.visit(URL);
        cy.get('a').contains('Login').click();
        cy.get('input').first().type('new')
        cy.get('input').eq(1).type('test');
        cy.get('div').contains('Login').click();

        cy.get('div').contains('Add new Item');
        cy.get('a').eq(5)
        .invoke('attr', 'href')
        .then(href => {
            cy.visit(URL + href);
        });

        cy.get('input').first().type('Item Name', {force: true})


        cy.get('input').eq(2).should('be.visible').type('100');
        cy.get('input').eq(3).should('be.visible').click();
        cy.get('input').eq(7).should('be.visible').click();
        cy.get('textarea').should('be.visible').type('item description')

        // cy.get('div').contains('Upload and image').attachFile(fixtureFile);
        // cy.get('img').eq(5).click();

    }) 
})