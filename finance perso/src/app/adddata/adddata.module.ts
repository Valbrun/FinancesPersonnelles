import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddataPageRoutingModule } from './adddata-routing.module';

import { AdddataPage } from './adddata.page';
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { ApiService } from './../api.service';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { PickerController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddataPageRoutingModule
  ],
  declarations: [AdddataPage]
})

export class AdddataPageModule implements OnInit {


  budget: number;
  budgetCond = true;

  finance = {
    budget: 0,
    loyer: 0,
    transport: 0,
    nourriture: 0,
  };

  dataInfo = {
    name: '',
    sno: ''
  };
  datauser: any;
  mois: any;
  communication: number;
  loyer: number;
  divers: number;
  nourriture: number;
  taxes: number;
  transport: number;

  /*  dataInfo: any = []; */
  animals: string[] = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];



  constructor(
    public http: HttpClient,
    private pickerController: PickerController,
    private modalController: ModalController,
    public platform: Platform,
    public api: ApiService) {


    this.platform.ready().then(() => {
      /*  this.SaveUserData(); */
      /*  this.final = this.budget - this.loyer - this.nourriture - this.taxes - this.divers; */
    });

  }



  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value.Animals.text);
            this.mois = value.Animals.text;
          }
        }
      ],
      columns: [{
        name: 'Animals',
        options: this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present();
  }

  getColumnOptions() {
    let options = [];
    this.animals.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.getDataUser();
  }






  getDataUser() {
    this.api.getDataUser()
      .subscribe(res => {
        console.log(res);
        this.datauser = res;
        console.log(this.datauser);
      }, err => {
        console.log(err);
      });
  }


  SaveUserData() {
    // tslint:disable-next-line: prefer-const
    let dataToSend = {
      Id_mois: this.mois,
      feecommunication: this.communication,
      feeloyer: this.loyer,
      budget: this.finance.budget,
      feedivers: this.divers,
      feenourriture: this.nourriture,
      feetaxes: this.taxes,
      feetransport: this.transport

    };
    console.log(dataToSend);
    const url = 'http://localhost:3300/newMonth/';
    this.http.post(url, {
      data: JSON.stringify
        (dataToSend)
    }, {
      headers: new HttpHeaders
        ({ 'content-Type': 'application/json' })
    }).subscribe(
      (data) => {
        console.log(data);
      });
  }

  closePopup() {
    this.modalController.dismiss();
  }


  cliquerPourValider() {
    this.budgetCond = false;
  }

  cliquerPourModifier() {
    this.budgetCond = true;
    /* this.budget = 0; */
  }

}

