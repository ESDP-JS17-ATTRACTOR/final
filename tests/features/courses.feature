Feature: Courses

  @coursesCreation
  Scenario: New Course Creation
    Given I am on the admin page
    When I click "Курсы" list item
    When I click "Добавить курс" button
    When I select option "SMM"
    When I select option "Jack Doe"
    When I enter form fields:
      | title       | testCourse      |
      | description | testDescription |
      | price       | 200             |

    And I click "Добавить" button
    Then I see "Ниже список всех категорий" headline
