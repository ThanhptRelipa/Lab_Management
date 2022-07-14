import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import Head from '../layouts/components/header/index'
import SideBar from './components/sider/sider'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { STORAGEKEY } from '@/utils/storage'
import { getInfoUser } from '../redux/inforUser'
import style from './App.module.css'

const { Sider, Header, Content } = Layout
const App = (props) => {
  const dispatch = useDispatch()
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const { renderRouter } = props
  const [hiddenMenu, setHiddenMenu] = useState(false)
  const { successLogin, successLogout } = useSelector((state) => state.auth)

  useEffect(() => {
    if (successLogin === true) {
      setHiddenMenu(true)
    }
  }, [successLogin])

  useEffect(() => {
    if (successLogout === true) {
      setHiddenMenu(false)
    }
  }, [successLogout])

  useEffect(() => {
    if (cookies[STORAGEKEY.ACCESS_TOKEN]) {
      setHiddenMenu(true)
    }
  }, [])

  return (
    <Layout>
      {hiddenMenu && <Sider className={style.sider}>
        <SideBar />
      </Sider>}
      <Layout>
        {hiddenMenu && <Header className={style.header}>
          <Head />
        </Header>}
        <Content style={{ overflow: 'hidden' }}>
          {renderRouter()}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
