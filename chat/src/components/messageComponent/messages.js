
import React from 'react';
import propTypes from 'prop-types';
import { DateTime } from 'luxon';
import './style.css';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.addMessageInChat = this.addMessageInChat.bind(this);
  }

  addMessageInChat() {
    const { socket } = this.props;
    const { messages } = this.state;
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const dataReverse = data.reverse();
      const newMessages = [...messages, dataReverse];
      this.setState({ messages: newMessages.flat() });
    };
  }

  render() {
    this.addMessageInChat();
    const { messages } = this.state;
    return (
      <div>
        {messages !== [] && (
          <ul id="list-with-messages" className="list-with-messages">
            {messages.map(({
              time, id, from, message,
            }) => (
              (
                <li key={id} className="li-from-list">
                  {`
                ${from}:${message} ${DateTime.fromMillis(time).c.hour}:${DateTime.fromMillis(time).c.minute}
                ${DateTime.fromMillis(time).c.day}/${DateTime.fromMillis(time).c.month}/${DateTime.fromMillis(time).c.year}
              `}
                  {window.scrollTo(0, 10000000)}
                </li>
              )
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Messages;


Messages.propTypes = {
  socket: propTypes.shape({
    onmessage: propTypes.func,
  }),
};

Messages.defaultProps = {
  socket: propTypes.shape({
    onmessage: () => {},
  }),
};
