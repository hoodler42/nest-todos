Feature: List the Todos
  As a user
  I want to be able to list all todos
  So that I can check my list of things to do

  Scenario: All todos
    Given there are existing todos
    When the user requests to retrieve all todos
    Then the user should receive a list of todos
