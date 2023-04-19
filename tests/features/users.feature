Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  @userRegistration
  Scenario: New User Registration
    Given I am on the main page
    When I click "Sign up" button
    When I enter form fields:
      | email             | testingUser5@gmail.test |
      | firstName         | Test First Name         |
      | lastName          | Test Last Name          |
      | password          | Test Password           |
      | confirmedPassword | Test Password           |
    And I click "Sign Up" button
    Then I should see "HELLO, TEST FIRST NAME" in App Tool Bar