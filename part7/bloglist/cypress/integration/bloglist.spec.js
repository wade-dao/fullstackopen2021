// bloglist.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Before login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('div.username', 'username')
    cy.contains('div.password', 'password')
    cy.contains('button.loginButton', 'login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('.usernameInput').type('root')
      cy.get('.passwordInput').type('sekret')
      cy.get('.loginButton').click()

      cy.contains('Groot logged in')
      cy.contains('button.logoutButton', 'logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('.usernameInput').type('groot')
      cy.get('.passwordInput').type('sekret')
      cy.get('.loginButton').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Groot logged in')
      cy.contains('login to application')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // log in user here
    cy.login({ username: 'root', password: 'sekret' })
  })

  it('A blog can be created', function() {
    // ...
    cy.get('#createNewBlog').should('contain', 'create new blog')
    cy.get('#createNewBlog').click()
    cy.contains('create new')
    cy.get('#title').type('A new blog post')
    cy.get('#author').type('Luu Dao')
    cy.get('#url').type('http://google.com')
    cy.get('#createNewButton').click()
    cy.contains('A new blog post Luu Dao')
  })

  it('Can like a blog', function() {
    cy.contains('Type wars Robert C. Martin')
      .contains('view')
      .click()
    
    cy.get('.likeButton').click()
    cy.get('.likeNumber').contains('23')
  })

  it('Cannot delete a blog that others created', function() {
    cy.contains('Type wars Robert C. Martin')
      .contains('view')
      .click()
    cy.get('.urlLikesUser')
      .should('not.contain', '.removeButton')
  })

  it('Can delete a blog that they created', function() {
    cy.contains('TDD harms architecture Robert C. Martin')
      .contains('view')
      .click()
    cy.get('.removeButton').click()
    cy.get('html').should('not.contain', 'TDD harms architecture Robert C. Martin')
  })

  it('See the blogs in the order of highest likes on top', function() {
    let like = 0
    cy.get('.singleBlog').each((element) => {
      cy.wrap(element).contains('view').click().then(() => {
        cy.get('.urlLikesUser').within(() => {
          cy.get('.likeNumber').should(($div) => {
            like = parseInt($div.text(), 10)
          })
        })
      })
    }).then(() => {
      expect(like).equal(221210750)
    })
  })

  it('See the blogs in the order of highest likes on top after changing like numbers', function() {
    cy.contains('React patterns Michael Chan')
      .contains('view')
      .click()
    
    for(let n = 0; n < 4; n ++){
      cy.get('.likeButton').click()
    }
    
    cy.contains('React patterns Michael Chan')
      .contains('hide')
      .click()

    let like = 0
    cy.get('.singleBlog').each((element) => {
      cy.wrap(element).contains('view').click().then(() => {
        cy.get('.urlLikesUser').within(() => {
          cy.get('.likeNumber').should(($div) => {
            like = parseInt($div.text(), 10)
          })
        })
      })
    }).then(() => {
      expect(like).equal(2212111050)
    })
  })
})