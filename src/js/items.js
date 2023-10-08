const typeAdjectives =["Шлем", "Клинок", "Доспех", "Сапог", "Щит", "Амулет"];
const adjectives = [
    "Могучий",
    "Волшебный",
    "Загадочный",
    "Сияющий",
    "Легендарный",
    "Темный",
    "Яркий",
    "Зловещий",
    "Благородный",
    "Переливающийся",
    "Вечный",
    "Безупречный",
    "Древний",
    "Сверкающий",
    "Мистический",
    "Прекрасный",
    "Величественный",
    "Заколдованный",
    "Красочный",
    "Доблестный",
    "Подвижный",
    "Ослепительный",
    "Стремительный",
    "Неуязвимый",
    "Огненный",
    "Ледяной",
    "Дикарский",
    "Изумрудный",
    "Золотой",
    "Завораживающий",
    "Сакральный",
    "Властный",
    "Отважный",
    "Бесконечный",
    "Боевой",
    "Скользкий",
    "Сверхъестественный",
    "Огромный",
    "Светлый",
    "Таинственный"
  ];
  const uniqueItemNames = {};
class Item {
  constructor(type) {
    this.type = type;
    this.name = this.generateUniqueItemName();
    this.power = Math.floor(Math.random() * 10) + 1; // Случайная сила от 1 до 10
    this.cost = Math.floor(Math.random() * 20) + 1; // Случайная стоимость от 1 до 20
  }

  // Метод для генерации уникального имени предмета на основе типа и прилагательных
  generateUniqueItemName() {
    if (!uniqueItemNames[this.type]) {
      uniqueItemNames[this.type] = [];
    }

    const usedAdjectives = uniqueItemNames[this.type];
    let adjective;

    // Поиск неиспользованных прилагательных для данного типа предмета
    do {
      adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    } while (usedAdjectives.includes(adjective));

    usedAdjectives.push(adjective);

    return `${adjective} ${this.type}`;
  }
}

export { typeAdjectives, Item };