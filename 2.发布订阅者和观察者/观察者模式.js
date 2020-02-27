// 被观察者 （小宝宝）
class Subject {
    constructor(name) {
        this.name = name;
        this.state = "开心"; // 被观察者的状态
        this.observers = []; // 存放观察者
    }
    // 需要将注册者放到自己的身上
    attach(ther) {
        this.observers.push(ther);
    }
    // 更新被观察者的状态
    setState(state) {
        this.state = state;
        this.observers.forEach(ther => {
            ther.update(this);
        });
    }
}
// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    // 等会被观察者的状态发生变化会调用这个方法
    update(subject) {
        console.log(this.name + ":" + subject.name + "当前状态是" + subject.state);
    }
}
let bady = new Subject("小宝宝");
let father = new Observer("爸爸");
let mother = new Observer("妈妈");
bady.attach(father);
bady.attach(mother);
bady.setState("不开心");
bady.setState("饿了");