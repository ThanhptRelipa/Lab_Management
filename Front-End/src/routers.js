import React from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import App from './pages'
import HomePage from './pages/home'
import { createBrowserHistory } from 'history'
import { useCookies } from 'react-cookie'
import { STORAGEKEY } from '@/utils/storage'
import LoginPage from './pages/login'
import ChangePassword from './pages/user/change-pass'
import Category from './pages/category'
import CategoryDetail from './pages/category/detail'
import CategoryStore from './pages/category/store'
import Keyword from './pages/keyword'
import { checkPermission } from '@/utils/JWT'
import NotFoundRoute from './pages/404'

const browserHistory = createBrowserHistory()

const PrivateRoute = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])

  return (
    <Route {...props.rest} exact
      render = {(prop) => (
        cookies[STORAGEKEY.ACCESS_TOKEN] ? (
          <div>
            {React.createElement(props.component, prop)}
          </div>
        )
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { redirect_url: prop.location }
              }}
            />
          )
      )}
    />
  )
}

const WhiteListRoute = (props) => {
  const whiteList = ['/login', '/forget-password']
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const isWhiteList = (path) => !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0

  return (
    <Route {...props.rest} exact
      render = {(prop) => (
        isWhiteList(props.path)
          ? (<div>{React.createElement(props.component, prop)}</div>)
          : (<Redirect to={{ pathname: '/' }} />)
      )}
    />
  )
}

export const appRouter = [
  {
    name: 'Dashboard',
    path: '/',
    component: App,
    icon: 'fa fa-diamond',
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginPage,
    icon: 'fa fa-diamond',
    meta: {
      role: '*',
      isPrivate: false,
      hidden: true,
      child: false
    }
  },
  {
    name: 'Change Password',
    path: '/change-password',
    component: ChangePassword,
    icon: 'fa fa-diamond',
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'HomePage',
    path: '/homepage',
    component: HomePage,
    icon: 'fa fa-diamond',
    meta: {
      role: ['admin'],
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Category',
    path: '/category',
    component: Category,
    icon: 'fa fa-diamond',
    meta: {
      role: ['admin'],
      isPrivate: true,
      hidden: false,
      child: true
    },
    children: [
      {
        name: 'Category Detail',
        path: '/category/:id',
        icon: 'fa fa-diamond',
        component: CategoryDetail,
        meta: {
          role: ['admin'],
          isPrivate: true,
          hidden: true,
          child: false
        }
      },
      {
        name: 'Category Store',
        path: '/category-store',
        icon: 'fa fa-diamond',
        component: CategoryStore,
        meta: {
          role: ['admin'],
          isPrivate: true,
          hidden: false,
          child: false
        }
      }
    ]
  },
  {
    name: 'Keyword',
    path: '/keyword',
    component: Keyword,
    icon: 'fa fa-diamond',
    meta: {
      role: ['admin'],
      isPrivate: true,
      hidden: false,
      child: true
    },
    children: [
      {
        name: 'Keyword Detail',
        path: '/keyword/:id',
        icon: 'fa fa-diamond',
        component: Keyword,
        meta: {
          role: ['admin'],
          isPrivate: true,
          hidden: true,
          child: false
        }
      },
      {
        name: 'Keyword Store',
        path: '/keyword-store',
        icon: 'fa fa-diamond',
        component: Keyword,
        meta: {
          role: ['admin'],
          isPrivate: true,
          hidden: false,
          child: false
        }
      }
    ]
  }

]

const renderRouter = (routes) => {
  let arr = []
  routes.forEach(route => {
    const tmpRoute = route.meta.isPrivate
      ? (<PrivateRoute exact path={route.path} component={route.component} key={route.name} />)
      : (<WhiteListRoute path={route.path} component={route.component} key={route.name} />)
    if (checkPermission(route.meta.role)) {
      arr.push(tmpRoute)
    }
    if (route.children) {
      arr = arr.concat(renderRouter(route.children))
    }
  })
  return arr
}

const routes = () => {
  const whiteList = ['/login', '/forget-password']
  const path = window.location.pathname
  const isWhiteList = whiteList.indexOf(path) >= 0

  return (
    <div className={`main-content ${isWhiteList && 'whitelist'}`}>
      <Router history={browserHistory}>
        <Switch>
          { renderRouter(appRouter).map(render => render) }
          <PrivateRoute path='/test/:id' component={Keyword} />
          <Route path='*' component={NotFoundRoute} />
        </Switch>
      </Router>
    </div>
  )
}

export default routes
