# Bitfinex
Bitfinex code challenge.

## Brief
This project has been created based on assessment requirements. Also I spent 2-3 hours to figure out what is wrong with the grenache-grape module which I describe my issue at the end of file.
Implemented sections:
[x] Client local orderbook.  
[x] Submitting orders on local orderbook and/or distributed orderbook.  
[x] Getting complete result of local and/or distributed orderbook.  
[x] A choice to add remaining of an order from distributed orderbook trade to local orderbook or not.  
[x] Support multi currency and multi pair.  
[x] Support Limit and Market orders.  
[x] Support multi server.  
[x] Solved JS decimal issues.  
[x] Solved race conditions for trading.  
[x] Try to maximize the performance for matching trades.  
[x] Using grenache-grape module.  
[x] Confinable params.  
[x] Eslint.  

## Installation

### Installing grenache-grape dependency
At first please run
```
$ npm i -g grenache-grape
```

### Init the project
Create a file with `.env` name in root directory like `.env.example` file.
Put your own config in the file. Run the below command to install dependencies:
```
$ npm install
```
After installing all the dependencies, run:
```
$ grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
$ grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```
To run the server use:
```
$ npm run server
```
Also, To run the client use:
```
$ npm run client
```


## What Next
- Add some API endpoint for creating new orders. (it can be done currently from client.js file manually)
- I just add the Limit orders to orderbook and just full fill Market orders buy orderbook. I did not have much time to implement this section. Because it need the market price and other trading data and methods to implement.
- Setting validation for orders to validate each parameter.
- Complete test files, I did have much time to write tests for the challenge.
- Also, we can implement a DB or an object storage with supporting transactions to storing data.
- We can set a rate limiter for the production proposed.
- We can implement a cache module.
- Implementing a logging and monitoring module like ELK APM.
- Also, we can use husky to ensure all the commits, even from other developers, has the same code style defined in eslint.

## Issue report
I figured the `grenache-grape` module has an issue which it does not detect dead servers. I saw the `--dnl` config but I think de default parameter is not suitable to detecting old dead servers. We can implement an event on `process.exit` for each server to notify the grape servers that the node is already dead and update the hash table.
