import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarListComponent } from './jar-list.component';

describe('JarListComponent', () => {
  let component: JarListComponent;
  let fixture: ComponentFixture<JarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
