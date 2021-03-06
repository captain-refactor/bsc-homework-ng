import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotesComponent} from './notes/notes.component';
import {NotesRoutingModule} from './notes-routing/notes-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NewNoteComponent } from './new-note/new-note.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NotesComponent, NoteDetailComponent, NewNoteComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatIconModule,
    MatListModule,
    FlexModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ]
})
export class NotesModule {
}
