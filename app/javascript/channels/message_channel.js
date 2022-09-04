import consumer from "channels/consumer"
const channel = {};
document.addEventListener('turbo:load', subscribe);
//document.addEventListener('turbo:load', enableBroadcastSubmit);

function subscribe() {
  if(channel.message) consumer.subscriptions.remove(channel.message);
  channel.message = consumer.subscriptions.create("MessageChannel", {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      document.querySelector('#message-display').appendChild(this.template(data));
    },

    template(data) {
      const newMessage = document.createElement('article'),
            messageHeader = document.createElement('div'),
            messageHeaderP = document.createElement('p'),
            messageBody = document.createElement('div'),
            messageBodyP = document.createElement('p');

      newMessage.classList.add('message');

      messageHeader.classList.add('message-header');
      messageHeaderP.textContent = data.user.email;
      messageHeader.appendChild(messageHeaderP);
      newMessage.appendChild(messageHeader);

      messageBody.classList.add('message-body');
      messageBodyP.textContent = data.body;
      messageBody.appendChild(messageBodyP);
      newMessage.appendChild(messageBody);
      return newMessage;
    },

    templateAlt(data) {
      return `<article class="message">
                <div class="message-header">
                  <p>${data.user.email}</p>
                </div>
                <div class="message-body">
                  <p>${data.body}</p>
                </div>
              </article>`
    }
  })
}

//function enableBroadcastSubmit() {
  //const form = document.querySelector('#message-form');
  //if (form) form.addEventListener('submit', broadcastMessage);
//}

//function broadcastMessage(e) {
  //e.preventDefault();
  //const messageBody = document.querySelector('#message-input').value;
  //if (messageBody) channel.message.send({ message: { body: messageBody } });
//}
