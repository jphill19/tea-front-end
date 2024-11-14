describe('Home Page Test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
      statusCode: 200,
      fixture: 'subscriptions-data'
    }).as('subs-data');

    cy.visit('http://localhost:3001/');
  });

  it('Loads with all the right info', () =>{
    cy.get('.subscriptions-container').should('be.visible')
    cy.get('h2').should('be.visible')
    cy.get('.searchbox').should('be.visible')
    cy.get('.subscriptions-container').should('exist')
  })

  it('Each subscription card contains data mapped the json', () =>{
    cy.fixture('subscriptions-data').then((subscriptions) => {
      console.log("subs", subscriptions)
      const {data} = subscriptions
      cy.get('.subscriptions-list > .subscription-link').should('have.length', data.length);
      console.log("data", data)

      data.forEach((subscription, index) => {
        const { title, status, frequency, customer_id, price, teas_count } = subscription.attributes;

        cy.get('.subscriptions-list > .subscription-link').eq(index).within(() => {
          cy.contains(title).should('be.visible');
          cy.contains(status).should('be.visible');
          cy.contains(frequency).should('be.visible');
          cy.contains(customer_id.toString()).should('be.visible');
          cy.contains(price).should('be.visible');

          const imagePath = teas_count === 1 ? '/single_leaf.png' : teas_count === 2 ? '/double_leaf.png' : '/triple_leaf.png';
          cy.get('img').should('have.attr', 'src', imagePath).and('have.attr', 'alt', `Tea leaves count: ${teas_count}`);
        });
      });
    });
  })

  it('can properly filter', () =>{
    cy.get('.subscriptions-list > .subscription-link').should('have.length', 4);
    cy.get('.searchbox').type("john")
    cy.get('.subscriptions-list > .subscription-link').should('have.length', 2);
    cy.get('.searchbox').type("'s dai")
    cy.get('.subscriptions-list > .subscription-link').should('have.length', 1);
    cy.get('.searchbox').clear()
    cy.get('.subscriptions-list > .subscription-link').should('have.length', 4);
  })

  it('can properly navigate', () =>{
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/12', {
      statusCode: 200,
      fixture: 'single-sub'
    }).as('single-sub');
    cy.get('[href="/subscription/12"] > .subscription').click()
    cy.url().should('eq', 'http://localhost:3001/subscription/12');
  })
})