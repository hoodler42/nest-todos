Feature: Retrieve Todos
	As a user
	I want to be able to retrieve all todos
	So that I can access a list of tasks I need to complete

	Scenario: User retrieves all todos
		Given there are existing todos
		When the user requests to retrieve all todos
		Then the user should receive a list of todos
