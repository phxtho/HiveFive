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

  joinRoom(roomName: string) {
    this.socket.emit('join-room', roomName);
  }

  sendMessage(roomName: string, message: Message) {
    this.socket.emit('new-message', { roomId: roomName, message });
  }
}
