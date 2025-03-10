import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLessonComponent } from './update-lesson.component';

describe('UpdateLessonComponent', () => {
  let component: UpdateLessonComponent;
  let fixture: ComponentFixture<UpdateLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
