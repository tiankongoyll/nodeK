const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const {clone} = require('./download')
const clear = require('clear')
const chalk = require('chalk')
const { resolve } = require('path')
const log = content =>console.log(chalk.green(content))

const spawn = async(...args)=>{
    // 日志流对接
    // promise风格
    const {spawn} = require('child_process')
    return new Promise(resolve=>{
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)//子进程的流导入主进程
        proc.stderr.pipe(process.stderr)

        proc.on('close',()=>{
            resolve()
        })
    })
}

module.exports = async name=>{
    clear()
    const data = await figlet('kkb wwww')
    log(data)
    log(`🚀创建项目`+name)
    // await clone('github:tiankongoyll/vcc',name);
    // log('安装依赖')
    // await spawn('npm',['install'],{cwd:`./${name}`})//命令npm 方法install 进入目录
    // log(`
    //     👌安装完成：
    //     To get Start:
    //     ===========================
    //         cd ${name}
    //         npm run serve
    //     ===========================
    // `)
    const open = require('open')
    open(`http://localhost:8000/`)
    await spawn('npm',['run','serve'],{cwd:`./${name}`})
    
}



