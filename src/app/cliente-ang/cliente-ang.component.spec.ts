import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAngComponent } from './cliente-ang.component';

describe('ClienteAngComponent', () => {
  let component: ClienteAngComponent;
  let fixture: ComponentFixture<ClienteAngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteAngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
