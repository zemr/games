function game1() {
  var root = document.getElementById('game');
  var close = document.getElementById('close');
  var coverScheme = '<div class="cover">' +
    '<div class="message"></div>' +
    '<button class="button" id="start"></button>' +
    '</div>';
  var dry, keepingWatered;
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
        setTimeout(stopGame, 100000);
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
    generateCover('back');
  }

  generateCover('front');
  close.addEventListener('click', stopGame);

}

function game2() {
  var root = document.getElementById('game');
  root.innerHTML = "druga";
}
