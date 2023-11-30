# How to read / update tests

Testing an app is an essential part of the development process.
It helps to ensure that the app is working as expected and can be used as living documentation.

I discovered that only two types of tests are needed to use TDD along with BDD.

## Types of tests

### Acceptance tests (End-to-end aka E2E)

These tests are written in [Gherkin](https://cucumber.io/docs/gherkin/reference), are located in the
features [folder](../features) and have the `.feature` extension.

Here are the cases and expects you can find in them:

For a query, it should expect the HTTP response.
For a mutation, it should expect the database state.

It should expect HTTP errors related to the request made in the test (params validation for example)
It should expect any third part that could go wrong and for whatever reason not handled by the service like the database
connection.

### Unit tests

These tests are located right next to the file they are testing and have the `.spec` extension.

There are to test every behaviour of the file they are testing. They are the main base for the TDD cycle.

## The development cycle

### Acceptance tests

First create a new .feature file inside the feature [folder](../features) and make it fail.

### Unit tests

Then create or update the .spec file right next to the tested file and make it fail.

### Minimal code

Then write the minimal code to make the unit test succeed.

_Repeat from the [unit tests](#unit-tests) step until your acceptance test succeed._

### Refactor

Then you refactor your code to make it easy to read and scalable.
It's easily doable since your tests are here to ensure that your code is still working as expected.
