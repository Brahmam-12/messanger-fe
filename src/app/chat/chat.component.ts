import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  
  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef, private activatedroute: ActivatedRoute) { }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustMainContainerHeight();
  }
  private adjustMainContainerHeight() {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    console.log(mainContainer)
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    console.log(viewportHeight)
    const keyboardHeight = window.innerHeight - viewportHeight;
    console.log(keyboardHeight)

    if (keyboardHeight > 0) {
      mainContainer.style.height = `calc(100vh - ${keyboardHeight}px)`;
    } else {
      mainContainer.style.height = 'calc(100vh - 2px)';
    }
  }

  ngOnInit(): void {
    this.activatedroute.queryParamMap.subscribe((params: any) => {
      this.sender = params.params.user
      this.chatService.emitOnline({ username: this.sender, online: true });
    });

    this.chatService.listenForMessages().subscribe((msg: any) => {
      this.messages.push({type: 'message', sender: msg.sender, message: msg.message});
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

    this.chatService.listenForOnlineUsers().subscribe((data: any) => {
      console.log(data)
      if(data.username === this.sender) return;
      else if(data.online === true){
        this.messages.push({ 
          type: 'status',
          status: `${data.username} has joined the chat`
        });
      }else if(data.status === 'offline'){
        this.messages.push({ 
          type: 'status',
          status: `${data.username} has left the chat`
        });
      }
      
      console.log(this.messages)
    });

    this.getMessages();
    this.adjustMainContainerHeight();
  }

  getMessages() {
    this.messages = [];
    this.chatService.getMessages().subscribe((messages: any[]) => {
      messages.forEach((msg) => {
        this.messages.push({type: 'message', sender: msg.sender, message: msg.message});
      });

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
