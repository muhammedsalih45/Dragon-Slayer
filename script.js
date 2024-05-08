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
  { name: "Goblin Döküm Zırhı", power: 5 },
  { name: "Gölge Dansçısı Zırhı", power: 10, price: 85 },
  { name: "Buzul Muhafız Zırhı", power: 15, price: 90 },
  { name: "Karanlık Orman Zırhı", power: 20, price: 95 },
  { name: "Demir Melek Zırhı", power: 25, price: 100 },
  { name: "Ejder Pullu savaş zırhı", power: 30, price: 105 },
  { name: "Semavi Altın Zırh", power: 35, price: 110 },
  { name: "Fırtına Kabuğu Zırhı", power: 50, price: 115 },
];
const weapons = [
  { name: "Körelmiş Kanlı Balta", power: 5 },
  { name: "Fırtına Yayı", power: 15, price: 50 },
  { name: "Güneş Mızrağı", power: 25, price: 55 },
  { name: "Kaos Bıçakları", power: 35, price: 60 },
  { name: "Ejderha Katili", power: 45, price: 65 },
  { name: "Şafak Kırıcı", power: 55, price: 70 },
  { name: "Kanlı Hilal Kaması", power: 65, price: 75 },
  { name: "Draupnir Mızrağı", power: 75, price: 80 },
  { name: "Excalibur Kılıcı", power: 80, price: 85 },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "Hortlak",
    level: 10,
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
    level: 50,
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
      "Silah al (50 Altın)",
      "Şehir merkezine dön",
      "Zırh al (85 Altın)",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
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
  storeList.style.display = "block";
  storeList.innerHTML = "";

  for (let i = 1; i < weapons.length; i++) {
    const weapon = weapons[i];
    const weaponCheck = document.createElement("input");
    weaponCheck.type = "checkbox";
    weaponCheck.id = "weapon" + i;
    weaponCheck.style.cursor = "pointer";
    weaponCheck.style.width = "20%";
    weaponCheck.style.height = "20px";
    weaponCheck.style.marginTop = "-6%";
    weaponCheck.style.marginBottom = "20px";
    const weaponButton = document.createElement("div");
    weaponButton.style.textAlign = "center";
    weaponButton.style.marginBottom = "5px";
    weaponButton.innerText =
      weapon.name + " (" + weapon.power + " Güç, " + weapon.price + " Altın)";
    weaponButton.onclick = buyWeapon.bind(null, i);
    const closeButton = document.createElement("div");
    closeButton.style.position = "absolute";
    closeButton.style.display = "block";
    closeButton.style.top = "22%";
    closeButton.style.right = "8%";
    closeButton.style.padding = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.innerText = "X";
    closeButton.onclick = function () {
      storeList.style.display =
        storeList.style.display === "none" ? "block" : "none";
    };
    storeList.appendChild(closeButton);
    storeList.appendChild(weaponButton);
    storeList.appendChild(weaponCheck);
  }
  const weaponButton2 = document.createElement("button");
  weaponButton2.innerText = "Eşyayı al";
  weaponButton2.style.display = "block";
  weaponButton2.style.width = "100%";
  weaponButton2.style.borderRadius = "30px";
  weaponButton2.style.border = "none";
  weaponButton2.style.cursor = "pointer";
  weaponButton2.style.backgroundImage =
    "linear-gradient(rgb(254, 204, 76), rgb(255, 172, 51))";
  weaponButton2.style.padding = "10px";
  storeList.appendChild(weaponButton2);

  weaponButton2.addEventListener("click", buySelectedItems);

  function buySelectedItems(event) {
    const selectedItems = Array.from(
      event.target.parentNode.querySelectorAll("input[type=checkbox]:checked")
    ).map((checkbox) => checkbox.nextElementSibling.innerText);

    if (gold >= selectedItems.length * 50) {
      gold -= selectedItems.length * 50;
      goldText.innerText = gold;

      selectedItems.forEach((item) => {
        inventory.push(selectedItems[item]);
        currentWeapon++;
      });

      text.innerText = "Satın aldın: " + weapons[currentWeapon].name + ", ";

      selectedItems.forEach((item) => {
        const checkbox = event.target.parentNode.querySelector(
          `input[id="${item.replace(" ", "")}"]`
        );

        event.target.parentNode.removeChild(checkbox.parentNode);
      });
    } else {
      text.innerText = "Yeterli altınınız yok. Daha fazla altın kazanıp gelin.";
    }
  }

  // Apply the updated function to both the weapon and armor event listeners
  // weaponButton2.addEventListener("click", buySelectedItems);
  // armorButton2.addEventListener("click", buySelectedItems);
}

function buyArmor() {
  storeList.style.display = "block";
  storeList.innerHTML = "";

  for (let i = 1; i < armor.length; i++) {
    const armorItem = armor[i];
    const armorcheck = document.createElement("input");
    armorcheck.type = "checkbox";
    armorcheck.id = "armor" + i;
    armorcheck.style.cursor = "pointer";
    armorcheck.style.width = "20%";
    armorcheck.style.height = "20px";
    armorcheck.style.marginTop = "-7%";
    armorcheck.style.marginBottom = "20px";
    const armorButton = document.createElement("div");
    armorButton.style.textAlign = "center";
    armorButton.style.marginBottom = "10px";
    armorButton.innerText =
      armorItem.name +
      " (" +
      armorItem.power +
      " Güç, " +
      armorItem.price +
      " Altın)";
    armorButton.onclick = buyArmor.bind(null, i);
    const closeButton = document.createElement("div");
    closeButton.style.position = "absolute";
    closeButton.style.display = "block";
    closeButton.style.top = "27%";
    closeButton.style.right = "8%";
    closeButton.style.padding = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.innerText = "X";
    closeButton.onclick = function () {
      storeList.style.display =
        storeList.style.display === "none" ? "block" : "none";
    };
    storeList.appendChild(closeButton);
    storeList.appendChild(armorButton);
    storeList.appendChild(armorcheck);
  }
  const armorButton2 = document.createElement("button");
  armorButton2.innerText = "Eşyayı al";
  armorButton2.style.display = "block";
  armorButton2.style.width = "100%";
  armorButton2.style.borderRadius = "30px";
  armorButton2.style.border = "none";
  armorButton2.style.backgroundImage =
    "linear-gradient(rgb(254, 204, 76), rgb(255, 172, 51))";
  armorButton2.style.padding = "10px";
  storeList.appendChild(armorButton2);

  armorButton2.addEventListener("click", buySelectedItems);

  function buySelectedItems() {
    const selectedItems = Array.from(
      storeList.querySelectorAll("input[type=checkbox]:checked")
    ).map((checkbox) => checkbox.nextElementSibling.innerText);

    const itemsToBuy = selectedItems.filter(
      (item) => !inventory.includes(item)
    );

    if (gold >= itemsToBuy.length * 85) {
      gold -= itemsToBuy.length * 85;
      goldText.innerText = gold;

      itemsToBuy.forEach((item) => {
        inventory.push(item);
        // Güncelleme: currentArmor veya currentWeapon güncellemesi burada yapılmalı
        // Örneğin, armor veya weapon listesinden uygun index bulunarak güncellenebilir
      });

      text.innerText = "Satın aldın: " + itemsToBuy.join(", ") + ".";

      itemsToBuy.forEach((item) => {
        const checkbox = storeList.querySelector(
          `input[checkbox-id="${item}"]`
        );
        if (checkbox) {
          checkbox.checked = false;
          storeList.removeChild(checkbox.parentNode);
        }
      });
    } else {
      text.innerText = "Yeterli altınınız yok. Daha fazla kazanıp gelin.";
    }
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
      damageReduction = 5;
      break;
    case "Gölge Dansçısı Zırhı":
      damageReduction = 10;
      break;
    case "Buzul Muhafız Zırhı":
      damageReduction = 15;
      break;
    case "Karanlık Orman Zırhı":
      damageReduction = 20;
      break;
    case "Demir Melek Zırhı":
      damageReduction = 25;
      break;
    case "Ejder Pullu Savaş Zırhı":
      damageReduction = 30;
      break;
    case "Semavi Altın Zırh":
      damageReduction = 35;
      break;
    case "Fırtına Kabuğu Zırhı":
      damageReduction = 50;
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
