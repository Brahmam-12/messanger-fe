import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineComponent } from './online/online.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: 'online', component: OnlineComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: 'online', pathMatch: 'full' },
  { path: '**', redirectTo: 'online' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

