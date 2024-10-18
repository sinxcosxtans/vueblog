import router from "./router";

// 路由判断登录 根据路由配置文件的参数
//beforeEach 方法设置全局前置守卫，在每次路由变化前执行
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireAuth)) { // 通过判断该路由是否需要登录权限

    const token = localStorage.getItem("token")
    console.log("------------" + token)

    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/login') {

      } else {
        next() // 继续访问目标路由
      }
    } else {
      next({
        path: '/login' // 如果没有token，重定向到登录页面
      })
    }
  } else {
    next() // 如果该路由不需要认证，继续访问
  }
})