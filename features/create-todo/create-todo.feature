Feature: Create a Todo
	As a user
	I want to be able to create a todo with a title
	So that I can keep track of tasks I need to complete

	Scenario: User creates a todo with a title
		When the user asks to create a new todo named "Buy groceries"
		Then a new todo with the title "Buy groceries" should be created
