import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdddatanowPage } from './adddatanow.page';

describe('AdddatanowPage', () => {
  let component: AdddatanowPage;
  let fixture: ComponentFixture<AdddatanowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddatanowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdddatanowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
