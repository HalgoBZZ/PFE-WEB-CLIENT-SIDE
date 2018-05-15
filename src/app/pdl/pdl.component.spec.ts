import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdlComponent } from './pdl.component';

describe('PdlComponent', () => {
  let component: PdlComponent;
  let fixture: ComponentFixture<PdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
