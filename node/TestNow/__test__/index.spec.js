const fs=require('fs')
test('集成测试 测试生成代码',()=>{
    fs.rmdirSync(__dirname+'/data/__test__',{
        recursive:true
    })
    console.log(11111);
    const src =  new(require('../index'))()
    src.genJestSource(__dirname + '/data')
})

// test('测试文件名生成',()=>{
//     const src = new (require('../index'))()
//     const ret = src.getTestFileName('/abc/class.js')
//     console.log('get',ret);
//     expect(ret)
//     .toBe('/abc/__test__/class.spec.js')
// })

// test('测试代码生成',()=>{
//     const src = new (require('../index'))()
//     const ret = src.getTestSource('fun','class')
//     console.log('ret',ret);
//     expect(ret)
//     .toBe(`
// test('TESTfun',()=>{
// const fun = require('../class')
// const ret =fun()
// })
// `)
// })


