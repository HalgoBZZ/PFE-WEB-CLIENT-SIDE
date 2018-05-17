import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdl2Component } from './pdl2.component';

describe('Pdl2Component', () => {
  let component: Pdl2Component;
  let fixture: ComponentFixture<Pdl2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pdl2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pdl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
