// register.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('test welcome screen', () => {
    it('welcome elements', () => {
        cy.visit('http://localhost:3000');
        cy.get('a').contains('Register');
        cy.get('a').contains('Login');
    })
})

describe('test register screen', () => {
    it('click register button', () => {
        cy.visit('http://localhost:3000');
        cy.get('a').contains('Register').click();
    })

    it('check register input fields', () => {
        cy.get('input').should('have.length', 2);
        cy.get('div').contains('Register');
    })

    it('register a new user', () => {
        cy.get('input').first().type('test_username_cypress');
        cy.get('input').eq(1).type('test_password_cypress');
        cy.get('div').contains('Register').click();
    })
})