import App from './App'
import Apage from './pages/Apage'
import Bpage from './pages/Bpage'

export default [
    {
      path: '/',
      component: App,
      routes: [
        {
          path: '/a',
          component: Apage,
          exact: true // 默认路由配置
        },
        {
          path: '/b',
          component: Bpage
        }
      ]
    }
]