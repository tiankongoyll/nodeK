const compose=(...[first,...other])=>(...args)=>{
    let ret = first(...args)
    other.forEach(fn=>{
        ret = fn(ret)
    })
    return ret
}

