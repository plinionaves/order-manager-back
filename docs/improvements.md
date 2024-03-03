# Potential improvements

The project has a lot of things that can be improved, here is a list of some of them:

## Features

- [ ] Run allocations in a separate process/worker, so it doesn't block the main thread when you have a lot of data
- [ ] Make use of a message broker (maybe RabbitMQ) to handle the communication between the main thread and the worker
- [ ] Think of a way to store the current state of allocations in the database, so you don't have to recalculate every time
- [ ] Use different implementations for repositories (e.g. in-memory, postgres, etc)
- [ ] Handle errors in a standardized way (using custom error classes or Either type)
- [ ] Handle authentication and authorization
- [ ] Structure the NestJS part of the application using modules

## Algorithms and data structures

- [ ] Could use a priority queue or a heap to store the sales and purchase orders instead of a sorted array with quicksort

## Setup

- [x] Setup husky and lintstaged to:
  - [x] Run lint on staged files
  - [x] Run tests on staged files
  - [x] Run commitlint in the commit message
