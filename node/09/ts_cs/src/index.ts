// console.log('ts---');
/*
class Log{
    print(msg){
        console.log(msg);
        
    }
}

const  dec = sender => (target,property)=>{
    const old  = target.prototype[property]
    target.prototype[property]= msg=>{
        msg = `{${sender}:${msg}}`
        old(msg)
    }
}

dec('ll')(Log,'print')
const log = new Log()

log.print('hhh ts')

*/
function decorate(target,preoperty,descriptor){
    const old =  descriptor.value
    descriptor.value = msg=>{
        msg =`[${msg}]`
        return old.apply(null,[msg])
    }
    return descriptor
}
class Log{
    @decorate
    print(msg){
        console.log(msg);
        
    }
}
const log = new Log()

log.print('hhh ts')