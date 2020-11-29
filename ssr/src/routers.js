import Cpage from './pages/Cpage'
import Apage from './pages/Apage'
import Bpage from './pages/Bpage'

export default [
  {
      path: "/",
      component: Cpage,
      exact: true,
  },
  {
      path: "/a",
      component: Apage,
      exact: true,
  },
  {
      path: "/b",
      component: Bpage,
      exact: true,
  }
];
