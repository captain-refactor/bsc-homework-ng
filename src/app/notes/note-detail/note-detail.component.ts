import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ApiNote} from '../notes-client.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDetailComponent implements OnInit {


  note$ = this.route.params.pipe(switchMap(params => this.notesService.getNote(+params.id)));

  constructor(private notesService: NotesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  async updateNote(note: ApiNote) {
    await this.notesService.updateNote(note).toPromise();
  }

}
