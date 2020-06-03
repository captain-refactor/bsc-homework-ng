import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NoteDetailComponent} from '../note-detail/note-detail.component';
import {NotesComponent} from '../notes/notes.component';
import {NewNoteComponent} from '../new-note/new-note.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotesComponent,
        children: [
          {
            path: 'new',
            component: NewNoteComponent
          },
          {
          path: ':id',
          component: NoteDetailComponent
        }]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class NotesRoutingModule {
}
