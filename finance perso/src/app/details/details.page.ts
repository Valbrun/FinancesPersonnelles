import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { ApiService } from './../api.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  budget: number;
  budgetCond = true;

  datauser: any;

  communication: number;
  loyer: number;
  divers: number;
  nourriture: number;
  taxes: number;
  transport: number;
  id_mois: any;
  total: any;
  annee: any;



  constructor(
    public http: HttpClient,
    private route: ActivatedRoute, private router: Router,
    public platform: Platform,
    public api: ApiService) {

    this.route.queryParams.subscribe(res => {
      console.log(res.mois);
      this.id_mois = res.mois;
      this.loyer = res.loyer;
      this.divers = res.divers;
      this.nourriture = res.nourriture;
      this.transport = res.transport;
      this.communication = res.communication;
      this.taxes = res.taxes;
      this.budget = res.budget;
      this.annee = res.annee; 
      this.total = this.budget - this.loyer - this.divers - this.nourriture - this.transport - this.communication - this.taxes;
    });

    this.platform.ready().then(() => {
      /*  this.SaveUserData(); */
      /*  this.final = this.budget - this.loyer - this.nourriture - this.taxes - this.divers; */
    });
  }


  ngOnInit() {
    /*  this.getDataUser(); */
    this.openChart();
  }

  openChart() {
    var ctx = (document.getElementById('myChartPie') as any).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'pie',
      data: {

        labels: ['Taxes', 'Loyer', 'nourriture', 'transport', 'communication', 'divers'],

        datasets: [{
          label: 'mes dépenses',
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(175,192,19,0.2)',
            'rgba(25, 5, 12, 0.2)',
            'rgba(255, 255, 0,0.2)',
            'rgba(62, 0, 220,0.2)'
          ],

          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(175,192,19,1)',
            'rgba(25, 5, 12, 1)',
            'rgba(255, 255, 0,1)',
            'rgba(62, 0, 220,1)',
          ],

          data: [this.taxes, this.loyer, this.nourriture, this.transport, this.communication, this.divers],
          borderWidth: 1
        }]
      },
      options: {
        /*  responsive: true, */
        legend: {
          position: 'bottom'
        },
        plugins: {
          datalabels: {
            color: '#fff',
            anchor: 'end',
            align: 'start',
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 25,
            backgroundColor: (context) => {
              return context.dataset.backgroundColor;
            },
            font: {
              weight: 'bold',
              size: 10
            },
            formatter: (value) => {
              return value + '%';
            }

          }
        }
      }
    });

    var ctx = (document.getElementById('myChart') as any).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'doughnut',
      data: {

        labels: ['Taxes', 'Loyer', 'nourriture', 'transport', 'communication', 'divers', 'santé'],

        datasets: [{
          label: 'mes dépenses',
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(25, 5, 12, 0.2)',
            'rgba(255, 255, 0,0.2)',
            'rgba(62, 0, 220,0.2)'
          ],

          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(75,192,192,1)',
            'rgba(25, 5, 12, 1)',
            'rgba(255, 255, 0,1)',
            'rgba(62, 0, 220,1)',
          ],

          data: [this.taxes, this.loyer, this.nourriture, this.transport, this.communication, this.divers, 0],
          borderWidth: 1
        }]
      },
      options: {
        /*  responsive: true, */
        legend: {
          position: 'bottom'
        },
        plugins: {
          datalabels: {
            color: '#fff',
            anchor: 'end',
            align: 'start',
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 25,
            backgroundColor: (context) => {
              return context.dataset.backgroundColor;
            },
            font: {
              weight: 'bold',
              size: 10
            },
            formatter: (value) => {
              return value + '%';
            }

          }
        }
      }
    });


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

  cliquerPourValider() {
    this.budgetCond = false;
  }

  cliquerPourModifier() {
    this.budgetCond = true;
    /* this.budget = 0; */
  }

}
