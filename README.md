<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the quiz application to check my ability to work with nestjs.

Mistakenly i typed film as flim so please ignore it ;)

This repository is crafted as monorepo for hosting multiple applications. 
1. Gateway
2. Users service
3. Flims service

### System Overview

- Gateway as name suggested - it is door to our application and handles communication between each microservice.
- User microservice - is responsible for handing user registration and login
- Flims microservice - is responsible for handling flims CRUD and search facilities
- The database used in the following microservices is myqsl database and typeorm is used on top of it.
- The application used redis as message borker as a middleware to communicate with each microservice.
- Application is using cache mechanism on GET routes for 60 sec as TTL and behind the scenes used redis to store cache data
- The flim service is protected by jwt-auth guard
- Stream based logging is setup in each microservice and gateway - because stram based logging is more flexable to work as compared to file based logging.

## Installation

```bash
$ npm install
```

## Prerequisites

1. You must have docker running to your system.

```bash
# Start database and message broker containers in detatched mode
$ docker compose up -d
```

2. you have to make sure you have following databases exists with names
- users_db
- flims_db

if not try to create it by [adminer](http://localhost:8080) - free an open source sql client

## Running the apps

```bash
# Run gateway service
$ nest start gateway

# Run users service
$ nest start users-service

# Run flims service
$ nest start flims-service

# If you wanted to store log to file use redirect syntax to achieve it
$ nest start gateway >> gateway.logs
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

Migration context
- users
- flims

Each migration context is related to each microservice

```bash
# Run migration
$ migration:<context>:run

# Revert migration
$ migration:<context>:revert

# Create migration
$ migration:<context>:create
```

## Insomnia Collection

[here](./insomnia.collection.json) is the insomnia collection - import and test ;)


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
