import Vue from 'vue' // 默认 source/vue

let vm = new Vue({
    el: '#app',
    data() {
        return {
            msg: 'hello',
            haha: {
                a: 'haha'
            },
            arr: [1, 2, 3],
            td: '铁蛋儿',
            age: 18
        }
    },
    computed: {
        name() {
            return this.td + this.age
        }
    },
    watch: {
        msg(newValue, oldValue) {
            console.log(newValue, oldValue)
        }
    }
})
setTimeout(function () {
    vm.age = '特别特别帅'
}, 1000)