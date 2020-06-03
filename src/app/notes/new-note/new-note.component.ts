import {Component, OnInit} from '@angular/core';
import {ApiNewNote} from '../notes-client.service';
import {NotesService} from '../notes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  note: ApiNewNote = {title: ''};

  constructor(private service: NotesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.note = {title: ''};
  }

  async createNote() {
    const note = await this.service.createNote(this.note).toPromise();
    await this.router.navigate(['..', note.id], {relativeTo: this.route});
  }

}
