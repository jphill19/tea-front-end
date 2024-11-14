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
    cy.get('.go-back-link').should('be.visible')
    cy.get('h1').should('be.visible')
    cy.contains('.status-container .status-active', 'active').should('be.visible');
    cy.get('.subscription-header strong').contains('Frequency:').should('be.visible');
    cy.contains('strong', 'Total Price:').should('be.visible');


    cy.get('.customer-info > h2').should('be.visible');
    cy.get('.customer-info > :nth-child(2)').should('contain', 'John Hill');
    cy.get('.customer-info > :nth-child(3)').should('contain', 'john@example.com');
    cy.get('.customer-info > :nth-child(4)').should('contain', '123 Tea Lane, Teatown');

    cy.get('.tea-item').should('have.length', 2);
    cy.get('.teas-info > h2').should('be.visible')

    cy.get('.tea-item').eq(0).within(() => {
      cy.contains('h3', 'TerraVita Blueberry Banana White Tea').should('be.visible');
      cy.get('img').should('have.attr', 'src').and('include', '4027264-312x231.jpeg');
      cy.get(':nth-child(4)').should('contain', '$44.95');
      cy.get(':nth-child(5)').should('contain', '85°C');
      cy.get(':nth-child(6)').should('contain', '5 mins');
    });

    cy.get('.tea-item').eq(1).within(() => {
      cy.contains('h3', 'Twinings French Vanilla Black Chai Tea Bags').should('be.visible');
      cy.get('img').should('have.attr', 'src').and('include', '6978850-312x231.jpg');
      cy.get(':nth-child(4)').should('contain', '$3.32');
      cy.get(':nth-child(5)').should('contain', '85°C');
      cy.get(':nth-child(6)').should('contain', '5 mins');
    });
  });

  it('can change the status', ()=> {
    cy.intercept('PATCH', 'http://localhost:3000/api/v1/subscriptions/12', {
      statusCode: 200,
      body: {
        data: {
          id: "12",
          type: "subscription",
          attributes: {
            status: "inactive"
          }
        }
      }
    }).as('update-subscription');
    cy.get('.status-inactive').should('not.exist')
    cy.get('.status-active').should('contain', 'active')
    cy.get('.toggle-button').click()
    cy.get('.status-active').should('not.exist')
    cy.get('.status-inactive').should('contain', 'inactive')
    cy.intercept('PATCH', 'http://localhost:3000/api/v1/subscriptions/12', {
      statusCode: 200,
      body: {
        data: {
          id: "12",
          type: "subscription",
          attributes: {
            status: "active"
          }
        }
      }
    }).as('update-subscription-active');
    cy.get('.toggle-button').click()
    cy.get('.status-inactive').should('not.exist')
    cy.get('.status-active').should('contain', 'active')
  })

  it('can navigate back home', () => {
    cy.get('.go-back-link').click()
    cy.url().should('eq', 'http://localhost:3001/');
  })
})