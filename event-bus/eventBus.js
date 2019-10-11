// Динамический импорт
const {
    performance,
} = require("perf_hooks");

let eventBus = {
    listeners: {}, // eName:массив функций

    // Реакция на событие. Вызываем все функции по типу eventType
    event: function (eventName, arg) {
        for (let elem in eventBus.listeners[eventName]) {
            eventBus.listeners[eventName][elem](arg); // Вызываем все функции по типу eventType
        }
    },

    //регистрация слушателя
    accept: function (listener, eventName) {
        if (eventBus.listeners[eventName] === undefined) {
            eventBus.listeners[eventName] = []; // Пустой массив
        }
        eventBus.listeners[eventName].push(listener); // Добавляем в конец массива функцию
    },

    storage: {
        catCounter: 0,
        cats: [{ name: "Cat  -1))" }],
        catCountNeed: 3000000,
    },
}


function moduleD() {

    eventBus.accept(console.log, "LOG")


    eventBus.accept(() => { return eventBus.storage["catCounter"] += 1 }, "INC")

    eventBus.accept((cat) => {
        if (eventBus.storage["cats"] === undefined)
            eventBus.storage["cats"] = [];
        eventBus.storage["cats"].push(cat);
        return eventBus.storage["cats"].length;
    }, "ADD")

    eventBus.accept(() => {
        setTimeout(eventBus.event, 1000, "LOG", "CountCats: " + eventBus.storage.catCounter);
        if (eventBus.storage.catCounter < eventBus.storage.catCountNeed)
            setTimeout(eventBus.event, 1000, "LoggerCatsCounter");
    }, "LoggerCatsCounter");

    // Вызывают события LOG и INC
    eventBus.event("INC");
    eventBus.event("LOG", "Caaaaaaats!)) " + eventBus.storage.catCounter);
}

eventBus.accept(moduleE, "ModuleE")
function moduleE() {
    let x
    for (let i = 10000; i >= 0 && eventBus.storage.catCounter < eventBus.storage.catCountNeed; i--) {
        x = { name: "Cat " + i }
        eventBus.event("ADD", x);
        eventBus.event("INC")
    }
    if (eventBus.storage.catCounter < eventBus.storage.catCountNeed)
        setTimeout(eventBus.event, 5, "ModuleE");
}



moduleD();
console.log(eventBus);
setTimeout(eventBus.event, 1000, "LoggerCatsCounter");


let time1 = performance.now();
moduleE();
let time2 = performance.now();
console.log("Time :", time2 - time1);

setTimeout(() => console.log("exit"), 100000);