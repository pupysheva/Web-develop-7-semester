/*MyFunction();*/
let eventBus = {
    events: {}, //eName:eType
    listeners: {}, //eType:массив функций

    //Реакция на событие.Вызываем все функции по типу eventType
    event: function(eventName,arg){
        /*this.listeners[eventType].forEach((item) => { 
            item(arg)
        });*/
        let eTypeByEventName = this.events[eventName];
        for (let elem in this.listeners[eTypeByEventName]) {
            this.listeners[eTypeByEventName][elem](arg);//Вызываем все функции по типу eventType
        }
    },

    //регистрация слушателя
    accept: function(listener,eventType) {//listner это функция тут
        if (this.listeners[eventType] === undefined) {
            this.listeners[eventType] = [];//Пустой массив
        }
        this.listeners[eventType].push(listener);//Добавляем в конец массива функцию
    },


    storage: {
        catCounter: 0,
    },
}


eventBus.events["LOG"] = "eventType1";
eventBus.events["INC"] = "eventType2";



eventBus.accept((arg) => { console.log(arg) }, "eventType1")
eventBus.accept(() => {
    console.log(eventBus.storage.catCounter)
}, "eventType1")
eventBus.accept(() => { return eventBus.storage["catCounter"] += 1 }, "eventType2")


//Вызывают события LOG и INC
eventBus.event("INC")
eventBus.event("LOG", "Caaaaaaats!))")



setTimeout(() => console.log('exit...'), 100000000);