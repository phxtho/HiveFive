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
  }

  sendMessage() {
    // Send message to server
    this.chatService.sendMessage(this.room.id, {sender: this.sender, content: this.currentMessage});
    // Clear input field
    this.currentMessage = '';
    this.scroll();
  }

  ngAfterViewInit() {
    this.scroll();
  }

  scroll(){
    const lastMessageID = 'message_'+(this.room.messages.length-1);
    const element = document.getElementById(lastMessageID);
    element.scrollIntoView();
  }
}
