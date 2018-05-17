import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Releve2Component } from './releve2.component';

describe('Releve2Component', () => {
  let component: Releve2Component;
  let fixture: ComponentFixture<Releve2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Releve2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Releve2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
