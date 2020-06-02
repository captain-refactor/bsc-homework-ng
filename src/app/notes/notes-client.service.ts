import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesClientService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createNote(note: ApiNewNote): Observable<ApiNote> {
    return this.http.post<ApiNote>(`${this.baseUrl}/notes`, note);
  }

  getNotes(): Observable<ApiNote[]> {
    return this.http.get<ApiNote[]>(`${this.baseUrl}/notes`);
  }

  getNote(noteId: number): Observable<ApiNote> {
    return this.http.get<ApiNote>(`${this.baseUrl}/notes/${noteId}`, {});
  }

  removeNote(noteId: number): Observable<unknown> {
    return this.http.delete(`/notes/${noteId}`);
  }

  updateNote(note: ApiUpdateNote): Observable<ApiNote> {
    const {id, ...body} = note;
    return this.http.put<ApiNote>(`/notes/${id}`, body);
  }
}

interface ApiId {
  id: number;
}

interface ApiNoteData {
  title: string;
}

export interface ApiNote extends ApiId, ApiNoteData {
}

export interface ApiNewNote extends ApiNoteData {
}

export interface ApiUpdateNote extends ApiNoteData, ApiId {
}

