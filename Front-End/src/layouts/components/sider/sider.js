import React from 'react'
import { Image } from 'antd'
import SiderUser from './siderUser/siderUser'
import './sider.css'
import { Link } from 'react-router-dom'
// import SiderAdmin from "./siderAdmin/siderAdmin";

export default function SideBar() {
  return (
    <>
      <Link to='/dashboard' style={{ paddingLeft: 10 }}>
        <Image
          width={170}
          preview={false}
          src='https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-thang-long-inkythuatso-01-27-09-26-05.jpg'
        />
      </Link>
      <SiderUser />
      {/* <SiderAdmin />  */}
    </>
  )
}
