import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  signinPage = SigninPage;
  @ViewChild('nav') nav: Nav;
  isAuthenticated = false;

  pages: Array<{title: string, component: any, icon: string, canActivate: boolean}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyCeSeNwwZglKKgtkqKOOmfdY-jcD1NcsUA",
      authDomain: "ionic3-recipebook-63b44.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.nav.setRoot(TabsPage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(SigninPage);
      }

      this.pages = [
        { title: 'Recipe Book', component: TabsPage, icon: 'book', canActivate: this.isAuthenticated },
        { title: 'Signin', component: SigninPage, icon: 'log-in', canActivate: !this.isAuthenticated },
        { title: 'Signup', component: SignupPage, icon: 'person', canActivate: !this.isAuthenticated },
        { title: 'Logout', component: 'Logout', icon: 'exit', canActivate: this.isAuthenticated },
      ];
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    if (page.component == 'Logout') {
      this.onLogout();
    } else {
      this.nav.setRoot(page.component);
      this.menuCtrl.close();
    }
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

