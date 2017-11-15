import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class GlobalService {

  private storage: Storage;

  public opts: any = {
    hostname: null,
    port: 20059,
    username: null,
    password: null,
    onConnection: function (err, jsonapi) {
    }
  };

  constructor() {
    let self = this;
    this.storage = new Storage(localStorage);
    this.storage.get('hostname').then(function (hostname) {
      self.opts.hostname = hostname;
    });
    this.storage.get('username').then(function (username) {
      self.opts.username = username;
    });
    this.storage.get('password').then(function (password) {
      self.opts.password = password;
    });
  }

  saveOpts() {
    this.storage.set('hostname', this.opts.hostname);
    this.storage.set('username', this.opts.username);
    this.storage.set('password', this.opts.password);
  }


}
