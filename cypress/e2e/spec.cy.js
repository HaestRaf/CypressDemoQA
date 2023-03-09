/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import homePage from '../pages/homePage.js'
import formsPage from '../pages/formsPage.js'
import practiceForm from '../pages/practiceFormPage.js'
import testdata from '../fixtures/testdata.json'
import { components } from '../fixtures/components.js'

describe('Testing ToolsQA to navigate', () => {
  it('Fill in the practice form', () => {
    cy.viewport(1920, 1080)
    homePage.navigate()
    homePage.openForms()
    formsPage.openPracticeForms()
    practiceForm.fillIn(testdata.firstName, testdata.lastName, testdata.email, testdata.gender, testdata.phoneNr,
      testdata.dateOfBirth, testdata.subjects, testdata.hobbies, testdata.picture.pathToPicture,
      testdata.currentAddress, testdata.state, testdata.city)

    // Assertion
    cy.get(components.inputFirstName)
      .should('have.value', testdata.firstName)
      .should('not.have.value', '')
    cy.get(components.inputLastName)
      .should('have.value', testdata.lastName)
      .should('not.have.value', '')
    cy.get(components.inputEmail).should('have.value', testdata.email)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    cy.get(components.inputEmail).invoke('val').should('match', emailRegex)
    if (testdata.gender.toLowerCase() === 'male') {
      cy.get(components.radioBtnMale).should('have.value', 'Male').should('be.checked')
    } else if (testdata.gender.toLowerCase() === 'female') {
      cy.get(components.radioBtnFemale).should('have.value', 'Female').should('be.checked')
    } else if (testdata.gender.toLowerCase() === 'other') {
      cy.get(components.radioBtnOther).should('have.value', 'Other').should('be.checked')
    }
    cy.get(components.inputPhoneNr)
      .should(($input) => {
        const value = $input.val().replace(/ /g, '')
        expect(value).to.not.be.empty
        expect(value).to.match(/^\d{10}$/)
      })
      .should('have.value', testdata.phoneNr)
      .and('have.attr', 'maxlength', '10')
    cy.get(components.datePicker).should('have.value', practiceForm.formatDate(testdata.dateOfBirth))
    cy.get(components.subjects).should('have.text', testdata.subjects.join(''))
    for (let index = 0; index < testdata.hobbies.length; index++) {
      const givenHobby = testdata.hobbies[index]
      if (givenHobby.toLowerCase() === 'sports') { cy.get(components.checkboxSports).should('be.checked') }
      if (givenHobby.toLowerCase() === 'reading') { cy.get(components.checkboxReading).should('be.checked') }
      if (givenHobby.toLowerCase() === 'music') { cy.get(components.checkboxMusic).should('be.checked') }
    }
    cy.get(components.uploadPicture).should('contain.value', testdata.picture.name)
    cy.get(components.inputAddress).should('have.value', testdata.currentAddress)
    cy.get(components.state).should('contain.text', testdata.state)
    cy.get(components.city).should('contain.text', testdata.city)

    cy.get('#submit').click()
  })
})
