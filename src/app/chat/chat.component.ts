import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message = '';
  sender = '';
  receiver = 'User2';

  constructor(private chatService: ChatService) {}

 ngOnInit(): void {
  this.getMessages();

  this.chatService.listenForMessages().subscribe((msg: any) => {
    this.messages.push(msg); 
  });
}


  getMessages() {
    this.messages = [];
    this.chatService.getMessages().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (!this.message.trim()) return; 
  
    const msg = {
      sender: this.sender === '' ? 'Unknown User' : this.sender, 
      receiver: this.receiver,
      message: this.message,
    };

    this.chatService.emitMessage(msg);
    this.message = ''; 
  }
  

  delete(){
    this.chatService.deleteData().subscribe((data:any)=>{
      console.log(data)
      this.getMessages()
    })
  }
}  
