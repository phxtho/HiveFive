import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../models/room';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Socket.fromEvent gives Observable from the specified event
  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<string[]>('rooms');

  // Constructor injection of socket
  constructor(private socket: Socket) { }

  getRoom(id: string) {
    this.socket.emit('getRoom', id);
  }

  sendMessage(roomId: string, message: Message) {
    this.socket.emit('new-message', {roomId, message});
  }
}
