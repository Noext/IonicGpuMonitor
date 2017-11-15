import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class GlobalService {

    private storage: Storage;

    public opts: any = {
        hostname: null,
        port: null,
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
        this.storage.get('port').then(function (port) {
            self.opts.port = port;
        });
    }

    saveOpts() {
        this.storage.set('hostname', this.opts.hostname);
        this.storage.set('port', this.opts.port);
    }


}
