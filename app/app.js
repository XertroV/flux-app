import 'es6-shim';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloFluxPage} from './pages/hello-flux/hello-flux';
import {LoginPage} from './pages/login/login';
import {StatsPage} from './pages/stats/stats';
import {MemberDetailsPage} from './pages/member-details/member-details';
import {dataService} from './services/dataService';

@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [dataService]
})
class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [MenuController]];
  }

  constructor(app, platform, menu) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Flux', component: HelloFluxPage },
      { title: 'Login', component: LoginPage },
      { title: 'My Membership Deets', component: MemberDetailsPage },
      { title: 'Flux Stats', component: StatsPage },
    ];

    // make HelloIonicPage the root (or first) page
    if(localStorage.secret != undefined){
      this.rootPage = MemberDetailsPage;
    } else {
      this.rootPage = HelloFluxPage;
    }
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
