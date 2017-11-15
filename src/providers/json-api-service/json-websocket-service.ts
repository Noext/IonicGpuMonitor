import {Injectable} from '@angular/core';
import {GlobalService} from '../global-service/global-service';
import jsSHA from 'jssha'


@Injectable()
export class JsonWebsocket {
  host;
  queue;
  password;
  username;
  port;
  socket;
  salt;

  constructor(public global: GlobalService) {
    let opts = global.opts || {};
    this.host = opts.hostname || 'localhost';
    this.port = opts.port + 2 || 20061;
    this.username = opts.username || 'admin';
    this.password = opts.password || 'changeme';
    this.queue = [];
    this.salt = opts.salt || "";
  }


  connect(callback) {
    this.socket = new WebSocket(`ws://${ this.host }:${ this.port }`);

    this.socket.onopen = () => {
      if (this.queue.length > 0) {
        let item: any = null;
        for (item of Array.from(this.queue)) {
          // @handlers[item.tag] = item.callback

          this.send(item.line,'call');
        }
        this.queue = [];
        return callback();
      }
      return callback();
    };

    this.socket.onerror = function (e) {
      throw e;
    };

  }

  format(action, args?,tag?) {
    let tmp =
      {
        "name": action,
        "key": this.encode(action),
        "username": this.username,
        "arguments": args || [],
        "tag": tag || ""
      };

    return encodeURIComponent(JSON.stringify(tmp));
  }

  send(data,type, args?,tag?) {
    data = this.format(data,args,tag);
    if (this.socket.readyState === WebSocket.OPEN) {
      return this.socket.send("/api/2/"+type+"?json=" + data);
    } else {
      return this.queue.push({line: data});
    }
  }

  encode(method: string) {
    if (typeof method == "object") {
      method = JSON.stringify(method);
    }
    let decoded = this.username + method + this.password + this.salt;
    let tmp = new jsSHA("SHA-256", "TEXT");
    tmp.update(decoded);
    return tmp.getHash("HEX");
  }
}