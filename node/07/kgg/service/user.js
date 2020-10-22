const delay = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tick)
})
delay('999',2000).then(res=>{
    console.log(res)
})
module.exports = {
    getName() {
        return delay('jerry', 1000)
    },
    getAge() {
        return 20
    }
}
