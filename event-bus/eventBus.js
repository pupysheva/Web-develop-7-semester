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
    eventBus.events["ModuleE"] = "eventType5";


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
        setTimeout(eventBus.event, 1000, "LOG", "CountCats: " + eventBus.storage.catCounter);
        setTimeout(eventBus.event, 1000, "LoggerCatsCounter");
    }, "eventType4");

    //Вызывают события LOG и INC
    eventBus.event("INC");
    eventBus.event("LOG", "Caaaaaaats!))");
}

eventBus.accept(moduleE, "eventType5")
function moduleE() {
    let x
    for (let i = 1000; i >= 0 && eventBus.storage.catCounter < 100000; i--) {
        x = { name: "Cat " + i }
        //console.log(x);
        eventBus.event("ADD", x);
        eventBus.event("INC")
    }
    if (eventBus.storage.catCounter < 100000)
        setTimeout(eventBus.event, 1000, "ModuleE");
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


//setTimeout(() => { console.log("Storage result: ", eventBus.storage); console.log("Time :", time2 - time1) } , 3000);

setTimeout(() => console.log("exit"), 100000);