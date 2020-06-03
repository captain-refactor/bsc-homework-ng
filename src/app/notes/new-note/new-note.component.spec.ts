import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewNoteComponent} from './new-note.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NewNoteComponent', () => {
  let component: NewNoteComponent;
  let fixture: ComponentFixture<NewNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewNoteComponent],
      imports: [
        MatInputModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
