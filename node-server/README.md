# Description
Application for crypto-currency exchange .

## Getting Started
- Make sure you have [Nodejs](https://nodejs.org/) and [Yarn](https://yarnpkg.com/)
- Provide API_KEY and API_SECRET in .env file

### From root folder
```bash
$ yarn install   
$ yarn start 
```

## Note
- DB will be re-initialized on every server start.


## Example
get data for last minute
```bash
[GET] http://localhost:3000/crypto?currency=btc_eur&frame=60000 
```

delete entry with specificic id
```bash
[DELETE] http://localhost:3000/crypto/73ff2360-2cd5-4f6f-94bd-8419ccbe7c1f
```
