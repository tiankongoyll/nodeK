const http = require('http')
const server = http.createServer((request, response) => {
    Math.random() > 0.5 ? aa() : '2'     
    response.end('Hello ')
})

if (!module.parent) {//没有父组件，就是主模块就直接启动
    server.listen(3000);
    console.log('app started at port 3000...');
} else {
    module.exports = server
}