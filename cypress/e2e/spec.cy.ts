describe('Login Page', () => {
  it('should visit login page', () => {
    cy.visit('/login'); //  relative path now that baseUrl is set
  });
});
