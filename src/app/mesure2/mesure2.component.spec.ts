import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mesure2Component } from './mesure2.component';

describe('Mesure2Component', () => {
  let component: Mesure2Component;
  let fixture: ComponentFixture<Mesure2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mesure2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mesure2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
