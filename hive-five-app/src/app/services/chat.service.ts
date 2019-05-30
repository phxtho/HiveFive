import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../models/room';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Socket.fromEvent gives Observable from the specified event
  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<Room[]>('rooms');
  messages = this.socket.fromEvent<{ sender: string; content: string }>('new-message');
  typing = this.socket.fromEvent<string>('typing');

  // Constructor injection of socket
  constructor(private socket: Socket) {}

  getRoom(id: string) {
    this.socket.emit('getRoom', id);
  }

  sendMessage(roomId: string, senderName: string, message: Message) {
    message.sender = senderName;
    this.socket.emit('new-message', { roomId, message });
  }

  // getMessages() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('new-message', data => {
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }

  // getTyping() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('typing', data => {
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }
}
