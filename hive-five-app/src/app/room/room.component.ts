import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Room } from '../models/room';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Input() sender: string;
  currentMessage: string;
  messages: Subscription;
  typing: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // loop through all the message history and display it
    this.typing = this.chatService.messages.subscribe(typing => console.log(typing));
    this.messages = this.chatService.messages.subscribe(message => {
      this.room.messages.push(message);
      console.log('in room.init ');
    });

    console.log("entered"); // turn on the server
    console.log(this.room);
  }

  sendMessage() {
    console.log("sent");
    // Send message to server
    this.chatService.sendMessage(this.room.id, {sender: this.sender, content: this.currentMessage});
    // Clear input field
    this.currentMessage = '';

    console.log("Sending: " + this.room.id);
  }
}
