import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {BackgroundService} from '../../providers/background-service/background-service';
import {GlobalService} from "../../providers/global-service/global-service";
import {Storage} from '@ionic/storage';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private storage: Storage;

    constructor(public navCtrl: NavController, public global: GlobalService, public background: BackgroundService, protected app: App) {
        this.storage = new Storage(localStorage);


    }

    ionViewDidEnter(){
        let self = this;
        this.storage.get('hostname').then(function (hostname) {
            console.log(hostname);

            if(!hostname){
                self.app.getRootNav().getActiveChildNav().select(1);
            }else{
                self.storage.get('port').then(function (port) {
                    console.log(port);
                    if(!port){
                        self.app.getRootNav().getActiveChildNav().select(1);
                    }else{

                        if(!self.background.jsonWebsocket.connected){
                            self.background.jsonWebsocket.connect(function(){
                                self.background.bindProceessMessage();
                            });
                        }
                    }
                });

            }
        });
    }


}
