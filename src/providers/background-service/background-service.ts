import {Injectable} from '@angular/core';
import {GlobalService} from '../global-service/global-service';
import {JsonWebsocket} from '../json-api-service/json-websocket-service';
import {Events} from 'ionic-angular';
import {Gpu} from '../../models/gpu-model';

@Injectable()
export class BackgroundService {


    public performances: String[];


    public messages: any[] = [];

    public handlers: any = {
        'performance': this.processPerformanceMessage
    };

    constructor(public events: Events, public global: GlobalService, public jsonWebsocket: JsonWebsocket) {
        let self = this;
        self.performances = [];
        if (self.jsonWebsocket.connected) {
            self.jsonWebsocket.socket.onmessage = data => {
                self.bindProceessMessage();
            };
        } else {
            self.jsonWebsocket.connect(function () {
                self.bindProceessMessage();
            });
        }
    }


    bindProceessMessage() {
        let self = this;
        self.jsonWebsocket.socket.onmessage = data => {
            self.processMessage(data.data, self);
        };
    }


    processPerformanceMessage(data, self) {
        if (self.performances.length > 100) {
            self.performances.splice(0, 1);
        }

        self.performances.push(new Gpu(data.performances));

        self.formatPerformancesDate();

    }

    formatPerformancesDate() {
        this.events.publish('performances:updated', this.performances);
    }


    processMessage(data, self) {

        let line: any = null;
        for (line of Array.from(data.toString().trim().split("\r\n"))) {
            let json = JSON.parse(line);
            if (json.length == 1) {
                json = json[0];
            }
            if (typeof json.tag !== "undefined" && this.handlers[json.tag]) {
                this.handlers[json.tag](json, self);
            } else {
                //throw "JSONAPI is out of date. JSONAPI 5.3.0+ is required.";
            }
        }
    }


}
