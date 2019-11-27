/*MyFunction();*/
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
    },
}


function moduleD() {
    eventBus.events["LOG"] = "eventType1";
    eventBus.events["INC"] = "eventType2";



    eventBus.accept((arg) => { console.log(arg) }, "eventType1")
    eventBus.accept(() => {
        console.log(eventBus.storage.catCounter)
    }, "eventType1")
    eventBus.accept(() => { return eventBus.storage["catCounter"] += 1 }, "eventType2")


    //�������� ������� LOG � INC
    eventBus.event("INC")
    eventBus.event("LOG", "Caaaaaaats!))")
}

function moduleE() {
    eventBus.storage["cats"] = [];
    for (i = 0; i <= 30000; i++) {
        let x = i;
        //setTimeout ��������� ������� ������� ���� ��� ����� ����������� �������� �������.
        setTimeout(function () {
            let cat = { name: "Cat " + x };
            eventBus.storage["cats"].push(cat);
            console.log(eventBus.storage["cats"][x]);
        }, 100);
    }
    //console.log(eventBus.storage["cats"]);

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
}


moduleD();
moduleE();
//setTimeout(console.log("ALL cats: ",eventBus.storage["cats"]),1000000);


//for visual studio
//setTimeout(() => console.log('exit...'), 100000000);