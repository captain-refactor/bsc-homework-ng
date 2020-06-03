import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
  }

}
