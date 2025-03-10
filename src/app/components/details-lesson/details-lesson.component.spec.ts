import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLessonComponent } from './details-lesson.component';

describe('DetailsLessonComponent', () => {
  let component: DetailsLessonComponent;
  let fixture: ComponentFixture<DetailsLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
