const AsyncLock = require('async-lock');
const { SIDE, TYPE } = require('../config/constants');
const { v4: uuidv4 } = require('uuid');
const math = require('./decimal');



class TradeEngine {
    // Simple store all orders in a variable
    _orders = [];
    
    // Lock for preventing race conditions
    lock = new AsyncLock();

    /**
     * Sorting orders by a property
     * @param {string} property 
     * @param {number} sortOrder 
     * @returns {object[]} Sorted array of incoming orders
     */
    _sortOrders(property,sortOrder = 1) {
        return function (a,b) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }
    
    /**
     * Getting orders form DB or any other object storage. In this example simple variable implemented
     * ⚠ We mey need to make a limit for fetching orders. The Kucoin exchange limit this match for about 150 orders.
     * @param {string} symbol The symbol of order with its pair
     * @param {string} side The side of the orders
     * @param {number} arrange THe arrangement of the orders
     * @returns {object[]} Sorted array of orders
     */
    _getOrders(symbol, side, arrange) {
        return this._orders
            .filter(x=> x.symbol === symbol && x.side === side && x.quantity > x.quantityTraded)
            .sort(this._sortOrders('priceUnit', arrange));
    }
    
    /**
     * Make a filter based on order specifications and return sorted orders.
     * @param {*} quantity The quantity of order
     * @param {*} symbol The symbol of order with its pair
     * @param {*} side The side if order
     * @returns {object[]} Sorted array of orders
     */
    _filterOrders(quantity, symbol, side) {
        if(quantity > 0) {
            let sideReverse = null;
            let arrange = null;
            if(side === SIDE.BUY) {
                sideReverse = SIDE.SELL;
                arrange = 1;
            }
            else if(side === SIDE.SELL) {
                sideReverse = SIDE.BUY;
                arrange = -1;
            } else {
                throw new Error('Invalid order side');
            }
            return this._getOrders(symbol, sideReverse, arrange);
        } 
        throw new Error('Invalid order quantity');
        
    }
    
    /**
     * Find best matches for the order
     * @param {object[]} order New incoming order
     * @returns {object[]} Result of match making
     */
    _matchMake(order) {
        const availableOrders = this._filterOrders(order.quantity, order.symbol, order.side);
    
        let remaining = order.quantity;
        let totalPrice = 0;
        const matchedOrders = [];
    
        for(const availableOrder of availableOrders) {
            if(order.type === TYPE.LIMIT) {
                if(order.side === SIDE.BUY) {
                    if(availableOrder < order.priceUnit) {
                        break;
                    }
                }
                else if(order.side === SIDE.SELL) {
                    if(availableOrder > order.priceUnit) {
                        break;
                    }
                }
            }
            if(remaining === 0) {
                break;
            }
    
            let amountToTrade = 0;
    
            if(remaining < availableOrder.quantity) {
                amountToTrade = remaining;
                remaining = 0;
            } else {
                amountToTrade = availableOrder.quantity;
                remaining = math.minus(remaining, availableOrder.quantity);
            }
            availableOrder.quantityTraded = math.add(availableOrder.quantityTraded, amountToTrade);
    
            const priceOfTrade = parseInt(amountToTrade * availableOrder.priceUnit);
            totalPrice += priceOfTrade;
    
            matchedOrders.push(availableOrder);
        }
    
        return {
            remaining,
            totalPrice,
            matchedOrders,
        };
    }
    
    /**
     * Trading a new order or adding to orderbook
     * @param {object} order New incoming order object
     * @param {boolean} addToOrderBook Determine to add to orderbook or not. This method only add limit orders to orderbook. (Please see the readme file)
     * @returns {object} Result of the trade
     */
    async trade(order, addToOrderBook = true) {
        let generatedId = null;
        let result = null;

        // Lock the the specific used resources before trade
        await this.lock.acquire('trade', async () => {
            result = this._matchMake(order);
            if(addToOrderBook && order.type === TYPE.LIMIT && result.remaining > 0) {
                generatedId = uuidv4();
                this._orders.push({
                    id: generatedId,
                    side: order.side,
                    symbol: order.symbol,
                    type: order.type,
                    priceUnit: order.priceUnit,
                    quantity: result.remaining,
                    quantityTraded: 0,
                });
            }
        });
        
        return {
            result,
            generatedId,
        };
    }
}

module.exports = TradeEngine;