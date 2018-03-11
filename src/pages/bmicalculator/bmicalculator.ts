import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { MyApp } from '../../app/app.component'
import { Events } from 'ionic-angular'


@IonicPage()
@Component({
  selector: 'page-bmicalculator',
  templateUrl: 'bmicalculator.html',
})
export class BmicalculatorPage {

  bmiMessage: string;
  weight: number;
  height: number;
  bmiValue: number;
  IMPERIAL_CONSTANT: number = 703;
  oldSession: boolean = false;
  errorMessage: boolean = false;
  measurementSystem: string = '';
  currentUser: any; 
  bmiStorage: string = "Last recorded BMI value: ";
  bmiMessageStorage: string = "You're " 


  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public events: Events) {
      this.events.subscribe('user:loggedIn', (user) =>{
        this.currentUser = user
      });
      this.storage.get("value").then((val) => {
        if (JSON.parse(val) === null){
          this.bmiStorage = '' 
        } else {
        this.bmiStorage += JSON.parse(val);
        }
      });
      this.storage.get("message").then((val) => {
        if (val === null){
          this.bmiMessageStorage = '' 
        } else {
        this.bmiMessageStorage += val;
        }
      });

    }
    setLocalStorage() {
      this.storage.set("value", this.bmiValue)
      this.storage.set("message", this.bmiMessage)
     }
  

  popOut() {
    //this.navCtrl.pop();
    this.navCtrl.setRoot(MyApp)
  }


 calculateBMI(): number {
  if (this.weight > 0 && this.height > 0){
    if (this.measurementSystem == 'metric'){
      var finalBmi: number = this.weight / (this.height / 100 * this.height / 100);
      this.bmiValue = parseFloat(finalBmi.toFixed(2));
      this.oldSession = true;
      this.errorMessage = false;
      return this.bmiMessage = this.setBMIMessage(this.bmiValue)
    } else if (this.measurementSystem == 'imperial')  {
      var final_Bmi = (this.weight * this.IMPERIAL_CONSTANT) / Math.pow(this.height, 2);
      this.bmiValue = parseFloat(final_Bmi.toFixed(2));
      this.oldSession = true;
      this.errorMessage = false;
      return this.bmiMessage = this.setBMIMessage(this.bmiValue)
    } else {
      this.errorMessage = true;
    }
  }
 }



 setBMIMessage(bmiValue):any {
  if (this.bmiValue < 18.5) {
    return this.bmiMessage = "Underweight";
  }
  if (this.bmiValue > 18.5 && this.bmiValue < 25) {
    return  this.bmiMessage = "Normal";
  }
  if (this.bmiValue > 25 && this.bmiValue < 30) {
    return  this.bmiMessage = "Overweight";
  }
  if (this.bmiValue > 30) {
    return this.bmiMessage = "Obese";
  }
  if (this.bmiValue > 185.5) {
    return this.bmiMessage = 'fatter than <a href="https://sv.wikipedia.org/wiki/Jon_Brower_Minnoch" target="_blank">JON BROWER MINNOCH</a>';
  }
}

}
