function game1() {
  var root = document.getElementById('game');
  var close = document.getElementById('close');
  var dry, keepingWatered;

  function putPlants() {
    var plants = '<div class="plants">';
    for (var i = 1; i < 15; i++) {
      plants += '<span id="' + i + '" class="stage_3"></span>';
    }
    plants += '</div>';
    return plants;
  }

  function choosePlant() {
    var plants = document.querySelectorAll('.stage_3, .stage_2, .stage_1');
    if (plants.length <= 1) stopGame();
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
    }, 1500);
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

  function stopGame() {
    clearInterval(keepingWatered);
  }

  root.innerHTML = putPlants();
  root.onclick = waterPlant;
  close.addEventListener('click', stopGame);

  keepingWatered = setInterval(function () {
    var plant = choosePlant();
    var soilStage = checkSoil(plant);
    plant.onclick = stopDryingOut;
    dryingOut(plant, soilStage, 3 - soilStage);
  }, 2000);

  setTimeout(stopGame, 60000);

}

function game2() {
  var root = document.getElementById('game');
  root.innerHTML = "druga";
}
