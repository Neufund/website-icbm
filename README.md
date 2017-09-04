# Neufund commitment page

[![Greenkeeper badge](https://badges.greenkeeper.io/Neufund/commit.neufund.org.svg)](https://greenkeeper.io/)

## Developing

```
yarn
yarn start
```
Then open `http://localhost:8080`. Hot reloading of both react and static files (ejs, sass) files should work. Sometimes gulp forgets to watch new files so you need to rerun `yarn start`.

### Environment variables

In `.env.example` your will find all used env variables. When you do `yarn start` this file will be copied as `.env` (only if it doesn't exists already). If you want to change something modify `.env` file which is gitignored. If you want to add new env variable make sure to add default to `.env.example`.

### Linting

To autofix any errors just do `yarn lint:fix`.

### Tests

`yarn test`

#### Coverage report

`yarn test:coverage`

## Building
```
yarn build
```

You will find all files in `dist` directory.
