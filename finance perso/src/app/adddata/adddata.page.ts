import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.page.html',
  styleUrls: ['./adddata.page.scss'],
})

export class AdddataPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async closePopup() {
    await this.modalController.dismiss();
  }
}
