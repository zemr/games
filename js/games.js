function game1() {
  var root = document.getElementById('game');
  var close = document.getElementById('close');
  var coverScheme = '<div class="cover">' +
    '<div class="message"></div>' +
    '<button class="button" id="start"></button>' +
    '</div>';
  var countdown, dry, keepingWatered;
  var count;

  function generateCover(type) {
    root.innerHTML = coverScheme;
    fillCover(type);
    prepareStartingGameButton();
  }

  function fillCover(type) {
    var message = document.getElementsByClassName('message');
    var button = document.getElementsByClassName('button');
    if (type === 'front') {
      message[0].textContent = 'Masz pod swoją opieką sadzonki. ' +
        'Twoim zadaniem jest dopilnować, żeby żadna z nich nie uschła.' +
        'Podlewaj je kliknięciami, gdy zaczną więdnąć, ale uważaj, żeby ich nie przelać, bo zgniją.';
      button[0].textContent = 'Rozpocznij grę';
    } else if (type === 'back') {
      message[0].textContent = 'Koniec gry';
      button[0].textContent = 'Ponów';
    }
  }

  function prepareStartingGameButton() {
    var start = document.getElementById('start');
    start.onclick = function() {
      root.innerHTML = putPlants();
      setTimeout(function() {
        root.onclick = waterPlant;
        startWatering();
        countdown = setTimeout(stopGame, 100000);
      }, 0);
    };
  }

  function setCount(width, height) {
    var places = (width * height - (width * height * 0.35)) / 20000;
    return count = Math.floor(places);
  }

  if (window.innerWidth < 760) {
    setCount(innerWidth, innerHeight);
  } else {
    count = 16;
  }

  function putPlants() {
    var plants = '<div class="plants">';
    for (var i = 1; i < count; i++) {
      plants += '<span id="' + i + '" class="stage_3"></span>';
    }
    plants += '</div>';
    return plants;
  }

  function choosePlant() {
    var plants = document.querySelectorAll('.stage_3, .stage_2, .stage_1');
    if (plants.length < 1) stopGame();
    var randomPlant = Math.floor(Math.random() * (plants.length));
    return plants[randomPlant];
  }

  function checkSoil(plant) {
    return plant.classList.item(0).split('_')[1];
  }

  function dryingOut(plant, stage, counter) {
    if (counter === 3) {
      return counter;
    }
    plant.classList = '';
    plant.classList.add('stage_' + (stage - 1));
    dry = setTimeout(function () {
      dryingOut(plant, stage - 1, counter + 1);
    }, 800);
    return dry;
  }

  function stopDryingOut() {
    clearTimeout(dry);
  }

  function waterPlant(e) {
    var target = e.target;
    if (target.id) {
      var stage = target.classList.item(0);
      if (stage !== 'stage_4' && stage !== 'stage_0') {
        target.classList = '';
        target.classList.add('stage_' + (+stage.split('_')[1] + 1));
      }
    }
  }

  function startWatering() {
    keepingWatered = setInterval(function () {
      var plant = choosePlant();
      if (plant) {
        var soilStage = checkSoil(plant);
        plant.onclick = stopDryingOut;
        dryingOut(plant, soilStage, 3 - soilStage);
      }
    }, 1200);
  }

  function stopGame() {
    clearInterval(keepingWatered);
    clearInterval(countdown);
    generateCover('back');
  }

  generateCover('front');
  close.addEventListener('click', stopGame);

}

function game2() {
  var root = document.getElementById('game');
  var classes = ['a', 'b', 'c', 'd'];
  var block, blockType;

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
      }, 500);
    }
  }

  root.innerHTML = generateView();
  addEvents();
}
