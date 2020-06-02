import {Injectable} from '@angular/core';
import {ApiNote, NotesClientService} from './notes-client.service';
import {Observable, Subject} from 'rxjs';
import {share, startWith, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private refetchNotesSubject = new Subject();

  notes$ = this.refetchNotesSubject.pipe(startWith({}), switchMap(() => this.client.getNotes()), share());

  constructor(private client: NotesClientService) {
  }

  async refetchNotes() {
    this.refetchNotesSubject.next();
  }
}
