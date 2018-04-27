import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourneeAvaliderComponent } from './tournee-avalider.component';

describe('TourneeAvaliderComponent', () => {
  let component: TourneeAvaliderComponent;
  let fixture: ComponentFixture<TourneeAvaliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourneeAvaliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourneeAvaliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
