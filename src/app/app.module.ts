import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule if you're using ngModel
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,  // Declare ChatComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule,  // For ngModel to work
    HttpClientModule  // To use HttpClient in the service
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
