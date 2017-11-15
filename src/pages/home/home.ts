import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BackgroundService} from '../../providers/background-service/background-service';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public background: BackgroundService) {
        console.log(background);
    }

}
