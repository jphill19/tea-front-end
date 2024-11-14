describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
      statusCode: 200,
      fixture: 'subscriptions-data'
    }).as('subs-data');

    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/12', {
      statusCode: 200,
      fixture: 'single-sub'
    }).as('single-sub');

    cy.visit('http://localhost:3001/');
    cy.get('[href="/subscription/12"]').click();
  });
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})