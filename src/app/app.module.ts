import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';


import {HomePage} from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import { GraphComponent } from '../components/graph/graph';

import {GlobalService} from '../providers/global-service/global-service'
import {JsonWebsocket} from '../providers/json-api-service/json-websocket-service'
import {BackgroundService} from '../providers/background-service/background-service'

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SettingsPage,
        TabsPage,
        GraphComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SettingsPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GlobalService,
        JsonWebsocket,
        BackgroundService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
