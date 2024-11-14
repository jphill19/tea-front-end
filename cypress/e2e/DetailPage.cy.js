describe('Detail Page Test', () => {
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
  
  it('navigates to the subscription detail page and displays correct data', () => {

    cy.url().should('eq', 'http://localhost:3001/subscription/12');

    // Check the main subscription details
    cy.get('h1').should('be.visible')
    cy.contains('.status-container .status-active', 'active').should('be.visible');
    cy.get('.subscription-header strong').contains('Frequency:').should('be.visible');
    cy.contains('strong', 'Total Price:').should('be.visible');


    cy.get('.customer-info > h2').should('be.visible');
    cy.get('.customer-info > :nth-child(2)').should('be.visible');

    // Verify the customer information section
    // Verify the teas section
    cy.get('.tea-item').should('have.length', 2);

    // First tea details
    cy.get('.tea-item').eq(0).within(() => {
      cy.contains('h3', 'TerraVita Blueberry Banana White Tea').should('be.visible');
      cy.get('img').should('have.attr', 'src').and('include', '4027264-312x231.jpeg');
      cy.contains('strong', 'Price:').next().should('contain', '$44.95');
      cy.contains('strong', 'Temperature:').next().should('contain', '85°C');
      cy.contains('strong', 'Brew Time:').next().should('contain', '5 mins');
    });

    // Second tea details
    cy.get('.tea-item').eq(1).within(() => {
      cy.contains('h3', 'Twinings French Vanilla Black Chai Tea Bags').should('be.visible');
      cy.get('img').should('have.attr', 'src').and('include', '6978850-312x231.jpg');
      cy.contains('strong', 'Price:').next().should('contain', '$3.32');
      cy.contains('strong', 'Temperature:').next().should('contain', '85°C');
      cy.contains('strong', 'Brew Time:').next().should('contain', '5 mins');
    });
  });
})