
import { typeAdjectives, Item } from "./js/items.js";


class Player {
    constructor(name) {
      this.name = name;
      this.level = 1;
      this.power = 1;
      this.treasures = 0; // Количество предметов (items)
      this.hand = []; // Инвентарь игрока (содержимое)
      this.money = 0; // Деньги игрока
    }
  
    // Метод для атаки монстра
     attack(monster) {
      const totalPower = this.level + this.power + this.calculateItemsPower();
      if (totalPower >= monster.power) {
        updateBattleLog(`${this.name} defeats the ${monster.name}!`);
        this.treasures += monster.reward.length; // Увеличение количества предметов при победе
        this.level++; // Увеличение уровня при победе
  
        // Перенос предметов из монстра в инвентарь игрока
        for (const item of monster.reward) {
          this.collectItem(item);
        }
      } else {
        updateBattleLog(`${this.name} couldn't defeat the ${monster.name}.`);

        // Выполняем бросок кубика
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        updateBattleLog(`${activePlayer.name} rolls a 6-sided dice and gets ${diceRoll}.`);
        if (diceRoll >= 4) {
           updateBattleLog(`${activePlayer.name} successfully escapes and doesn't lose items.`);
            
        } else if (activePlayer.hand.length >= 1) {
          const lostItems = monster.reward.length;
          updateBattleLog(`${activePlayer.name} failed to escape and loses ${lostItems} items.`);
          this.hand.splice(0, lostItems);
        }
      setActivePlayerStyle(activePlayer);
        
      }
     

        
      
    }
    // Метод подсчета силы предметов
    calculateItemsPower() {
      return this.hand.reduce((total, item) => total + item.power, 0);
    }
    // Метод для сбора предмета
    collectItem(item) {
      if (this.hand.length === 0) {
        // Инвентарь пуст, добавляем первый предмет
        this.hand.push(item);
        updateBattleLog(`${this.name} get and dressed a first item: ${item.name} (Power: ${item.power}, Cost: ${item.cost})`);
      } else {
        const existingItem = this.hand.find((i) => i.type === item.type);
        if (existingItem) {
          // У игрока уже есть предмет такого типа и
          // новый предмет сильнее, заменяем старый
          if (item.power > existingItem.power) {
            const existingItemCost = existingItem.cost;
            this.money +=existingItemCost;
            const index = this.hand.indexOf(existingItem);
            this.hand[index] = item;
            updateBattleLog(`${activePlayer.name} get ${item.name}(Power: ${item.power}, Cost: ${item.cost})`)
            updateBattleLog(`${activePlayer.name} sell old item ${existingItem.name}(Power: ${existingItem.power}) and got total money is ${this.money}. Then dressed new ${item.name} becouse his mighty`);
          } else {
            this.money += item.cost;
            updateBattleLog(`${activePlayer.name} get ${item.name}(Power: ${item.power}, Cost: ${item.cost})`)
            updateBattleLog(`${activePlayer.name} sell new item ${item.name}(Power: ${item.power}) and got total money is ${this.money}. He still dressed ${existingItem.name} becouse his mighty`);
            
          }
        } else {
          // У игрока нет предмета такого типа, добавляем его
          this.hand.push(item);
          updateBattleLog(`${this.name} get and dressed a new item: ${item.name} (Power: ${item.power}, Cost: ${item.cost})`);
          }
      }
    }
  }
  
  class Monster {
    constructor(name, power, items) {
      this.name = name;
      this.power = power;
      this.reward = items; // Монстр держит предметы в виде массива
    }
  }
function generateRandomMonster() {
  const monsterNames = ["Goblin", "Orc", "Dragon", "Noobe Troll"]; // Список имён монстров
  const randomName = monsterNames[Math.floor(Math.random() * monsterNames.length)];
  const numItems = Math.floor(Math.random()*3); // Количество случайных предметов у монстра
  const items = [];
  for (let i = 0; i < numItems; i++) {
    const randomItemType = typeAdjectives[Math.floor(Math.random() * 6)];
    const item = new Item(`${randomItemType}`, randomItemType);
    items.push(item);
  }
  return new Monster(randomName, Math.floor(Math.random() * 20) + 1, items);
}

function switchActivePlayer() {
  activePlayer = activePlayer === player1 ? player2 : player1;
}

// Функция для выполнения хода
function performTurn() {
  // setActivePlayerStyle(activePlayer);
     counter += 1;
    updateBattleLog(`Turn # ${counter}, in game ${activePlayer.name}`);
   if (Math.random() < 0.7) {

    // Шанс 70% на сражение с монстром
    const monster = generateRandomMonster();
    updateBattleLog(`A wild ${monster.name} appears! Power: ${monster.power}`);
    activePlayer.attack(monster);
     
  } else {

    // 30% шанс на обнаружение сокровищ и получение случайного предмета
    updateBattleLog("No monsters found, but you discovered treasures!");

    // Генерация случайного предмета и его добавление в инвентарь игрока
    const randomItemType = typeAdjectives[Math.floor(Math.random() * 6)];
    const item = new Item(`${randomItemType}`, randomItemType);
    activePlayer.collectItem(item);

    //  updateBattleLog(`${activePlayer.name} gets a new item: ${item.name} (Type: ${item.type}, Power: ${item.power}, Cost: ${item.cost})`);

     
  }


  // Вывод статистики игроков
  console.log(`${player1.name} stats: Level ${player1.level}, Treasures ${player1.treasures} ,Inventory: [${player1.hand.map(item => item.name).join(", ")}] , Power: ${player1.level + player1.power + player1.calculateItemsPower()}, Money ${player1.money}`);
  console.log(`${player2.name} stats: Level ${player2.level}, Treasures ${player2.treasures},Inventory: [${player2.hand.map(item => item.name).join(", ")}] , Power: ${player2.level + player2.power + player2.calculateItemsPower()}, Money ${player2.money}`);
  

  if (activePlayer.level >= 20) {
    // Если хотя бы один из игроков достиг уровня 20, завершаем игру
    updateBattleLog(`Congratulations! ${activePlayer.name} wins the game with level ${activePlayer.level}`);
    startBattleButton.textContent = `Start battle`;
    return;
  }

  switchActivePlayer(); // Переключение активного игрока
}

// Получаем ссылки на элементы HTML
const player1Card = document.getElementById("player1__card");
const player2Card = document.getElementById("player2__card");
const startBattleButton = document.getElementById("start__battle");
const battleLog = document.getElementById("battle__log");

// Добавляем переменную для отслеживания попытки побега


// Установка красного цвета для активного игрока
function setActivePlayerStyle(player) {
  player1Card.style.color = player === player1 ? "red" : "black";
  player2Card.style.color = player === player2 ? "red" : "black";
}

// Функция для обновления лога боя
function updateBattleLog(message) {
  const logMessage = document.createElement("p");
  logMessage.textContent = message;
  battleLog.appendChild(logMessage);
  
}

let isGameStarted = false; // Переменная для отслеживания начала игры

// Объявляем переменные player1 и player2 на глобальном уровне
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
let activePlayer = player1; // Начинаем с первого игрока
setActivePlayerStyle(activePlayer);

// Обработчик нажатия на кнопку "Start Battle"
let counter = 0;
startBattleButton.addEventListener("click", () => {
  //   if (!isGameStarted) {
  //   isGameStarted = true;
  //   startBattleButton.textContent = `Next turn`;
  //   performTurn();
  // } else {
    performTurn();
  // }
});



