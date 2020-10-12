import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { ApiService } from './../api.service';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-adddatanow',
  templateUrl: './adddatanow.page.html',
  styleUrls: ['./adddatanow.page.scss'],
})
export class AdddatanowPage implements OnInit {

  budget: number;
  budgetCond = true;
  date = new Date();
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
  years: any;
  communication: number;
  loyer: number;
  divers: number;
  nourriture: number;
  taxes: number;
  transport: number;

  /*  dataInfo: any = []; */
  month: string[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
  year: string[] = ['2020', '2021', '2022', '2023'];

  constructor(
    public http: HttpClient,
    private pickerController: PickerController,
    public platform: Platform,
    public api: ApiService) {

    this.platform.ready().then(() => {
      /*  this.SaveUserData(); */
      /*  this.final = this.budget - this.loyer - this.nourriture - this.taxes - this.divers; */
    });
  }
  allShow() {
    this.showPicker();
    this.yearPicker();
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
            console.log(value.MONTHS.text);
            this.mois = value.MONTHS.text;
          }
        }
      ],
      columns: [{
        name: 'MONTHS',
        options: this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present();

  }
  async yearPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value.YEARS.text);
            this.years = value.YEARS.text;
          }
        }
      ],
      columns: [{
        name: 'YEARS',
        options: this.getColumnOptions2()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present();
  }

  getColumnOptions2() {
    let options = [];
    this.year.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  getColumnOptions() {
    let options = [];
    this.month.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }

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
      Id_year: this.years,
      feecommunication: this.communication,
      feeloyer: this.loyer,
      budget: this.finance.budget,
      feedivers: this.divers,
      feenourriture: this.nourriture,
      feetaxes: this.taxes,
      feetransport: this.transport,
      date: this.date

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
    this.mois = null;
    this.years = null;
    this.communication = null;
    this.loyer = null;
    this.finance.budget = null;
    this.divers = null;
    this.nourriture = null;
    this.taxes = null;
    this.transport = null;
    this.date = null;
  }

  cliquerPourValider() {
    this.budgetCond = false;
  }

  cliquerPourModifier() {
    this.budgetCond = true;
    /* this.budget = 0; */
  }
}
