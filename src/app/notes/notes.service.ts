import {Injectable} from '@angular/core';
import {ApiNewNote, ApiNote, NotesClientService} from './notes-client.service';
import {merge, Observable, Subject} from 'rxjs';
import {filter, map, pluck, scan, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private changeNotesSubject = new Subject<NotesMap>();

  notes$: Observable<NotesMap> = merge(
    this.client.getNotes().pipe(map(toNotesMap)),
    this.changeNotesSubject,
  ).pipe(
    scan<NotesMap>((notes, update) => Object.assign(notes, update), {}),
    shareReplay(1)
  );

  notesArray$: Observable<ApiNote[]> = this.notes$.pipe(map(toNotesArray));

  constructor(private client: NotesClientService) {
  }

  getNote(id: number): Observable<ApiNote> {
    const cachedNote$ = this.notes$
      .pipe(
        pluck(id),
        filter(n => !!n)
      );
    const fromNoteApi$ = this.client.getNote(id)
      .pipe(
        filter(n => n.id === id) // apiary doesn't always return right note, so we have to filter it
      );
    const makeACopy = map<ApiNote, ApiNote>(n => ({...n}));
    return merge(cachedNote$, fromNoteApi$).pipe(makeACopy);
  }

  updateNote(note: ApiNote): Observable<ApiNote> {
    return this.client.updateNote(note)
      .pipe(
        tap(() => {
          this.changeNotesSubject.next({[note.id]: note});
        })
      );
  }

  createNote(note: ApiNewNote) {
    return this.client.createNote(note)
      .pipe(tap((newNote) => {
        this.changeNotesSubject.next({[newNote.id]: newNote});
      }));
  }
}

export type NotesMap = Record<number, ApiNote>;

function toNotesArray(notes: NotesMap): ApiNote[] {
  return Object.keys(notes).map(id => notes[id]);
}

function toNotesMap(notes: ApiNote[]): NotesMap {
  return notes
    .reduce<NotesMap>(
      (notesMap, note) => {
        notesMap[note.id] = note;
        return notesMap;
      }, {});
}
