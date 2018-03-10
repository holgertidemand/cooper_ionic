import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data'; 
import { ModalController } from 'ionic-angular'
import { ResultsPage } from '../results/results'
import { Events } from 'ionic-angular'
import { PersonProvider } from '../../providers/person/person';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  distance: number;
  currentUser: any;
  oldSession: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public person: PersonProvider, 
    private performanceData: PerformanceDataProvider,
    private modalCtrl: ModalController,
    public events: Events
  ) {
      this.events.subscribe('user:loggedIn', (user) =>{
        this.currentUser = user
      });
  }

  calculate(distance) {
    this.oldSession = true;
    this.person.doAssessment(this.distance);
  }

  register() {
    this.events.publish('user:register')
  }

  login() {
    this.events.publish('user:login')
  }

  showResults() {
    this.modalCtrl.create(ResultsPage).present();
  }

  saveResults(){
    this.oldSession = false;
    this.performanceData
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
      .subscribe(data => console.log(data));
  }


}
