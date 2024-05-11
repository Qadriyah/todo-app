# Todo App

A simple todo app where a user can login, manage todos and logout

## Tools

- [Node](https://nodejs.org/docs/latest/api/) - A Javascript runtime environment.
- [React](https://react.dev/reference/react) - A Javascript library for building user interfaces.
- [Next](https://nextjs.org/docs) - A React framework for the web.
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - Powerful asynchronous state management library
- [NPM](https://www.npmjs.com/) - A package manager

## Setup

Clone the repository:

```
git clone https://github.com/Qadriyah/todo-app.git
```

Then change to project directory:

```
cd todo-app
```

#### To install dependencies run:

```
npm install
```

This will install all the dependencies defined in the `package.json` file inside the todo-app folder.

### Running tests

#### To run unit and integration tests:

```
npm test
```

#### To generate the test coverage report:

```
npm run test:coverage
```

### Starting local development server

```
npm run dev
```

After starting the local development server, application can be accessed at:

```
localhost:3000
```

### Note

This app is using NextJS api route to mock authentication. If your app is running on a different port other than PORT 3000, be sure to change the port in src -> api -> index.ts for a successful call to the API
