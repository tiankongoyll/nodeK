const path = require('path')
const fs = require('fs')
module.exports=class TestNow{
    genJestSource(sourcePath= path.resolve('./')){
        const testPath = `${sourcePath}/__test__`
        if(!fs.existsSync(testPath)){
            fs.mkdirSync(testPath)
        }
        // 
        let list = fs.readdirSync(sourcePath)
        list
        // 添加完整路径
        .map(v=>`${sourcePath}/${v}`)
        .filter(v=> fs.statSync(v).isFile())
        .filter(v=>v.indexOf('.spec')===-1)
        .map(v=>this.getTestFile(v))
    }
    getTestFile(filename){
        const testFileName = this.getTestFileName(filename)//生成测试文件名
        if(fs.existsSync(testFileName)){
            console.log('该测试代码已存在',testFileName);
            return
        }
        const mod = require(filename)
        let source
        if(typeof mod === 'object'){
            source= Object.keys(mod)
            .map(v=>this.getTestSource(v,path.basename(filename),true))//生成测试语句
            .join('\n')
        }else if(typeof mod === 'function'){
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js',''),basename)
        }
        fs.writeFileSync(testFileName,source)
    }


    getTestSource(methodName,classFile,isClass=false){
        return`
test('${'TEST'+methodName}',()=>{
const ${isClass?'{'+methodName+'}':methodName} = require('${'../'+classFile}')
const ret =${methodName}()
})
`
    }
    /**
     * 生成测试文件名
     * @param {*} filename 
     */
    getTestFileName(filename){
        const dirname = path.dirname(filename)
        const baseName =  path.basename(filename)
        const extName = path.extname(filename)
        const testName = baseName.replace(extName,`.spec${extName}`)
        return path.format({
            root:dirname+'/__test__/',
            base:testName
        })
    }
}