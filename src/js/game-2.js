function game2() {
  var coverContent = {
    messageContent: 'Przeciągnij kolorowe bloki na odpowiednie miejsca na środku ekranu.',
    buttonContent: 'Rozpocznij grę'
  };
  var classes = ['a', 'b', 'c', 'd'];
  var block, blockType;

  function prepareGame() {
    root.innerHTML = generateView();
    addEvents();
  }

  function prepareStartingGameButton() {
    var start = document.getElementById('start');
    start.onclick = prepareGame;
  }

  function shuffle(classes) {
    var i = 3;
    while (i > 0) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = classes[i];
      classes[i] = classes[j];
      classes[j] = temp;
      i--;
    }
  }

  function generateTop() {
    shuffle(classes);
    var str = '<div class="top">';
    var i = 0;
    while (i < 4) {
      str += '<div class="' + classes[i] + '-top source" draggable="true"></div>';
      i++;
    }
    str += '</div>';
    return str;
  }

  function generateBottom() {
    shuffle(classes);
    var str = '<div class="bottom">';
    var i = 0;
    while (i < 4) {
      str += '<div class="' + classes[i] + '-bottom target"></div>';
      i++;
    }
    str += '</div>';
    return str;
  }

  function generateView() {
    return generateTop().concat(generateBottom());
  }

  function addEvents() {
    var blocks = document.getElementsByClassName('source');
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].addEventListener('dragstart', handleDragStart, false);
      blocks[i].addEventListener('dragend', handleBlockDragEnd, false);
    }

    var targets = document.getElementsByClassName('target');
    for (i = 0; i < targets.length; i++) {
      targets[i].addEventListener('dragover', handleDragOver, false);
      targets[i].addEventListener('dragenter', handleDragEnter, false);
      targets[i].addEventListener('dragleave', handleDragLeave, false);
      targets[i].addEventListener('drop', handleDrop, false);
      targets[i].addEventListener('dragend', handleDragEnd, false);
    }
  }

  function removeEvents() {
    block.removeEventListener('dragstart', handleDragStart, false);
    block.parentNode.removeEventListener('dragenter', handleDragEnter, false);
    block.parentNode.removeEventListener('dragleave', handleDragLeave, false);
    block.parentNode.removeEventListener('drop', handleDrop, false);
  }

  function handleDragStart(e) {
    e.target.style.opacity = 0.6;
    block = e.target;
    blockType = e.target.className[0];
    e.dataTransfer.setData("text/html", e.target.className);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter(e) {
    if (e.target.className[0] === blockType) {
      e.target.style.transform = 'scale(.8)';
    }
  }

  function handleDragLeave() {
    this.style.transform = '';
  }

  function handleDragEnd() {
    this.style.transform = '';
  }

  function handleBlockDragEnd() {
    this.style.opacity = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    if (e.target.className[0] === blockType) {
      e.target.appendChild(block);
      block.removeAttribute('draggable');
      block.parentNode.style.border = 'none';
      removeEvents();
      makeEmpty();
      checkEmpties();
    }
  }

  function makeEmpty() {
    var top = document.getElementsByClassName('top');
    var div = document.createElement('div');
    div.classList.add('empty');
    top[0].appendChild(div);
  }

  function checkEmpties() {
    var empties = document.getElementsByClassName('empty');
    if (empties.length === 4) {
      setTimeout(function() {
        var set = document.getElementsByClassName('bottom');
        set[0].style.transform = 'scale(0.7) rotate(45deg)';
        generateReplayButton(empties[1]);
      }, 400);
    }
  }

  function generateReplayButton(target) {
    target.classList.add('replay');
    target.onclick = prepareGame;
  }

  generateCover(coverContent);
  prepareStartingGameButton();
}
