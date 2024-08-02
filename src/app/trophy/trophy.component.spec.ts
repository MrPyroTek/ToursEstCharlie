import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyComponent } from './trophy.component';

describe('TrophyComponent', () => {
  let component: TrophyComponent;
  let fixture: ComponentFixture<TrophyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
