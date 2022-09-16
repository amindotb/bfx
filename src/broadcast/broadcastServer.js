const { PeerRPCServer }  = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const { v4: uuidv4 } = require('uuid');

class BroadcastServer {
    _nodeHash = null;

    constructor({
        grapeHost, 
        serverPort, 
        callback,
        peerTimeout,
        announceTimeout,
    }) {
        this._nodeHash = uuidv4();
        console.log('nodeHas:', this._nodeHash);
        const link = new Link({
            grape: grapeHost,
        });
        link.start();
          
        const peer = new PeerRPCServer(link, {
            timeout: peerTimeout,
        });
        peer.init();
          
        const service = peer.transport('server');
        service.listen(serverPort);
          
        setInterval(function () {
            link.announce('order', service.port, {});
        }, announceTimeout);
          
        service.on('request', callback);
    }
}

module.exports = BroadcastServer;