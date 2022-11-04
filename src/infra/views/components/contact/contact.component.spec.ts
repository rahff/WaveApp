import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { conatct1, conatct2 } from '../../../mocks/fake-data';
import { IContactItem } from '../../../models/IContactIem';
import { DashboardModule } from '../../../modules/dashboard.module';
import { ContactListFacade } from '../../../services/contactList/ContactListFacade';


import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let facadeSpy: any;
  beforeEach(async () => {
    facadeSpy =  jasmine.createSpyObj("ContactListFacade", ["dispatch", "getContactList"])
    await TestBed.configureTestingModule({
      imports: [DashboardModule, RouterTestingModule],
      declarations: [ ContactComponent ],
      providers: [
        {
          provide: ContactListFacade, useValue: facadeSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    facadeSpy.getContactList.and.returnValue(of([conatct1.asDto(), conatct2.asDto()]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recieve contact list', ()=>{
    component.ngOnInit();
    component.contactList$.subscribe((list: IContactItem[])=> {
      expect(list).toEqual([conatct1.asDto(), conatct2.asDto()])
    })
  })
});
