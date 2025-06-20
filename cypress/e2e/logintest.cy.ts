// describe('Login Page', () => {
//   it('should visit login page', () => {
//     cy.visit('/login'); //  relative path now that baseUrl is set
//   });
// });
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should display login form', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  // it('should show error on empty submit', () => {
  //   cy.get('button[type="submit"]').click();
  //   cy.contains('Email is required').should('be.visible');
  //   cy.contains('Password is required').should('be.visible');
  // });

  it('Should login with valid credentials', () => {
    cy.get('input[name="email"]').type('anas');
    cy.get('input[name="password"]').type('0000');
    cy.get('button[type="submit"]').click();

    // Adjust this based on your actual behavior after login
    cy.url().should('include', '/expense');
    cy.contains('Welcome').should('be.visible'); // Or check user-specific element
  });
});
