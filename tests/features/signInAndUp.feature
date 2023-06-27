Feature: Check languages in login and registration

  @singInCheckRu
  Scenario: Checking RU language for login
    Given I am on the main page
    When I select option "RU"
    When I click "Login" button
    Then I see the main headline "АВТОРИЗАЦИЯ"

  @singInCheckEn
  Scenario: Checking EN language for login
    Given I am on the main page
    When I select option "EN"
    When I click "Login" button
    Then I see the main headline "AUTHORIZATION"

  @signUpCheckRu
  Scenario: Checking RU language for registration
    Given I am on the main page
    When I select option "RU"
    When I click "Sign up" button
    Then I see the main headline "РЕГИСТРАЦИЯ"

  @signUpCheckEn
  Scenario: Checking EN language for registration
    Given I am on the main page
    When I select option "EN"
    When I click "Sign up" button
    Then I see the main headline "REGISTRATION"