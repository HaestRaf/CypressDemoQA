/* eslint-disable new-cap */
/* eslint-disable no-undef */
class formsPage {
  openPracticeForms () {
    cy.contains('Practice Form').click()
  }
}
export default new formsPage()
