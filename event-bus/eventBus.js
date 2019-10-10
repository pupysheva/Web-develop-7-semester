//Lинамический импорт
const {
    performance,
} = require("perf_hooks");

let eventBus = {
    events: {}, //eName:eType
    listeners: {}, //eType:массив функций

    //Реакция на событие. Вызываем все функции по типу eventType
    event: function(eventName,arg){
        /*this.listeners[eventType].forEach((item) => { 
            item(arg)
        });*/
        let eTypeByEventName = eventBus.events[eventName];
        for (let elem in eventBus.listeners[eTypeByEventName]) {
            eventBus.listeners[eTypeByEventName][elem](arg); // Вызываем все функции по типу eventType
        }
    },

    //регистрация слушателя
    accept: function(listener,eventType) {//listner это функция тут
        if (eventBus.listeners[eventType] === undefined) {
            eventBus.listeners[eventType] = [];//Пустой массив
        }
        eventBus.listeners[eventType].push(listener);//Добавляем в конец массива функцию
    },

    storage: {
        catCounter: 0,
        cats: [{ name: "Cat  -1))" }],
    },
}


function moduleD() {
    eventBus.events["LOG"] = "eventType1";
    eventBus.events["INC"] = "eventType2";
    eventBus.events["ADD"] = "eventType3";
    eventBus.events["LoggerCatsCounter"] = "eventType4";


    eventBus.accept((arg) => { console.log(arg) }, "eventType1")

    eventBus.accept(() => {
        console.log(eventBus.storage.catCounter)
    }, "eventType1")


    eventBus.accept(() => { return eventBus.storage["catCounter"] += 1 }, "eventType2")

    eventBus.accept((cat) => {
        if (eventBus.storage["cats"] === undefined)
            eventBus.storage["cats"] = [];
        eventBus.storage["cats"].push(cat);
        return eventBus.storage["cats"].length;
    }, "eventType3")

    eventBus.accept(() => {
        console.log("CountCats: " + eventBus.storage.catCounter) // Выводит в косноль количество кошек
        setTimeout(eventBus.event, 1000, "LOG", "cat counter");
    }, "eventType4");

    //Вызывают события LOG и INC
    eventBus.event("INC");
    eventBus.event("LOG", "Caaaaaaats!))");
}

function moduleE() {
    let x;
    for (let i = 0; i < 100000; i++) {
        //setTimeout позволяет вызвать функцию один раз через определённый интервал времени.
        //setTimeout(sayHi, 1000, "Привет", "Джон"); имя функции, задержка перед запуском в миллисекундах (1000 мс = 1 с), аргументы для функции sayHi
        //setTimeout ожидает ссылку на функцию. Вызывать функцию не надо
        setTimeout(function () {
            x = { name: "Cat " + i }
            console.log(x);
            let jjj = "";
            for (let j = 0; j < 10000; j++)
                jjj += " ";
            eventBus.event("ADD", x);
            eventBus.event("INC")
        }, 100);
    }
}



moduleD();
console.log("Storage start: ", eventBus.storage);
console.log("Events: ", eventBus.events);
console.log(eventBus);
setTimeout(eventBus.event, 1000, "LoggerCatsCounter");


let time1 = performance.now();
moduleE();
let time2 = performance.now();
console.log("Time :", time2 - time1);


setTimeout(() => { console.log("Storage result: ", eventBus.storage); console.log("Time :", time2 - time1) } , 3000);

setTimeout(() => console.log("exit"), 100000);