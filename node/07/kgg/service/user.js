const delay = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tick)
})
delay('999',2000).then(res=>{
    console.log(res)
})
// module.exports = {
//     getName() {
//         return delay('jerry', 1000)
//     },
//     getAge() {
//         return 20
//     }
// }

module.exports = app =>({
    getName() {
        // return delay('jerry', 1000)
        return app.$model.user.findAll()
    },
    getAge() {
        return 20
    }
})