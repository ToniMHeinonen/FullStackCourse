describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'User Agent',
      username: 'user123',
      password: 'password123',
    })
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

      describe('When logged in with different user than blog user', function () {
        beforeEach(function () {
          cy.createUser({
            name: 'Test User',
            username: 'testuser',
            password: 'password',
          })
          cy.login({ username: 'testuser', password: 'password' })
        })

        it('Blog can not be removed with wrong credentials', function () {
          cy.contains('show').click()
          cy.get('#blogs-list').should('not.contain', 'remove')
        })
      })

      describe('When blog is opened', function () {
        beforeEach(function () {
          cy.contains('show').click()
        })

        it('Blog can be removed with correct credentials', function () {
          cy.contains('remove').click()
          cy.contains('blog Title test by Author test removed')
          cy.get('#blogs-list').should('not.contain', 'Title test Author test')
        })

        describe('When liking a blog', function () {
          beforeEach(function () {
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

    describe('When multiple blogs are created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title with the least likes',
          author: 'Author test',
          url: 'Url test',
          likes: 0,
        })
        cy.createBlog({
          title: 'Title with the most likes',
          author: 'Author test',
          url: 'Url test',
          likes: 2,
        })
        cy.createBlog({
          title: 'Title with the second most likes',
          author: 'Author test',
          url: 'Url test',
          likes: 1,
        })
      })

      it('Blogs are sorted by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Title with the most likes')
        cy.get('.blog')
          .eq(1)
          .should('contain', 'Title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'Title with the least likes')
      })

      it('Liking a blog sorts it correctly', function () {
        cy.contains('Title with the second most likes')
          .parent()
          .as('secondBlog')
        cy.get('@secondBlog').contains('show').click()
        cy.get('@secondBlog')
          .contains('likes 1')
          .find('button')
          .as('likeButton')
        cy.get('@likeButton').click()
        cy.get('.blog').eq(0).should('contain', 'Title with the most likes')
        cy.get('@likeButton').click()
        cy.get('.blog')
          .eq(0)
          .should('contain', 'Title with the second most likes')
        cy.get('.blog').eq(1).should('contain', 'Title with the most likes')
      })
    })
  })
})
