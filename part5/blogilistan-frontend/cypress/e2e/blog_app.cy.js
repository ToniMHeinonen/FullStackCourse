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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user123', password: 'password123' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Title test')
      cy.get('#author-input').type('Author test')
      cy.get('#url-input').type('Url test')
      cy.get('#submit-blog').click()

      cy.contains('create new blog')
      cy.get('#blogs-list')
        .should('contain', 'Title test Author test')
        .and('contain', 'show')
      cy.contains('a new blog Title test by Author test added')
    })

    describe('When blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title test',
          author: 'Author test',
          url: 'Url test',
        })
      })

      describe('When liking a blog', function () {
        beforeEach(function () {
          cy.contains('show').click()
          cy.contains('likes 0').find('button').as('theButton')
          cy.get('@theButton').click()
        })

        it('Blog can be liked', function () {
          cy.contains('likes 1')
        })

        it('Liking a blog does not remove user information', function () {
          cy.get('#blogs-list').contains('User Agent')
          cy.contains('remove')
        })
      })
    })
  })
})
