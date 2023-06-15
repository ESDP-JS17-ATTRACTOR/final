Feature: Categories

  @categoryCreation
  Scenario: New Category Creation
    Given I am on the admin page
    When I click "Категории" list item
    When I click "Добавить категорию" button
    When I enter form fields:
      | title | testCategory |
    And I click "Добавить" button
    Then I see "Ниже список всех категорий" headline

  @removeCategory
  Scenario: Removal of Category
    Given I am on page with categories
    When I click the delete button in categories table
    Then The category with title "CategoryForTestDelete" should be removed