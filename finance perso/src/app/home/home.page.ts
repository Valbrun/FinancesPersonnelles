import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdddataPage } from '../adddata/adddata.page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { ApiService } from './../api.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  datauser: any;
  count: any;
  total: number;
  bonify: number = -1;

  constructor(
    public http: HttpClient,
    private router: Router,
    private modalController: ModalController,
    public api: ApiService,
    public platform: Platform) {

    this.platform.ready().then(() => {
      /*  this.SaveUserData(); */
      /*  this.final = this.budget - this.loyer - this.nourriture - this.taxes - this.divers; */
    });

  }

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser() {
    this.api.getDataUser()
      .subscribe(res => {
        console.log(res);
        this.datauser = res;
        this.count = this.datauser.length;
        console.log(this.datauser);
        // tslint:disable-next-line: max-line-length
      }, err => {
        console.log(err);
      });
  }

  // async OpenAdddata() {
  //   const popup = await this.modalController.create
  //     (
  //       {
  //         component: AdddataPage
  //       }
  //     );
  //   return await popup.present();
  // }

  showdata(data: any): void {
    this.router.navigate(['/details'], {
      queryParams: {
        mois: data.id_mois,
        annee: data.annee,
        taxes: data.taxes,
        loyer: data.loyer,
        divers: data.divers,
        nourriture: data.nourriture,
        transport: data.transport,
        communication: data.communication,
        budget: data.budget
      }
    });
    console.log(data);
  }

}

