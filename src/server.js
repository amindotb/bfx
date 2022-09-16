const config = require('./config/config');
const BroadcastServer = require('./broadcast/broadcastServer');
const TradeEngine = require('./utils/tradeEngine');

// Our broadcast remote service
const SERVER_PORT = 60001;
const _broadcast = new BroadcastServer({  // eslint-disable-line no-unused-vars
    grapeHost: config.grapeHost,
    serverPort: SERVER_PORT,
    callback,
    peerTimeout: config.peerTimeout,
    announceTimeout: config.announceTimeout,
});

const tradeEngine = new TradeEngine();

// You can put some default orders in you remote orderbook on server. Example:
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

async function callback(_rid, _key, payload, handler) {
    // TODO: implement a callback with handling different message not just an order.
    // TODO: implement order validation
    const order = payload?.message;
    const result = await tradeEngine.trade(order);
    handler.reply(null, { result });
}

