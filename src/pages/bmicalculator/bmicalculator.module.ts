import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmicalculatorPage } from './bmicalculator';

@NgModule({
  declarations: [
    BmicalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(BmicalculatorPage),
  ],
})
export class BmicalculatorPageModule {}
