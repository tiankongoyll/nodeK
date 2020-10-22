module.exports = app => ({
    index: async ctx => {
        // app.ctx.body = '首页Ctrlww'
        // const name = await app.$service.user.getName()
        // app.ctx.body = 'ctrl user' + name
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: ctx => {
        app.ctx.body = '详细页面Ctrl2'
    }
})