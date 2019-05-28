import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message';
import { Room } from '../models/room';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: Room;
  currentMessage: Message;
  messages: Subscription;
  typing: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // loop through all the message history and display it
    this.typing = this.chatService.messages.subscribe(typing => console.log(typing));
    this.messages = this.chatService.messages.subscribe(message =>
      this.room.messages.push(message)
    );
  }

  sendMessage() {
    // Send message to server
    this.chatService.sendMessage(this.room.id, this.currentMessage );
    // Clear input field
    this.currentMessage.content = '';
  }
}
