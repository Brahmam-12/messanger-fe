import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule if you're using ngModel
import { HttpClientModule } from '@angular/common/http';
import { OnlineComponent } from './online/online.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    OnlineComponent,  
  ],
  imports: [
    BrowserModule,
    FormsModule,  // For ngModel to work
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
