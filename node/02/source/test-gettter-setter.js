const kaikeba = {
    info:{name : 'kkkk',desc:'hghghghg'},
    get name(){
        return this.info.name
    },
    set name(val){
        console.log('new name is '+ val)
        this.info.name = val + 'ggg'
    }
}

console.log(kaikeba.name)
kaikeba.name = 'kaikeba'
console.log(kaikeba.name)