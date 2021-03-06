import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { STORAGEKEY } from '@/utils/storage'
import { checkPermission } from '@/utils/JWT'
import NotFoundRoute from './pages/404'
import LoginPage from './pages/login'
import LabSchedule from './layouts/components/Lab schedule'
import Home from './pages/home'
import ListDevices from './layouts/components/List devices'
import CreateSchedule from './pages/user/create schedule'
import RegisterBorrow from './pages/user/registerBorrow'
import RegisterPage from './pages/register'
import Profile from './pages/profile'
// import { createBrowserHistory } from 'history'

// const browserHistory = createBrowserHistory()

const PrivateRoute = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const Component = props.component
  return (
    <Route
      {...props.rest}
      exact
      render={(prop) =>
        cookies[STORAGEKEY.ACCESS_TOKEN] ? (
          <Component {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { redirect_url: prop.location }
            }}
          />
        )
      }
    />
  )
}

const WhiteListRoute = (props) => {
  const whiteList = ['/login', '/register', '/forget-password']
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const isWhiteList = (path) => !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0

  return (
    <Route
      {...props.rest}
      exact
      render={(prop) =>
        isWhiteList(props.path) ? (
          <div>{React.createElement(props.component, prop)}</div>
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

export const appRouter = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'LabSchedule',
    path: '/lab-schedule',
    component: LabSchedule,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'ListDevices',
    path: '/list-devices',
    component: ListDevices,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'CreateSchedule',
    path: '/register-to-use',
    component: CreateSchedule,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'RegisterBorrow',
    path: '/register-to-borrow',
    component: RegisterBorrow,
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
    meta: {
      role: '*',
      isPrivate: false,
      hidden: true,
      child: false
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: RegisterPage,
    meta: {
      role: '*',
      isPrivate: false,
      hidden: true,
      child: false
    }
  }
]

const renderRouter = (routes) => {
  let arr = []
  routes.forEach((route) => {
    const tmpRoute = route.meta.isPrivate ? (
      <PrivateRoute exact path={route.path} component={route.component} key={route.name} />
    ) : (
      <WhiteListRoute path={route.path} component={route.component} key={route.name} />
    )
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
  const whiteList = ['/login', '/register', '/forget-password']
  const path = window.location.pathname
  const isWhiteList = whiteList.includes(path)
  return (
    <div className={`main-content ${isWhiteList && 'whitelist'}`}>
      <Switch>
        {renderRouter(appRouter).map((render) => render)}
        {/* <PrivateRoute path='/test/:id' component={Keyword} /> */}
        <PrivateRoute path='/test/:id' />
        <Route path='*' component={NotFoundRoute} />
      </Switch>
    </div>
  )
}

export default routes
