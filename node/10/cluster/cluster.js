var cluster = require('cluster');
var os = require('os'); // 获取CPU 的数量、、获取系统相关信息
var numCPUs = os.cpus().length;//cup数量

numCPUs = 2
var process = require('process')//进程

var workers = {};
if (cluster.isMaster) {//判断是否是主进程
    // 主进程分支，工头

    console.log('numCPUs:', numCPUs)
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();//fork相当于又走了一次原来的程序，相当于复制了一个进程，但这个秀进入到了下面的工作进程--子进程
        console.log('init ... pid', worker.process.pid)
        workers[worker.process.pid] = worker;//放入进程集合，储存起来
    }

    cluster.on('exit', (worker, code, signal) => {//进程的监听
        console.log('工作进程 %d 关闭 (%s). 重启中...',
            worker.process.pid, signal || code);
        delete workers[worker.process.pid]//删除出错的进程
        worker = cluster.fork()//再复制一个添加上
        workers[worker.process.pid] = worker
    });
} else {
    //子进程，工作进程 工人
    var app = require('./app');
    app.listen(3000);//不会冲突，cluster这个包回解决
}
// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function () {
    for (var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});
require('./test')