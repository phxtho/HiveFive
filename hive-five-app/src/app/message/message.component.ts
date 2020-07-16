import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  getNickname(sender) {
    console.log(sender);
    this.chatService.getNickname(sender).subscribe((data) => {
      console.log(data);
      alert(`Your nickname: ${data.name}`);
    });
  }

}
