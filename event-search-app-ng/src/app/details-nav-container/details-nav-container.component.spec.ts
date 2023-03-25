import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNavContainerComponent } from './details-nav-container.component';

describe('DetailsNavContainerComponent', () => {
  let component: DetailsNavContainerComponent;
  let fixture: ComponentFixture<DetailsNavContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsNavContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsNavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
