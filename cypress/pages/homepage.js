/* eslint-disable new-cap */
/* eslint-disable no-undef */
class homePage {
  navigate () {
    cy.visit('https://demoqa.com/')
  }

  openForms () {
    cy.contains('Forms').click()
  }
}

export default new homePage()
