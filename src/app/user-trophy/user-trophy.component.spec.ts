import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrophyComponent } from './user-trophy.component';

describe('UserTrophyComponent', () => {
  let component: UserTrophyComponent;
  let fixture: ComponentFixture<UserTrophyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTrophyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTrophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
