import {Component} from '@angular/core';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {

  constructor(public notesService: NotesService) {
  }

}
