import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('https://messanger-z2m6.onrender.com');

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>('https://messanger-z2m6.onrender.com/api/messages');
  }
  
  sendMessage(message: any): Observable<any> {
    return this.http.post('https://messanger-z2m6.onrender.com/api/messages', message);
  }
  
  deleteData(){
    return this.http.delete<any[]>('https://messanger-z2m6.onrender.com/api/messages');
  }

  listenForMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (msg: any) => {
        observer.next(msg);
      });
    });
  }

  listenForTyping(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('typing', (data: any) => {
        observer.next(data);
      });
    });
  }

  listenForOnlineUsers(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('online', (data: any) => {
        observer.next(data);
      });
    });
  }

  emitMessage(message: any) {
    this.socket.emit('sendMessage', message); // Use 'sendMessage' event
  }

  emitTyping(data: any) {
    this.socket.emit('typing', data);
  }

  emitOnline(data: any) {
    this.socket.emit('online', data);
  }
}
