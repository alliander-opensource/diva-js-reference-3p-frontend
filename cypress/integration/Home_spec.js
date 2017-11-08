describe('The homepage', function() {
  it('can be visited', function() {
    cy.visit('http://localhost:3000');
  });

  it('contains the home title', function() {
    cy.get('h2').contains('Home');
  });

  it('contains the about text', function() {
    cy.contains('Welcome to the DIVA 3rd party reference implementation');
  })
});
