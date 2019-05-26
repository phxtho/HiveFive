import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {
  rooms: Observable<string[]>;
  currentRoomId: string;
  private roomSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.rooms = this.chatService.rooms;
    this.roomSub = this.chatService.currentRoom.subscribe(room => this.currentRoomId = room.id);
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
  }

  loadRoom(id: string) {
    this.chatService.getRoom(id);
  }

}
