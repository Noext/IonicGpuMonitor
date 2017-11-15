import {Injectable} from '@angular/core';
import {GlobalService} from '../global-service/global-service';
import { Events } from 'ionic-angular';
import {Performance as Perf} from '../../models/performance-model';

@Injectable()
export class BackgroundService {

  public players: Array<any>;
  public performances : Perf[];


  public messages : any[] = [];

  public handlers: any = {
    'chat': this.processChatMessage,
    'connections': this.processConnectionMessage,
    'performance': this.processPerformanceMessage
  };

  constructor(public events: Events,public global: GlobalService, private jsonWebsocket: JsonWebsocket) {
    let self = this;
    self.players = [];
    self.performances = [];
    self.jsonWebsocket.connect(function () {
      self.jsonWebsocket.send('chat', 'subscribe', [1], 'chat');
      self.jsonWebsocket.send('connections', 'subscribe', [1], 'connections');
      self.jsonWebsocket.send('performance', 'subscribe', [1], 'performance');

      self.jsonWebsocket.send('players.online', 'call',[],'connections');
      self.jsonWebsocket.socket.onmessage = data => {
        self.processMessage(data.data, self);
      };
    });


  }


  processChatMessage(data,self) {
    console.log(data.success);
    self.messages.push(data.success)
  }
  processPerformanceMessage(data,self) {
    if (data.result == "success") {

      if(self.performances.length > 30){
        self.performances.splice(0,1);
      }
      self.performances.push(new Perf(data.success));
    }
    self.formatPerformancesDate();

  }

  formatPerformancesDate()
  {


    this.events.publish('performances:updated',this.performances);
  }



  processConnectionMessage(data, self) {

    if (data.result == "success") {
      if(data.success.action){
        if (data.success.action == "connected") {
          self.players.push({'name':data.success.player});
        } else {
          let index = self.players.findIndex(d => d.name === data.success.player);
          self.players.splice(index, 1);
        }
      }else{
        for(let index in data.success){
          self.players.push({'name':data.success[index].name});
        }
      }
      self.players.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );

    }
  }

  processMessage(data, self) {
    let line: any = null;
    for (line of Array.from(data.toString().trim().split("\r\n"))) {
      let json = JSON.parse(line);
      if(json.length == 1){
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