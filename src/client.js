const config = require('./config/config');
const { SIDE, SYMBOL,TYPE } = require('./config/constants');
const BroadcastClient = require('./broadcast/broadcastClient');
const TradeEngine = require('./utils/tradeEngine');

// Our broadcast service
const broadcast = new BroadcastClient({
    grapeHost: config.grapeHost,
    peerTimeout: config.peerTimeout,
});

// Init trade engine
const tradeEngine = new TradeEngine();

// You can put some default orders in you local orderbook. Example:
//
// tradeEngine._orders = [
//     {
//         id: '1',
//         side: SIDE.BUY,
//         symbol: SYMBOL.BTCUSD,
//         type: TYPE.LIMIT,
//         priceUnit: 19200,
//         quantity: 1,
//         quantityTraded: 0,
//     },  
// ];

async function trade(order) {

    // 1. Trade on local orderbook
    const localTrade = tradeEngine.trade(order, true); 
    // you can choose prevent adding new limit orders to
    // order book by passing seconde parameter as false
    
    // 2. Trade on remote orderbook
    const remoteTrade = await broadcast.request(order);
    // TODO: the remaining of the order will be returned 
    // and we can put it in our local orderbook. Like:
    // 
    // const remainingTrade = tradeEngine.trade({ new order with remaining value }, true);


    return({
        localTrade,
        remoteTrade
    });
}

async function run() {
    const newOrder = {
        side: SIDE.SELL,
        symbol: SYMBOL.BTCUSD,
        type: TYPE.LIMIT,
        priceUnit: 2100,
        quantity: 1,
    };

    const {
        localTrade,
        remoteTrade
    } = await trade(newOrder);
    console.log('local result:',localTrade);
    console.log('remote result:', remoteTrade);
}

run();