import {Injectable} from '@angular/core';
import {GlobalService} from '../global-service/global-service';



@Injectable()
export class JsonWebsocket {
    host;
    password;
    username;
    port;
    socket;
    connected;

    constructor(public global: GlobalService) {
        let opts = global.opts || {};
        this.host = opts.hostname;
        this.port = opts.port;
        this.username = opts.username;
        this.password = opts.password;
        this.connected = false;

    }


    connect(callback) {
        var self = this;
        let opts = this.global.opts ;
        this.host = opts.hostname ;
        this.port = opts.port;
        this.username = opts.username ;
        this.password = opts.password ;


        if(this.host != null && this.port != null){

            this.socket = new WebSocket(`ws://${ this.host }:${ this.port }/Stats`);
            this.socket.onopen = () => {
                self.connected = true;
                return callback();
            };

            this.socket.onerror = function (e) {
                console.log("error");
                throw e;
            };
        }


    }
}
