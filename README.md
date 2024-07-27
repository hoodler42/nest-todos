VITEST ^0.34.6

## Description

Build a service to manage Todos.

### Requirements

- [ ] API to query Todos (potentially many!)
  - Query Todos that are not done
  - Todos can be grouped in lists
- [ ] API to add a Todo
- [ ] API to update Todos
  - Mark Todos as done
- [ ] We would like you to integrate with another service provider. It can be any Todo service (e.g. Microsoft Todo
  APIs), or you can also use a mock provider. Todos should be kept in sync between our service and the third-party
  integration
  - Todos created in the third-party integration should always be created in our service
  - The status of todos should always be in sync between our service and the integration

## Installation

```bash
$ yarn install
```

## Build the app

```bash
$ yarn run build
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit assets
$ yarn run test

$ yarn run test:watch

# test coverage
$ yarn run test:cov

$ yarn run test:debug
```
