import React, { useState, useEffect } from 'react'
import '@/App.css'
import $ from 'jquery'
import { removeCookie, STORAGEKEY } from '@/utils/storage'
import Sidebar from './Sidebar'

const App = (props) => {
  const { renderRouter } = props
  const [hiddenMenu, setHiddenMenu] = useState(false)
  const [hiddenSidebar, setHiddenSidebar] = useState(false)
  const [isWhiteList, setIsWhiteList] = useState(false)
  const whiteList = ['/login', '/forget-password']

  const handleClick = (e) => {
    e.preventDefault()
    $('.sidebar').toggleClass('fliph')
    $('.main-content').toggleClass('small')
  }
  useEffect(() => {
    const currentURL = window.location.pathname
    setIsWhiteList(whiteList.indexOf(currentURL) !== -1)
  }, [window.location])

  useEffect(() => {
    setHiddenMenu(isWhiteList)
    setHiddenSidebar(isWhiteList)
  }, [isWhiteList])

  const logout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    window.location.reload()
  }

  return (
    <>
      { !hiddenMenu &&
        (<header className='header'>
          <nav className='navbar navbar-toggleable-md navbar-light pt-0 pb-0 '>
            <button className='navbar-toggler navbar-toggler-right'
              type='button' data-toggle='collapse'
              data-target='#navbarNavDropdown'
              aria-controls='navbarNavDropdown'
              aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <a className='navbar-brand p-0 mr-5' href='#'><img src='http://via.placeholder.com/61x14' /></a>
            <div className='float-left'> <a href='#' className='button-left' onClick={handleClick}><span className='fa fa-fw fa-bars '></span></a> </div>
            <div className='collapse navbar-collapse flex-row-reverse show' id='navbarNavDropdown'>
              <ul className='navbar-nav'>
                <li className='nav-item dropdown messages-menu'>
                  <a className='nav-link dropdown-toggle' href='http://example.com' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <i className='fa fa-bell-o'></i>
                    <span className='label label-success bg-success'>10</span>
                  </a>
                  <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                    <ul className='dropdown-menu-over list-unstyled'>
                      <li className='header-ul text-center'>You have 4 messages</li>
                      <li>
                        <ul className='menu list-unstyled'>
                          <li>
                            <a href='#'>
                              <div className='pull-left'>
                                <img src='http://via.placeholder.com/160x160' className='rounded-circle  ' alt='User Image' />
                              </div>
                              <h4>
                            Support Team
                                <small><i className='fa fa-clock-o'></i> 5 mins</small>
                              </h4>
                              <p>Why not buy a new awesome theme?</p>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <div className='pull-left'>
                                <img src='http://via.placeholder.com/160x160' className='rounded-circle ' alt='User Image' />
                              </div>
                              <h4>
                              AdminLTE Design Team
                                <small><i className='fa fa-clock-o'></i> 2 hours</small>
                              </h4>
                              <p>Why not buy a new awesome theme?</p>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <div className='pull-left'>
                                <img src='http://via.placeholder.com/160x160' className='rounded-circle ' alt='User Image' />
                              </div>
                              <h4>
                            Developers
                                <small><i className='fa fa-clock-o'></i> Today</small>
                              </h4>
                              <p>Why not buy a new awesome theme?</p>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <div className='pull-left'>
                                <img src='http://via.placeholder.com/160x160' className='rounded-circle ' alt='User Image' />
                              </div>
                              <h4>
                            Sales Department
                                <small><i className='fa fa-clock-o'></i> Yesterday</small>
                              </h4>
                              <p>Why not buy a new awesome theme?</p>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <div className='pull-left'>
                                <img src='http://via.placeholder.com/160x160' className='rounded-circle ' alt='User Image' />
                              </div>
                              <h4>
                            Reviewers
                                <small><i className='fa fa-clock-o'></i> 2 days</small>
                              </h4>
                              <p>Why not buy a new awesome theme?</p>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className='footer-ul text-center'><a href='#'>See All Messages</a></li>
                    </ul>
                  </div>
                </li>
                <li className='nav-item dropdown notifications-menu'>
                  <a className='nav-link dropdown-toggle' href='http://example.com' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <i className='fa fa-envelope-o'></i>
                    <span className='label label-warning bg-warning'>10</span>
                  </a>
                  <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                    <ul className='dropdown-menu-over list-unstyled'>
                      <li className='header-ul text-center'>You have 10 notifications</li>
                      <li>
                        <ul className='menu list-unstyled'>
                          <li>
                            <a href='#'>
                              <i className='fa fa-users text-aqua'></i> 5 new members joined today
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <i className='fa fa-warning text-yellow'></i> Very long description here that may not fit into the
                            page and may cause design problems
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <i className='fa fa-users text-red'></i> 5 new members joined
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <i className='fa fa-shopping-cart text-green'></i> 25 sales made
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <i className='fa fa-user text-red'></i> You changed your username
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className='footer-ul text-center'><a href='#'>View all</a></li>
                    </ul>
                  </div>
                </li>
                <li className='nav-item dropdown  user-menu'>
                  <a className='nav-link dropdown-toggle' href='/'
                    id='navbarDropdownMenuLink' data-toggle='dropdown'
                    aria-haspopup='true' aria-expanded='false'>
                    <img src='http://via.placeholder.com/160x160' className='user-image' alt='User Image' />
                    <span className='hidden-xs'>Admin</span>
                  </a>
                  <i className='fa fa-sign-out' aria-hidden='true' onClick={logout}></i>
                  <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                    <a className='dropdown-item' href='#'>Action</a>
                    <a className='dropdown-item' href='#'>Another action</a>
                    <a className='dropdown-item' href='#'>Something else here</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </header>)
      }
      <div className={`main ${isWhiteList && 'whitelist'}`}>
        { !hiddenSidebar && <Sidebar />}
        { renderRouter() }
      </div>
    </>
  )
}

export default App
