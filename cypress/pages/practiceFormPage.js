/* eslint-disable new-cap */
/* eslint-disable no-undef */
import { components } from '../fixtures/components.js'

class practiceFormsPage {
  setGender (gender) {
    if (gender.toLowerCase() === 'male') {
      cy.get(components.labelMale).click()
    }
    if (gender.toLowerCase() === 'female') {
      cy.get(components.labelFemale).click()
    }
    if (gender.toLowerCase() === 'other') {
      cy.get(components.labelOther).click()
    }
  }

  setHobbies (hobbies) {
    for (let index = 0; index < hobbies.length; index++) {
      const givenHobby = hobbies[index]
      if (givenHobby.toLowerCase() === 'sports') {
        cy.get(components.labelSports).click()
      }
      if (givenHobby.toLowerCase() === 'reading') {
        cy.get(components.labelReading).click()
      }
      if (givenHobby.toLowerCase() === 'music') {
        cy.get(components.labelMusic).click()
      }
    }
  }

  setSubjects (subjects) {
    for (let index = 0; index < subjects.length; index++) {
      const subject = subjects[index]
      cy.get(components.inputSubject).type(subject).type('{enter}')
    }
  }

  formatDate (date) {
    const datearray = date.split('/')
    const newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2]
    const formatDate = new Date(newdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    return formatDate
  }

  fillIn (firstName, lastName, email, gender, phoneNr, dateOfBirth, subjects, hobbies, pathToPicture, currentAddress, state, city) {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('.setup is not a function')

      return false
    })
    cy.get(components.inputFirstName).type(firstName)
    cy.get(components.inputLastName).type(lastName)
    cy.get(components.inputEmail).type(email)
    this.setGender(gender)
    cy.get(components.inputPhoneNr).type(phoneNr)
    const formattedDate = this.formatDate(dateOfBirth)
    cy.get(components.datePicker).type('{selectall}').type(formattedDate).type('{enter}')
    this.formatDate(dateOfBirth)
    this.setSubjects(subjects)
    this.setHobbies(hobbies)
    cy.get(components.uploadPicture).selectFile(pathToPicture)
    cy.get(components.inputAddress).type(currentAddress)
    cy.get(components.state).click()
    cy.get(components.inputState).type(state).type('{enter}')
    cy.get(components.city).click()
    cy.get(components.inputCity).type(city).type('{enter}')
  }

  submit () {
    cy.get(components.submit).click()
  }
}

export default new practiceFormsPage()
