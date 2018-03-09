import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data'; 
import { ModalController } from 'ionic-angular'
import { ResultsPage } from '../results/results'
import { Events } from 'ionic-angular'
import { PersonProvider } from '../../providers/person/person';
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  distance: number;
  // currentUser = this.events.publish('current:user')
  user: any = {age: 20, gender: 'female', distance: 1000};
  oldSession: boolean = false;
  constructor(public navCtrl: NavController, 
              public person: PersonProvider, 
              private performanceData: PerformanceDataProvider,
              private modalCtrl: ModalController,
              public events: Events) {
  }

  calculate(distance) {
    this.oldSession = true;
    this.person.doAssessment(this.distance);
  }

  loggedIn() {
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
