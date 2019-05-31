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
  currentRoom: Room;
  currentRoomName: string;
  private roomSub: Subscription;
  private roomListSub: Subscription;

  sender: string = 'Anonymous';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.roomListSub = this.chatService.rooms.subscribe(rooms => {
      this.rooms = rooms;
      console.log('room-list got ' + this.rooms.length + ' rooms from rooms subscrition');

      if (!this.currentRoom) {
        this.currentRoom = rooms[0];
      }

    });

    this.roomSub = this.chatService.currentRoom.subscribe(room => {
      this.currentRoom = room;
      console.log('room-list got ' + this.currentRoom.id + ' from room subscrition');
    });
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
    this.roomListSub.unsubscribe();
  }

  loadRoom(chosenRoom: Room) {
    this.chatService.joinRoom(chosenRoom.id);
    this.currentRoomName = chosenRoom.id;
  }

  nameToId(name: string) {
    let index = 0;
    for (const iterator of this.rooms) {
      if (name === iterator.id) {
        return index;
      }
      index += 1;
    }
  }

}
