import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('inputBox') inputBox!: ElementRef;

  messages: any[] = [];
  message = '';
  sender = '';
  receiver = 'User2';
  isTyping = false;
  typingTimer: any;
  typingSubscription!: Subscription;
  messageSubscription!: Subscription;
  typer = ''
  
  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getMessages();

    this.chatService.listenForMessages().subscribe((msg: any) => {
      this.messages.push(msg);
      this.cdr.detectChanges();
      this.scrollToBottom();
    });

    this.chatService.listenForTyping().subscribe((data: any) => {
      this.scrollToBottom();
      if(data.typing){
        this.typer = data.sender === '' ? 'Unknown User is typing...' : data.sender + ' is typing...';
        this.isTyping = true;
      }else{
        this.isTyping = false;
        this.typer = '';
      }
    });
  }



  getMessages() {
    this.messages = [];
    this.chatService.getMessages().subscribe((messages: any[]) => {
      this.messages = messages;
      setTimeout(() => {
        this.scrollToBottom();
      })
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
    this.inputBox.nativeElement.focus();
    this.message = '';
    
    this.emitTyping(false);
  }


  delete() {
    this.chatService.deleteData().subscribe((data: any) => {
      console.log(data)
      this.getMessages()
    })
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  onTyping() {
    clearTimeout(this.typingTimer);
    this.emitTyping(true);
    this.typingTimer = setTimeout(() => {
      this.emitTyping(false);
    }, 3000);
  }

  emitTyping(isTyping: boolean) {
    this.chatService.emitTyping({ sender: this.sender, typing: isTyping });
  }


  ngOnDestroy() {
    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}  
