import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveurListComponent } from './releveur-list.component';

describe('ReleveurListComponent', () => {
  let component: ReleveurListComponent;
  let fixture: ComponentFixture<ReleveurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleveurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
