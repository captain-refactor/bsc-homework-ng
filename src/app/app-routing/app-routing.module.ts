import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'notes'
      },
      {
        path: 'notes',
        loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule)
      },
      {
        path: '**',
        redirectTo: 'notes'
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
