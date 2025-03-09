import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListModalComponentComponent } from './lesson-list-modal-component.component';

describe('LessonListModalComponentComponent', () => {
  let component: LessonListModalComponentComponent;
  let fixture: ComponentFixture<LessonListModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonListModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
