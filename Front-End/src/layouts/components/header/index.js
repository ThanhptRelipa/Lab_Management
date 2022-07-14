import { Avatar, Dropdown, Menu } from 'antd'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { authActions } from '../../../redux/auth'
import { useDispatch } from 'react-redux'
import style from './header.module.css'

export default function Head() {
  const dispatch = useDispatch()

  const handleLogout = async() => {
    await dispatch(authActions.logout())
    window.location.reload()
  }

  const menuUser = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <p onClick={handleLogout}>logout</p>
          )
        }
      ]}
    />
  )

  return (
    <>
      {/* <Text className='notification'>03</Text> */}
      <FontAwesomeIcon className={style.icon} icon={faBell} />
      <Dropdown overlay={menuUser} arrow>
        <Avatar
          className={style.avatar}
          src='https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/226396345_112714520999473_4823512747928449349_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=r1Gv66ilVM8AX_X-P0B&_nc_ht=scontent.fhph2-1.fna&oh=00_AT_TedsQ2ajuyXa5zwpHSAfcWKK5gNA3vR0dGSVP3BhjNw&oe=6265FB83'
        />
      </Dropdown>
    </>
  )
}
