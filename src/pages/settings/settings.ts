import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service/global-service";
import {HomePage} from "../home/home";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalService, protected app:App) {
    }

    saveSettings()
    {
        this.global.saveOpts();
        this.app.getRootNav().getActiveChildNav().select(0);
    }
}
