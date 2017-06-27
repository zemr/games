var root = document.getElementById('game');
var coverScheme = '<div class="cover">' +
  '<div class="message"></div>' +
  '<button class="button" id="start"></button>' +
  '</div>';

function generateCover(content) {
  root.innerHTML = coverScheme;
  fillCover(content.messageContent, content.buttonContent);
}

function fillCover(messageContent, buttonContent) {
  var message = document.getElementsByClassName('message');
  var button = document.getElementsByClassName('button');
  message[0].textContent = messageContent;
  button[0].textContent = buttonContent;
}
