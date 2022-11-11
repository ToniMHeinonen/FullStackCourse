describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Agent',
      username: 'user123',
      password: 'password123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-username')
    cy.get('#login-password')
    cy.get('#login-submit')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#login-username').type('user123')
      cy.get('#login-password').type('password123')
      cy.get('#login-submit').click()
      cy.contains('User Agent logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#login-username').type('user')
      cy.get('#login-password').type('password')
      cy.get('#login-submit').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'User Agent logged in')
    })
  })
})
