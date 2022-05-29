import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotterySuccessComponent } from './lottery-success.component';

describe('LotterySuccessComponent', () => {
  let component: LotterySuccessComponent;
  let fixture: ComponentFixture<LotterySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotterySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotterySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
