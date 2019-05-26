import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message';
import { Room } from '../models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: Room;
  message: Message;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // loop through all the message history and display it
  }

  sendMessage() {
    this.chatService.sendMessage(this.room.id, this.message );
    this.message.content = '';
  }
}
