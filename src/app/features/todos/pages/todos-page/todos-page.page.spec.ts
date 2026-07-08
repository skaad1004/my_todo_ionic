import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosPagePage } from './todos-page.page';

describe('TodosPagePage', () => {
  let component: TodosPagePage;
  let fixture: ComponentFixture<TodosPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
