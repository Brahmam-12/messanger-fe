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
    console.log('New message received:', msg);
    this.messages.unshift(msg); // Add new message to the top
  });
}


  getMessages() {
    this.chatService.getMessages().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (!this.message.trim()) return; // Prevent sending empty messages
  
    const msg = {
      sender: this.sender, // Dynamically set sender
      receiver: this.receiver,
      message: this.message,
    };
  
    console.log('Sending message:', msg); // Debugging line
    this.chatService.sendMessage(msg).subscribe(() => {
      this.message = '';
    });
  
    this.chatService.emitMessage(msg); // Emit through WebSocket
  }
  delete(){
    this.chatService.deleteData().subscribe((data:any)=>{
      console.log(data)
      this.getMessages()
    })
  }
}  
