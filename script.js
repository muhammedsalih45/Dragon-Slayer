let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentArmor = 0;
let fighting;
let monsterHealth;
let inventory = ["Körelmiş Kanlı Balta", "Goblin Döküm Zırhı"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const storeList = document.getElementById("storeList");
const armor = [
  { name: "Goblin Döküm Zırhı", power: 5, price: 0 },
  { name: "Gölge Dansçısı Zırhı", power: 10, price: 80 },
  { name: "Buzul Muhafız Zırhı", power: 15, price: 130 },
  { name: "Karanlık Orman Zırhı", power: 20, price: 180 },
  { name: "Demir Melek Zırhı", power: 25, price: 230 },
  { name: "Ejder Pullu savaş zırhı", power: 30, price: 280 },
  { name: "Semavi Altın Zırh", power: 35, price: 330 },
  { name: "Fırtına Kabuğu Zırhı", power: 50, price: 380 },
];
const weapons = [
  { name: "Körelmiş Kanlı Balta", power: 5, price: 0 },
  { name: "Fırtına Yayı", power: 15, price: 50 },
  { name: "Güneş Mızrağı", power: 25, price: 100 },
  { name: "Kaos Bıçakları", power: 35, price: 150 },
  { name: "Ejderha Katili", power: 45, price: 200 },
  { name: "Şafak Kırıcı", power: 55, price: 250 },
  { name: "Kanlı Hilal Kaması", power: 65, price: 300 },
  { name: "Draupnir Mızrağı", power: 75, price: 350 },
  { name: "Excalibur Kılıcı", power: 80, price: 400 },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "Hortlak",
    level: 15,
    health: 60,
  },
  {
    name: "Grifon",
    level: 20,
    health: 100,
  },
  {
    name: "Dağ golemi",
    level: 30,
    health: 130,
  },
  {
    name: "Ejderha",
    level: 45,
    health: 400,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Mağazaya git", "Mağaraya git", "Ejderha ile savaş"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Kasaba meydanındasınız. "Mağaza" yazan bir tabela görüyorsunuz.',
  },
  {
    name: "store",
    "button text": [
      "10 Can al (10 Altın)",
      "Silah Satın Al",
      "Şehir merkezine dön",
      "Zırh Satın Al",
    ],
    "button functions": [buyHealth, buyWeapon, goTown, buyArmor],
    text: "Ne almak istersiniz yüce kahraman",
  },
  {
    name: "cave",
    "button text": [
      "Slime ile savaş",
      "Hortlak ile savaş",
      "Şehir merkezine dön",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Mağaraya girdin. Bazı canavarlar gördün. Savaşmaya hazırlıklı ol.",
  },
  {
    name: "deep cave",
    "button text": [
      "Grifon ile savaş",
      "Dağ golemi ile savaş",
      "Mağaraya dön",
      "Şehir merkezine dön",
    ],
    "button functions": [fightGrifon, fightGolem, goCave, goTown],
    text: "Mağaranın devam ettiğini gördün ilerlemeye karar verdin. Bir ışık süzmesi gördün çıkış olabileceğini düşündün ve oraya doğru gittin. Burasıda ne böyle yıkılmış bir kilise mi?  Temkinli olmakta fayda var.",
  },
  {
    name: "fight",
    "button text": ["Saldır", "Kaçın", "Kaç"],
    "button functions": [attack, dodge, goTown],
    text: "Bir canavara denk geldin. Gel bakalım buraya pis mahluk.",
  },
  {
    name: "kill monster",
    "button text": [
      "Mağarada kal",
      "Mağara derinliklerinde kal",
      "Şehir meydanına git",
    ],
    "button functions": [goCave, goDeepCave, goTown],
    text: 'Canavar ölürken "Arg!" diye bağırır. Deneyim puanı kazandın ve altın buldun.',
  },
  {
    name: "lose",
    "button text": ["TEKRAR DENE?", "TEKRAR DENE?", "TEKRAR DENE?"],
    "button functions": [restart, restart, restart],
    text: "ÖLDÜN. &#x2620;",
  },
  {
    name: "win",
    "button text": ["TEKRAR DENE?", "TEKRAR DENE?", "Şehir Meydanına Dön?"],
    "button functions": [restart, restart, goTown],
    text: "Ejderhay'ı alt ettin! OYUNU KAZANDIN! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Şehir merkezine dön?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Gizli bir oyun buluyorsun. Yukarıdan bir sayı seçin. Rastgele 0 ile 10 arasında on sayı seçilecek. Seçtiğiniz sayı rastgele sayılardan biriyle eşleşirse, kazanırsınız!",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
storeList.style.display = "none";

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];

  if (location.name === "store") {
    button4.style.display = "block";
    button4.onclick = buyArmor;
  } else {
    button4.style.display = "none";
  }

  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
  storeList.style.display = "none";
  changeBackground(
    "https://i.pinimg.com/originals/70/9a/bf/709abf01d17e599c6319d4ffe5100d4c.gif"
  );
}

function goStore() {
  update(locations[1]);
  storeList.style.display = "none";
  changeBackground(
    "https://i.pinimg.com/originals/3a/05/fa/3a05faad64800e1cce421f4c013b1bc4.gif"
  );
}

function goCave() {
  update(locations[2]);
  changeBackground(
    "https://steemitimages.com/p/2bP4pJr4wVimqCWjYimXJe2cnCgnDPU1UNN4uup9EsF?format=match&mode=fit"
  );

  button4.style.display = "block";
  button4.innerText = "Mağara derinliklerine git";
  button4.onclick = goDeepCave;
}

function goDeepCave() {
  update(locations[3]);
  changeBackground(
    "https://i.pinimg.com/originals/36/09/a5/3609a58f09f1c9c87fea4cf875b564b7.gif"
  );
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightGrifon() {
  fighting = 2;
  goFight();
}

function fightGolem() {
  fighting = 3;
  goFight();
}

function fightDragon() {
  fighting = 4;
  changeBackground(
    "https://i.pinimg.com/originals/fd/1f/62/fd1f62855ab792716c795209950cec0e.gif"
  );
  goFight();
}

function goFight() {
  update(locations[4]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function dodge() {
  text.innerText = "Canavarın saldırısından kaçtın!";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[5]);
}

function lose() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  currentArmor = 0;
  inventory = ["Körelmiş Kanlı Balta"];
  goTown();
  healthText.innerText = health;
  goldText.innerText = gold;
  xpText.innerText = xp;
}

function winGame() {
  update(locations[7]);
}

function easterEgg() {
  update(locations[8]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerHTML = "Sayılar: ";
  for (let i = 0; i < 10; i++) {
    text.innerHTML += numbers[i] + " ";
  }

  if (numbers.indexOf(guess) !== -1) {
    text.innerHTML += "<p>Kazandın!</p>";
  } else {
    text.innerHTML += "<p>Kaybettin!</p>";
  }
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Yeterli Altınınız Yok.";
  }
}

function buyWeapon() {
  storeList.innerHTML = "";
  const weaponButton = document.createElement("button");
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "X";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.marginTop = "-25%";
  closeBtn.style.borderRadius = "20px";
  closeBtn.style.backgroundImage =
    "linear-gradient(rgb(254, 204, 76), rgb(255, 172, 51)) ";
  closeBtn.style.border = "none";
  closeBtn.style.position = "absolute";
  closeBtn.addEventListener("click", function () {
    storeList.style.display = "none";
  });
  weaponButton.innerText = "Satın al";
  weaponButton.style.cursor = "pointer";
  weaponButton.style.width = "100%";
  weaponButton.style.height = "40px";
  weaponButton.style.borderRadius = "20px";
  weaponButton.style.backgroundImage =
    "linear-gradient(rgb(254, 204, 76), rgb(255, 172, 51)) ";
  weaponButton.addEventListener("click", function () {
    const checkWeapon = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox, index) {
      if (checkbox.checked) {
        checkWeapon.push(weapons[index]);
      }
    });
    if (checkWeapon.length > 0) {
      checkWeapon.forEach(function (weapon) {
        if (gold >= weapon.price) {
          gold -= weapon.price;
          goldText.innerText = gold;
          currentWeapon = weapons.indexOf(weapon);
          inventory.push(weapon.name);
          text.innerText = "Yeni zırh aldın: " + weapon.name;
          storeList.style.display = "none";
        } else {
          text.innerText = "Yeterli Altınınız Yok.";
        }
      });
    } else {
      text.innerText = "Silah seçmediniz.";
    }
  });

  weapons.forEach(function (weapon, index) {
    const listItem = document.createElement("li");
    const checkWeapon = document.createElement("input");
    checkWeapon.style.width = "30%";
    checkWeapon.style.height = "20px";
    checkWeapon.type = "checkbox";
    checkWeapon.id = "weapons" + index;
    checkWeapon.style.cursor = "pointer";
    checkWeapon.style.marginRight = "5px"; // Checkboxların arasında biraz boşluk bırakmak için
    listItem.appendChild(checkWeapon); // Checkbox'u liste öğesine ekliyoruz
    listItem.style.listStyleType = "none";
    listItem.style.marginBottom = "15px";
    listItem.innerHTML += weapon.name + " - " + weapon.price + " Altın";
    if (inventory.includes(weapon.name)) {
      listItem.style.textDecoration = "line-through";
      listItem.style.pointerEvents = "none";
    }
    storeList.appendChild(listItem);
  });

  storeList.appendChild(weaponButton);
  storeList.appendChild(closeBtn);
  storeList.style.display = "block";
}
function selectWeapon(e) {
  const clickedItem = e.target;
  const weaponName = clickedItem.innerText.split(" - ")[0];
  const weapon = weapons.find((a) => a.name === weaponName);
  if (gold >= weapon.price) {
    gold -= weapon.price;
    goldText.innerText = gold;
    inventory.push(weapons.name);
    text.innerText = "Yeni silah aldın: " + weapons[currentWeapon].name;
    storeList.style.display = "none";
    clickedItem.style.textDecoration = "line-through";
  } else {
    text.innerText = "Yeterli Altınınız Yok.";
  }
}

function buyArmor() {
  storeList.innerHTML = "";
  const armorButton = document.createElement("button");
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "X";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.position = "absolute";
  closeBtn.style.marginTop = "-23%";
  closeBtn.style.borderRadius = "20px";
  closeBtn.style.backgroundImage =
    "linear-gradient(rgb(254, 204, 76), rgb(255, 172, 51)) ";
  closeBtn.style.border = "none";
  closeBtn.addEventListener("click", function () {
    storeList.style.display = "none";
  });
  armorButton.innerText = "Satın al";
  armorButton.style.cursor = "pointer";
  armorButton.style.width = "100%";
  armorButton.style.height = "40px";
  armorButton.style.borderRadius = "20px";
  armorButton.style.backgroundImage =
    "linear-gradient(rgb(254, 204, 76), rgb(255, 172, 51)) ";
  armorButton.addEventListener("click", function () {
    const checkedArmor = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox, index) {
      if (checkbox.checked) {
        checkedArmor.push(armor[index]);
      }
    });
    if (checkedArmor.length > 0) {
      checkedArmor.forEach(function (arm) {
        if (gold >= arm.price) {
          gold -= arm.price;
          goldText.innerText = gold;
          currentArmor = armor.indexOf(arm);
          inventory.push(arm.name);
          text.innerText = "Yeni zırh aldın: " + arm.name;
          storeList.style.display = "none";
        } else {
          text.innerText = "Yeterli Altınınız Yok.";
        }
      });
    } else {
      text.innerText = "Zırh seçmediniz.";
    }
  });

  armor.forEach(function (arm, index) {
    const listItem = document.createElement("li");
    const armorCheck = document.createElement("input");
    armorCheck.style.width = "30%";
    armorCheck.style.height = "20px";
    armorCheck.type = "checkbox";
    armorCheck.id = "armor" + index;
    armorCheck.style.cursor = "pointer";
    armorCheck.style.marginRight = "5px"; // Checkboxların arasında biraz boşluk bırakmak için
    listItem.appendChild(armorCheck); // Checkbox'u liste öğesine ekliyoruz
    listItem.style.listStyleType = "none";
    listItem.style.marginBottom = "15px";
    listItem.innerHTML += arm.name + " - " + arm.price + " Altın";
    if (inventory.includes(arm.name)) {
      listItem.style.textDecoration = "line-through";
      listItem.style.pointerEvents = "none";
    }
    storeList.appendChild(listItem);
  });

  storeList.appendChild(armorButton);
  storeList.appendChild(closeBtn);
  storeList.style.display = "block";
}

function selectArmor(e) {
  const clickedItem = e.target;
  const armorName = clickedItem.innerText.split(" - ")[0];
  const arm = armor.find((a) => a.name === armorName);

  if (gold >= arm.price) {
    gold -= arm.price;
    goldText.innerText = gold;
    currentArmor = armor.indexOf(arm);
    inventory.push(arm.name);
    text.innerText = "Yeni zırh aldın: " + arm.name;
    storeList.style.display = "none";
    clickedItem.style.textDecoration = "line-through";
  } else {
    text.innerText = "Yeterli Altınınız Yok.";
  }
}
function attack() {
  let monsterAttackValue = getMonsterAttackValue(monsters[fighting].level);
  let damageTaken = reduceDamage(monsterAttackValue, armor[currentArmor].name);
  health -= damageTaken;

  text.innerText =
    "Canavara saldırdın ve " +
    weapons[currentWeapon].power +
    " kadar hasar verdin.";
  text.innerText += "\nCanavar sana saldırdı!";
  text.innerText +=
    " Sana " + monsters[fighting].level * 2 + " kadar hasar verdi.\n";

  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Iskaladın.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 4) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function reduceDamage(monsterAttackValue, armorName) {
  let damageReduction = 0;
  switch (armorName) {
    case "Goblin Döküm Zırhı":
      damageReduction = 5;
      break;
    case "Gölge Dansçısı Zırhı":
      damageReduction = 20;
      break;
    case "Buzul Muhafız Zırhı":
      damageReduction = 25;
      break;
    case "Karanlık Orman Zırhı":
      damageReduction = 30;
      break;
    case "Demir Melek Zırhı":
      damageReduction = 35;
      break;
    case "Ejder Pullu Savaş Zırhı":
      damageReduction = 40;
      break;
    case "Semavi Altın Zırh":
      damageReduction = 45;
      break;
    case "Fırtına Kabuğu Zırhı":
      damageReduction = 70;
      break;
    default:
      damageReduction = 0;
  }
  let reducedDamage = monsterAttackValue - damageReduction;
  return reducedDamage > 0 ? reducedDamage : 0;
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function changeBackground(url) {
  document.body.style.backgroundImage = "url('" + url + "')";
}
