import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(): Promise<ApiNote[]>{
    this.http.get('/notes')
  }
}


export interface ApiNote {
  id: number;
  title: string;
}
