import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomtypeComponent } from './list-roomtype.component';

describe('ListRoomtypeComponent', () => {
  let component: ListRoomtypeComponent;
  let fixture: ComponentFixture<ListRoomtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoomtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
