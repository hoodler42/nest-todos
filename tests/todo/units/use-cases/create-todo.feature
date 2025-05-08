Feature: Create a Todo

  Scenario: Create a Todo
    Given a task "Buy groceries"
    When User asks to create the Todo
    Then the Todo is created
