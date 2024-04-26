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
const armor = [
  { name: "Goblin Döküm Zırhı" },
  { name: "Gölge Dansçısı Zırhı" },
  { name: "Buzul Muhafız Zırhı" },
  { name: "Karanlık Orman Zırhı" },
  { name: "Demir Melek Zırhı" },
];
const weapons = [
  { name: "Körelmiş Kanlı Balta", power: 5 },
  { name: "Fırtına Yayı", power: 30 },
  { name: "Ayın Mızrağı", power: 50 },
  { name: "Kaos Bıçakları", power: 70 },
  { name: "Ejderha Katili", power: 100 },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "Hortlak",
    level: 8,
    health: 60,
  },
  {
    name: "Grifon",
    level: 10,
    health: 100,
  },
  {
    name: "Dağ golemi",
    level: 13,
    health: 130,
  },
  {
    name: "Ejderha",
    level: 20,
    health: 300,
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
      "Silah al (50 Altın)",
      "Şehir merkezine dön",
      "Zırh al (85 Altın)",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Tüccar: Ne almak istersiniz?",
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
    text: "Mağaranın daha derinlerini indin ve daha güçlü canavarlar gördün. Temkinli olmakta fayda var.",
  },
  {
    name: "fight",
    "button text": ["Saldır", "Kaçın", "Kaç"],
    "button functions": [attack, dodge, goTown],
    text: "Bir canavarla savaşıyosun.",
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
  changeBackground(
    "https://i.pinimg.com/originals/70/9a/bf/709abf01d17e599c6319d4ffe5100d4c.gif"
  );
}

function goStore() {
  update(locations[1]);
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

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText =
      "Sağlık almak için yeterli altınınız yok. Daha çok altın kazanıp gelin.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 50) {
      // gold -= 50;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Yeni silah " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Envanterinizde şunlar var: " + inventory;
    } else {
      text.innerText = "Silah almak için yeterli altınınız yok.";
    }
  } else {
    text.innerText = "Zaten en güçlü silaha sahipsiniz!";
    button2.innerText = "15 Altın için eski silahlarınızı satabilirsiniz";
    button2.onclick = sellWeapon;
  }
}

function buyArmor() {
  if (currentArmor < armor.length - 1) {
    if (gold >= 85) {
      // gold -= 85;
      currentArmor++;
      goldText.innerText = gold;
      let newArmor = armor[currentArmor].name;
      text.innerText = "Yeni zırh " + newArmor + ".";
      inventory.push(newArmor);
    } else {
      text.innerText = "Zırh almak için yeterli altınınız yok.";
    }
  } else {
    text.innerText = "Zaten en güçlü zırha sahipsiniz.";
    button4.innerText = "20 Altın için eski zırhlarınızı satabilirsiniz.";
    button4.onclick = sellArmor;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Sen bir " + currentWeapon + " sattın.";
    text.innerText += " Envanterinizde şunlar var: " + inventory;
  } else {
    text.innerText = "En güçlü silahınızı satamazsınız!";
  }
}

function sellArmor() {
  if (inventory.length > 1) {
    gold += 20;
    goldText.innerText = gold;
    let currentArmor = inventory.shift();
    text.innerText = "Sen bir " + currentArmor + " sattın.";
    text.innerText += " Envanterinizde şunlar var: " + inventory;
  } else {
    text.innerText = "En güçlü zırhınızı satamazsınız!";
  }
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
  update(locations[3]);
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

function attack() {
  let monsterAttackValue = getMonsterAttackValue(monsters[fighting].level);
  let damageTaken = reduceDamage(monsterAttackValue, armor[currentArmor].name);
  health -= damageTaken;

  text.innerText = "Sana " + monsters[fighting].name + " saldırıyor.";
  text.innerText +=
    " ona " + weapons[currentWeapon].name + " ile saldırıyorsun.";
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
      damageReduction = 10;
      break;
    case "Gölge Dansçısı Zırhı":
      damageReduction = 15;
      break;
    case "Buzul Muhafız Zırhı":
      damageReduction = 25;
      break;
    case "Karanlık Orman Zırhı":
      damageReduction = 35;
      break;
    case "Demir Melek Zırhı":
      damageReduction = 45;
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

function dodge() {
  text.innerText = monsters[fighting].name + " Gelen saldırıyı atlattınız";
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

function winGame() {
  update(locations[7]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Körelmiş Kanlı Balta"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "sen seçtin " + guess + ". İşte rastgele sayılar:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Doğru! 20 Altın kazandın!";
    gold += 5;
    goldText.innerText = gold;
  } else {
    text.innerText += "Yanlış! 10 Can kaybettin!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function changeBackground(url) {
  document.body.style.backgroundImage = `url("${url}")`;
  document.body.style.backgroundColor = "yourColorValue"; // Arka plan rengini istediğiniz renk koduyla değiştirin
}
