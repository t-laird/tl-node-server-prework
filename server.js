const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];


server.listen(3000, () => {
  console.log("the server is running on LH3000");
});

// server.on('request', (request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write('Hello World\n');
//   response.end();
// });

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  } else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      let messageData = JSON.parse(data);
      console.log('29', messageData);
      console.log(typeof messageData);
      newMessage = Object.assign(newMessage, messageData);
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

const getAllMessages = (res) => {
  res.writeHead(201, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(messages));
  res.end();
};

const addMessage = (newMessage, res) => {
  // console.log('45', newMessage);
  messages = [...messages, newMessage];
  res.writeHead(201, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(newMessage));
  res.end();
};