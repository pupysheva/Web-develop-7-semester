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



setTimeout(() => console.log('exit...'), 100000000);