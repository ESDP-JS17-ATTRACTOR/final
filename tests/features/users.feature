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


  @userAuthentication
  Scenario: Existing User Authentication
    Given I am on the main page
    When I click "Login" button
    When I enter form fields:
      | email    | testingUser5@gmail.test |
      | password | Test Password           |
    And I click button with className "button auth_login_btn"
    Then I should see "HELLO, TEST FIRST NAME" in App Tool Bar

  @userLogout
  Scenario: User Logout From App
    Given I am on the main page
    When I click "Login" button
    When I enter form fields:
      | email    | testingUser5@gmail.test |
      | password | Test Password           |
    And I click button with className "button auth_login_btn"
    Then I click "Hello, Test First Name" button in App Tool Bar
    Then I click "Logout" menu item
    Then I see in App Tool Bar "LOGIN" button
