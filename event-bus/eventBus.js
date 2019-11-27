//L����������� ������
const {
    performance,
} = require("perf_hooks");

let eventBus = {
    events: {}, //eName:eType
    listeners: {}, //eType:������ �������

    //������� �� �������.�������� ��� ������� �� ���� eventType
    event: function(eventName,arg){
        /*this.listeners[eventType].forEach((item) => { 
            item(arg)
        });*/
        let eTypeByEventName = this.events[eventName];
        for (let elem in this.listeners[eTypeByEventName]) {
            this.listeners[eTypeByEventName][elem](arg);//�������� ��� ������� �� ���� eventType
        }
    },

    //����������� ���������
    accept: function(listener,eventType) {//listner ��� ������� ���
        if (this.listeners[eventType] === undefined) {
            this.listeners[eventType] = [];//������ ������
        }
        this.listeners[eventType].push(listener);//��������� � ����� ������� �������
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

    //�������� ������� LOG � INC
    eventBus.event("INC")
    eventBus.event("LOG", "Caaaaaaats!))")
}

function moduleE() {
    let x;
    for (let i = 0; i <30000; i++) {
        //setTimeout ��������� ������� ������� ���� ��� ����� ����������� �������� �������.
        //setTimeout(sayHi, 1000, "������", "����"); ��� �������, �������� ����� �������� � ������������� (1000 �� = 1 �), ��������� ��� ������� sayHi
        //setTimeout ������� ������ �� �������. �������� ������� �� ����
        setTimeout(function () {
            x = { name: "Cat " + i }
            console.log(x);
            eventBus.event("ADD", x);
        }, 100);
    }
}


moduleD();
console.log("Storage start: ", eventBus.storage);

let time1 = performance.now();
moduleE(eventBus);
let time2 = performance.now();
console.log("Time :", time2 - time1);


setTimeout(() => { console.log("Storage result: ", eventBus.storage); console.log("Time :", time2 - time1) } , 3000);


/*function loger() {
    console.log("I am in log()");
    cats = eventBus.storage["cats"];
    for (i = 0; i < cats.length; i++) {
        let cat = cats[i];
        (function (cat) {
            setTimeout(function () {
                console.log(cat.name);
            }, 100);
        }(cat));
    }
}*/