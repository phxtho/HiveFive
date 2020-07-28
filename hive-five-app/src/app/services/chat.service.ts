import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../models/room';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  constructor(private socket: Socket, private httpClient: HttpClient) {}

  getRoom(id: string) {
    this.socket.emit('getRoom', id);
  }

  sendMessage(roomName: string, message: Message) {
    this.socket.emit('new-message', { roomId: roomName, message });
  }

  getNickname(name): Observable<any> {
    try{
      return this.httpClient.get('http://localhost/nickname', {
      params:
        { name }
    });
    }catch(e) {
      console.log(e);
    }

  }
}
