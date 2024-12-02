function generateRandomArray(N, min = 0, max = 100) {
    const array = [];
    for (let i = 0; i < N; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        array.push(randomNum);
    }
    return array;
}

function generateArray(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
}

class HashTable {
    constructor(size) {
        this.table = new Array(size); // Инициализация пустого массива
        this.size = size;
    }

    // Элемент -> Хэш элемента
    hash(key) {
        return key % this.size;
    }

    // Пушаем элемент в хэш таблицу (сам процесс создания хэш таблицы)
    insert(key) {
        const index = this.hash(key); // Применяем хеш-функцию к ключу
        if (!this.table[index]) {
            this.table[index] = []; // Если ячейка пустая, создаем подмассив
        }
        // Добавляем элемент в соответствующий индекс
        this.table[index].push(key);
    }

    // Метод поиска элемента в хеш-таблице
    search(key) {
        const index = this.hash(key); // Хэшируем элемент для поиска
        if (this.table[index]) {
            // Проходим все элементы с хешом key и цепочкой ищем там наличие key
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i] === key) {
                    return true;
                }
            }
            return false;

        }
        return false;
    }

    printTable() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                // Если ячейка существует
                console.log(`ХЭШ индекс ${i}: [${this.table[i].join(', ')}]`);
            } else {
                // Если ячейка пустая (не инициализированная)
                console.log(`ХЭШ индекс ${i}: []`);
            }
        }
    }

}


// ------------ Тест для зараннее заданной даты
const test1 = [3, 69,  9, 32, 76, 21, 66, 63,
    93, 62, 24, 86, 14, 22, 67,  1,
    66, 82, 20, 93, 41, 38, 99, 72,
    6
]

// Создаем хеш-таблицу размером 100
console.time("Test 1")

const hashTable1 = new HashTable(25);

// Вставляем все числа из массива в хеш-таблицу
test1.forEach(num => hashTable1.insert(num));

console.log(`\n\nТест 1\nВыборка: ${test1}\nПоиск числа 20: ${hashTable1.search(20)}\nПоиск числа 37: ${hashTable1.search(37)}`);
console.timeEnd("Test 1")

// -------------- Тест для последовательных чисел
const test2 = generateArray(100000);
console.time("Test 2")
const hashTable2 = new HashTable(1024);
test2.forEach(num => hashTable2.insert(num));
console.log(`\n\nТест 2\nВыборка: 1...1000\nПоиск числа 100001: ${hashTable2.search(100001)}\nПоиск числа 2020: ${hashTable2.search(2020)}`);
console.timeEnd("Test 2")

// --------------- Тест для произвольного массива
const test3 = generateRandomArray(10);
console.time("Test 1")
const hashTable3 = new HashTable(10);
test3.forEach(num => hashTable3.insert(num));
searchNums = generateRandomArray(2);
console.log(`\n\nТест 3\nВыборка: ${test3}\nПоиск числа ${searchNums[0]}: ${hashTable3.search(searchNums[0])}\nПоиск числа ${searchNums[1]}: ${hashTable3.search(searchNums[1])}`);
console.timeEnd("Test 1")

console.log(`\n\nХэш таблица для теста 1:`);
hashTable1.printTable()
console.log(`\n\nХэш таблица для теста 3:`);
hashTable3.printTable()
