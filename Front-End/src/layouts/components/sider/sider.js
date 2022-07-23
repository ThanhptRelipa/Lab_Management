import React from 'react'
import { Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import SiderUser from './siderUser/siderUser'
import './sider.css'
import SiderAdmin from './siderAdmin/siderAdmin'

export default function SideBar() {
  return (
    <>
      <Button>
        <MenuFoldOutlined />
      </Button>
      {/* <SiderUser /> */}
      <SiderAdmin />
    </>
  )
}
