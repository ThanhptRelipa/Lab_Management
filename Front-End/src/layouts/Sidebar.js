import React from 'react'
import { appRouter } from '@/routers'
import { checkPermission } from '@/utils/JWT'

const Sidebar = () => {
  const renderItem = (route, isChild = false) => !route.meta.hidden && checkPermission(route.meta.role) &&
    (<li key={route.name}><a href={route.path}>{ !isChild && <i className={route.icon}></i>} <span className='nav-label'>{route.name}</span></a> </li>)
  const renderItemHasChild = (route, index) => checkPermission(route.meta.role) &&
    (<li key={route.name}>
      <a href={route.path} data-toggle='collapse' data-target={`#menu${index}`} className='collapsed active'>
        <i className={route.icon}></i><span className='nav-label'> {route.name} </span>
        <span className='fa fa-chevron-left pull-right'></span>
      </a>
      <ul className='sub-menu collapse' id={`menu${index}`}>
        <li key={`child${route.name}`} className='active'><a href={route.path}>{ route.name }</a></li>
        {
          route.children.map(child => renderItem(child, true))
        }
      </ul>
    </li>)

  const renderRouters = (routes) => routes.map(
    (route, index) => !route.meta.hidden && route.meta.child
      ? renderItemHasChild(route, index)
      : renderItem(route)
  )

  const renderAppRouter = () => renderRouters(appRouter)

  return (<aside>
    <div className='sidebar left '>
      <div className='user-panel'>
        <div className='pull-left image'>
          <img src='http://via.placeholder.com/160x160' className='rounded-circle' alt='User Image' />
        </div>
        <div className='pull-left info'>
          <p>bootstrap develop</p>
          <a href='#'><i className='fa fa-circle text-success'></i> Online</a>
        </div>
      </div>
      <ul className='list-sidebar bg-defoult'>
        { renderAppRouter() }
      </ul>
    </div>
  </aside>)
}

export default Sidebar
