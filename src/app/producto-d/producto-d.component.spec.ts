import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDComponent } from './producto-d.component';

describe('ProductoDComponent', () => {
  let component: ProductoDComponent;
  let fixture: ComponentFixture<ProductoDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
