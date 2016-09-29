import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'rxjs/add/operator/map';

@Component({
  selector: 'hello-app',
  template: `
    <main class="wrap" id="myApp">
      <div class="container-fluid">
        <h1>Welcome to Chat</h1>
        <div id="messages"></div>
        <div class="push"></div>
      </div>
    </main>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-8">
            <input type="text" id="message-box" class="form-control input-lg" placeholder="Write a msg">
          </div>
          <div class="col-sm-4">
            <button class="btn btn-primary btn-lg btn-block" id="send-message-btn">Send</button>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class HelloApp {

  ngAfterViewInit(){
    var socket = io();

    $('#send-message-btn').on('click', function () {
      var msg = $('#message-box').val();
      socket.emit('chat', msg);
      $('#messages').append( $('<p>').text(msg) );
      $('#message-box').val('');
      return false;
    });

    socket.on('chat', function (msg) {
      if (typeof msg === 'string') {
          $('#messages').append($('<p>').text(msg));
      } else {
        msg.reverse();
        for(var el of msg){
            $('#messages').append($('<p>').text(el.content));
        }
      }
    });

  }
}


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    HelloApp,
  ],
  bootstrap: [HelloApp],
})
export class AppModule {
}
