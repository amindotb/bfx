const { PeerRPCClient }  = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const { v4: uuidv4 } = require('uuid');

class BroadcastClient {
    _nodeHash = null;
    _peerClient = null;

    constructor({ grapeHost, peerTimeout }) {
        this._nodeHash = uuidv4();
        console.log('nodeHas:', this._nodeHash);
        const link = new Link({
            grape: grapeHost
        });
        link.start();

        // peer client
        this._peerClient = new PeerRPCClient(link, {
            timeout: peerTimeout,
        });
        this._peerClient.init();
    }

    async request(message, timeout = 10000) {
        return new Promise((resolve,reject)=>{
            const msg = {
                from: this._nodeHash,
                message,
            };
            this._peerClient.request('order', msg, { timeout }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}

module.exports = BroadcastClient;