import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdddataPage } from './adddata.page';

describe('AdddataPage', () => {
  let component: AdddataPage;
  let fixture: ComponentFixture<AdddataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdddataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
