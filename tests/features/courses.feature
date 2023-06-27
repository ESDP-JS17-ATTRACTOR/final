Feature: Courses

  @coursesCreation
  Scenario: New Course Creation
    Given I am on the admin page
    When I click "Курсы" list item
    And I click "Добавить курс" button
    And I select option "SMM"
    And I click Datepicker button
    And I select option "Jack Doe"
    And I enter form fields:
      | title       | testCourse1     |
      | description | testDescription |
      | duration    | testDuration    |
      | price       | 200             |
    And I click Date button
    And I click "Добавить" button
    Then I see "Ниже список всех курсов" headline

  @removeCourse
  Scenario: Removal of Course
    Given I am on page with courses
    When I click the delete button in courses table
    Then The course with title "testCourse" should be removed

  @editCourse
  Scenario: Edit of Course
    Given I am on page with courses
    When I click the edit button in courses table
    When I select option "SMM"
    When I select option "Jack Doe"
    When I enter form fields:
      | title       | testEditCourse1     |
      | description | testEditDescription |
      | duration    | 2                   |
      | price       | 200                 |
    And I click Datepicker button
    And I click Date button
    And I click "Обновить курс" button
    Then I see "Ниже список всех курсов" headline
#