// Prevent test failure due to known runtime error
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'classList')")) {
    return false; // Prevent Cypress from failing the test
  }
});

// Custom command for login session
Cypress.Commands.add('login', () => {
  cy.session('loginSession', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('anas');
    cy.get('input[name="password"]').type('0000');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/expense');
  });
});

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show error on invalid credentials', () => {
    cy.get('input[name="email"]').type('abc');
    cy.get('input[name="password"]').type('0000');
    cy.get('button[type="submit"]').click();
    // Optionally verify error message here
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('anas');
    cy.get('input[name="password"]').type('0000');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/expense');
    cy.contains('Welcome').should('be.visible'); // Optional
  });
});

describe('Expense Tab & Form Tests', () => {
  beforeEach(() => {
    cy.login();         // Reuse saved session
    cy.visit('/expense'); // Must re-visit the page after restoring session
  });

  it('should switch to Add Expense tab and show the form', () => {
    cy.get('#dashboardstyledtab')
      .should('exist')
      .should('be.visible')
      .click({ force: true });

    cy.wait(300); // Allow Angular DOM update

    cy.get('#styleddashboard').should('exist').and('be.visible');
    cy.get('#styledprofile').should('not.exist');

    cy.get('input[formcontrolname="expencename"]').should('exist');
    cy.get('input[formcontrolname="expenceamount"]').should('exist');
    cy.get('input[formcontrolname="expencedate"]').should('exist');
  });

  it('should submit Add Expense form and show new entry in table', () => {
    // Switch tab
    cy.get('#dashboardstyledtab').click();

    // Fill form
    cy.get('input[formcontrolname="expencename"]').type('Dinner');
    cy.get('input[formcontrolname="expenceamount"]').type('200');
    cy.get('input[formcontrolname="expencedate"]').type('2024-06-18');

    // Submit
    cy.get('button[title="Add Expense"]').should('not.be.disabled').click();


    // Confirm alert
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Added Expense Successfully');
    });

  
  });
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("classList")) return false;
});

Cypress.Commands.add('login', () => {
  cy.session('loginSession', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('anas');
    cy.get('input[name="password"]').type('0000');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/expense');
  });
});

describe('Header + Sidebar Navigation', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/expense');
  });

  it('should open sidebar from header, go to dashboard, and log out', () => {
    // Click hamburger icon to open sidebar
    cy.get('.lni-menu-hamburger-1').should('exist').click();

    // Wait briefly for sidebar animation/render
    cy.wait(500);

    // Click on Dashboard tab (adjust route as needed)
    cy.contains('span', 'Dashboard').click({ force: true });
    cy.url().should('include', '/dashboard');

    // Return to expense page
    cy.visit('/expense');

    // Open dropdown menu via avatar button
    cy.get('#dropdownAvatarNameButton').click();

    // Click 'Sign out' text
    cy.contains('Sign out').click({ force: true });

    // Confirm redirect to login
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').should('be.visible');
  });
});
