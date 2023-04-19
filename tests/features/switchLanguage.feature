Feature: Switch languages

  @switchLanguage
  Scenario: Switching language
    Given the user is on the landing page
    When the user select option "EN"
    Then the user should see the main headline "START SAVING YOUR COURSE TODAY!"
    When the user select option "RU"
    Then the user should see the main headline "НАЧНИ ОБУЧЕНИЕ УЖЕ СЕГОДНЯ!"
