import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  message = '';
  sender = '';
  receiver = 'User2';
  private resizeListener!: () => void;
  private initialWindowHeight: number = window.innerHeight;

  constructor(private chatService: ChatService, private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(window.innerHeight);
    this.resizeListener = this.renderer.listen('window', 'resize', this.onResize.bind(this));
    this.onResize();

    this.getMessages();
    this.chatService.listenForMessages().subscribe((msg: any) => {
      this.messages.push(msg);
    });
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener(); // Remove the event listener
    }
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


  delete() {
    this.chatService.deleteData().subscribe((data: any) => {
      console.log(data)
      this.getMessages()
    })
  }

  onResize() {
    const chatContainer = document.querySelector('.chat-container') as HTMLElement;
    const chatContent = document.querySelector('.chat-box') as HTMLElement;
    const chatFooter = document.querySelector('.chat-footer') as HTMLElement;
    const chatHeader = document.querySelector('.chat-header') as HTMLElement;

    const currentWindowHeight = window.innerHeight;
    const keyboardHeight = this.initialWindowHeight - currentWindowHeight;

    if (keyboardHeight > 0) { // Keyboard is open
      chatContainer.style.height = `calc(100vh - ${keyboardHeight}px)`;
      chatFooter.style.position = 'fixed';
      chatFooter.style.bottom = '0';
      chatHeader.style.position = 'relative'; // Maintain header relative to avoid overlap
      chatContent.style.height = `calc(100vh - ${keyboardHeight}px - ${chatFooter.offsetHeight}px - ${chatHeader.offsetHeight}px)`;
    } else { // Keyboard is closed
      chatContainer.style.height = '100%';
      chatFooter.style.position = 'relative'; // Maintain relative position for better layout
      chatHeader.style.position = 'relative';
      chatContent.style.height = `calc(100vh - ${chatFooter.offsetHeight}px - ${chatHeader.offsetHeight}px)`;
    }
  }

}  
