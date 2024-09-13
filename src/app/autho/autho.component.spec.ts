import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoComponent } from './autho.component';

describe('AuthoComponent', () => {
  let component: AuthoComponent;
  let fixture: ComponentFixture<AuthoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
