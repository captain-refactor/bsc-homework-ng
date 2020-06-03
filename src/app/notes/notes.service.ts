import {Injectable} from '@angular/core';
import {ApiNewNote, ApiNote, NotesClientService} from './notes-client.service';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {filter, map, pluck, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  // this subject holds a state of notes
  private notesSubject = new BehaviorSubject<NotesMap>({});

  notes$: Observable<NotesMap> = merge(
    this.fetchNotesOnSubscribe(),
    this.notesSubject,
  ).pipe(shareReplay(1));

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
          const notes = this.notesSubject.getValue();
          notes[note.id] = note;
          this.notesSubject.next(notes);
        })
      );
  }

  createNote(note: ApiNewNote) {
    return this.client.createNote(note)
      .pipe(tap((newNote) => {
        const notes = this.notesSubject.getValue();
        notes[newNote.id] = newNote;
        this.notesSubject.next(notes);
      }));
  }

  // instead of init method, this observable downloads notes on subscribe
  private fetchNotesOnSubscribe(): Observable<any> {
    return new Observable(subscriber => {
      this.client.getNotes()
        .pipe(map(toNotesMap))
        .subscribe(notes => this.notesSubject.next(notes));
      subscriber.complete();
    });
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
