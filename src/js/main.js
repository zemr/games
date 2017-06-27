function displayGame(n) {
  var game = document.getElementById('game-container');
  game.style.display = "block";
  window["game" + n]();
}

var tile = document.getElementsByClassName('tile');
for (var i = 0; i < tile.length; i++) {
  tile[i].onclick = (function () {
    var current = i + 1;
    return function () {
      displayGame(current);
    }
  })();
}

var close = document.getElementById('close');
close.onclick = function () {
  close.parentNode.style.display = "none";
};
