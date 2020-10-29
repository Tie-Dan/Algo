// document.getElementById('logo')是一个 DOM 节点，每当发生click事件，就更新一下状态。
// 我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。
//一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
let myWeakmap = new WeakMap();

myWeakmap.set(
    document.getElementById('logo'), {
        timesClicked: 0
    });

document.getElementById('logo').addEventListener('click', function () {
    let logoData = myWeakmap.get(document.getElementById('logo'));
    logoData.timesClicked++;
}, false);