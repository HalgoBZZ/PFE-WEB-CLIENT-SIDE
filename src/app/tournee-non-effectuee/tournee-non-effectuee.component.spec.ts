import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourneeNonEffectueeComponent } from './tournee-non-effectuee.component';

describe('TourneeNonEffectueeComponent', () => {
  let component: TourneeNonEffectueeComponent;
  let fixture: ComponentFixture<TourneeNonEffectueeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourneeNonEffectueeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourneeNonEffectueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
