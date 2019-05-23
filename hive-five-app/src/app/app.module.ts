import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Angular wrapper for socket.io client
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Angular Material Imports
import {MatToolbarModule, MatIconModule} from '@angular/material';

// Declarations
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

// Address where scoket server is listening
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
