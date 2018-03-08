import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data'; 
import { ModalController } from 'ionic-angular'
import { ResultsPage } from '../results/results'

import { PersonProvider } from '../../providers/person/person';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  distance: number;
  user: any = {age: 20, gender: 'female', distance: 1000};
  constructor(public navCtrl: NavController, 
              public person: PersonProvider, 
              private performanceData: PerformanceDataProvider,
              private modalCtrl: ModalController) {
  }

  calculate(distance) {
    this.person.doAssessment(this.distance);
    this.performanceData
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
      .subscribe(data => console.log(data));
  }

  showResults() {
    this.modalCtrl.create(ResultsPage).present();
  }
}
