import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService} from 'angular2-token';
import { Events } from 'ionic-angular'
import 'rxjs/add/operator/map';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loginCredentials: object;
  currentUser: any;
  pages: Array<{title: string, component: any}>;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _tokenService: Angular2TokenService,
    public alertCtrl: AlertController,
    public events: Events ) {
      events.subscribe('user:login', () => {
        this.loginPopUp();
      });

      events.subscribe('user:register', () => {
        this.registerAccountPopUp();
      });
      
      this._tokenService.init({
        apiBase: 'https://coopersapi.herokuapp.com'  
      });
    
    this.initializeApp();
  
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

   registerAccountPopUp(){
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Register',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        },
        {
          name: 'passwordConformation',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: data => {
            this.register(data);
          }
        }
      ]
    });
    confirm.present();
  }

 

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
      .subscribe(
      res => {
        this.currentUser = res.json().data
        this.events.publish('user:loggedIn', this.currentUser)
      },
      err => console.error('error')
      );
  }

  updatePasswordPopUp(){
    let confirm = this.alertCtrl.create({
      title: 'Update Password',
      inputs: [
        {
          name: 'password',
          placeholder: 'New Password',
          type: 'password'
        },
        {
          name: 'passwordConfirmation',
          placeholder: 'Confirm new password',
          type: 'password'
        },
        {
          name: 'passwordCurrent',
          placeholder: 'Current password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            this.changePassword(data);
          }
        }
      ]
    });
    confirm.present();
  }

  changePassword(credentials){
    this._tokenService
    .updatePassword(credentials)
    .subscribe(
    res =>      console.log(res),
    error =>    console.log(error)
)}

  register(credentials){
    this._tokenService
    .registerAccount(credentials)
    .subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  };

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }
}


