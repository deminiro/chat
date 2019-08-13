import React from 'react';
import { DateTime } from 'luxon';
import Messages from './messages';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://st-chat.shas.tel');
    this.state = {
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.activate = this.activate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    const newText = event.target.value;
    this.setState({ text: newText });
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.clickChange();
    }
  }

  clickChange() {
    const { text } = this.state;
    const inputSend = document.getElementById('input-text');
    const listWithMessages = document.getElementById('list-with-messages');
    const nickname = localStorage.getItem('nickname');
    this.socket.send(JSON.stringify({
      from: nickname,
      message: text,
    }));
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      const { time, message, from } = newMessage[0];
      const dataFromMessage = `${from}:${message} ${DateTime.fromMillis(time).c.hour}:${DateTime.fromMillis(time).c.minute}
      ${DateTime.fromMillis(time).c.day}/${DateTime.fromMillis(time).c.month}/${DateTime.fromMillis(time).c.year}`;
      listWithMessages.insertAdjacentHTML('beforeend', `<li>${dataFromMessage}</li>`);
      // this.setState({ previousMessage: listWithMessages.innerHTML });
    };
    inputSend.value = '';
  }

  activate() {
    this.socket.onopen = () => {
      console.log('Соединение установлено.');
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log(`Код: ${event.code} причина: ${event.reason}`);
      alert('Произошла ошибка на сервере, нажмите ОК, чтобы перезайти на сервер.');
      window.location.reload();
    };

    this.socket.onmessage = (event) => {
      console.log(`Получены данные ${event.data}`);
    };

    this.socket.onerror = (error) => {
      console.log(`Ошибка ${error.message}`);
      alert('Произошла ошибка на сервере, нажмите ОК, чтобы перезайти на сервер.');
      window.location.reload();
    };
  }

  render() {
    return (
      <div className="container-with-inputs">
        {this.activate()}
        <Messages socket={this.socket} />
        <br />
        <input type="text" onChange={this.handleChange} id="input-text" onKeyUp={this.handleKeyPress} />
        <input type="submit" onClick={this.clickChange} id="input-send" />
      </div>
    );
  }
}

export default Inputs;
