#Feature: "My profile" Page Layout
#
#  @goToProfile
#  Scenario: User visits the "My profile" page
#    Given I am on the main page
#    When I click "Login" button
#    When I enter form fields:
#      | email    | admin@gmail.com |
#      | password | password        |
#    And I click button with className "button auth_login_btn"
#    And I click on the MUI Avatar component with the alt text "Avatar"
#    And I click link "My profile"
#    Then I should see "My Profile"
#    And I should see "Homework"
#
#    @editProfile
#  Scenario: Edit profile information
#    Given I am on the main page
#    When I click "Login" button
#    When I enter form fields:
#      | email    | admin@gmail.com |
#      | password | password        |
#    And I click button with className "button auth_login_btn"
#    And I click on the MUI Avatar component with the alt text "Avatar"
#    And I click link "My profile"
#    And I click img with className "profile-avatar"
#    And I click "Edit" button
#    And I enter form fields:
#      | email     | testingUser5@gmail.test |
#      | firstName | Jane                    |
#      | country   | Test country            |
#    And I click "Save" button
#    Then I should see "testingUser5@gmail.test"
#    And I should see "Test name"
#    And I should see "Test country"