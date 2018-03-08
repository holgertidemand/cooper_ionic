import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';


@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results: any[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private performanceData: PerformanceDataProvider) {
  }

  ionViewDidLoad() {
    this.performanceData
    .getResults()
    .subscribe(data => (this.results = data.entries));  
  }

}
