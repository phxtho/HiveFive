import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Room } from '../models/room';

import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {
  rooms: Room[];
  currentRoomId: string;
  private roomListSub: Subscription;
  private roomSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.roomListSub = this.chatService.rooms.subscribe(rooms => { this.rooms = rooms; console.log(rooms); });
    this.roomSub = this.chatService.currentRoom.subscribe(room => this.currentRoomId = room.id);
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
  }

  loadRoom(id: string) {
    this.chatService.getRoom(id);
  }

}
