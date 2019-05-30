import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
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
  private roomSub: Subscription;
  private roomListSub: Subscription;

  sender: string = "Anonymous";

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.roomSub = this.chatService.currentRoom.subscribe(room => {
      this.currentRoomId = room.id;
      console.log('roomListID:' + this.currentRoomId);
    });
    this.roomListSub = this.chatService.rooms.subscribe(rooms => { 
      this.rooms = rooms; 
      console.log('roomList: ' + this.rooms); 
    });
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
    this.roomListSub.unsubscribe();
  }

  getRoom(chosenRoom: Room) {
    this.chatService.getRoom(chosenRoom.id);
  }

  loadRoom(id: string) {
    this.chatService.getRoom(id);
  }

}
