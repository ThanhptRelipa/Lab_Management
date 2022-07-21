import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'

import Head from '../layouts/components/header/index'
import { userInfo } from '../redux/slices/UserInfoSlice'
import SideBar from './components/sider/sider'
import { STORAGEKEY } from '@/utils/storage'
import styles from './App.module.css'
import Clock from './components/Clock'

const { Sider, Header, Content } = Layout

const App = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const [hiddenMenu, setHiddenMenu] = useState(false)
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.userInfo)
  const { renderRouter } = props

  useEffect(() => {
    if (cookies[STORAGEKEY.ACCESS_TOKEN]) {
      setHiddenMenu(true)
      dispatch(userInfo({ email: 'nhungnth@thanglong.edu.vn' }))
    }
  }, [])
  return (
    <>
      <Layout>
        {hiddenMenu && (
          <Sider className={styles.sider}>
            <SideBar />
          </Sider>
        )}
        <Layout>
          {hiddenMenu && (
            <Header className={styles.header}>
              <div className={styles.headerLeft}>
                <text>Welcome,</text>
                <text style={{ fontWeight: 'bold', marginLeft: 5 }} level={5}>
                  {userData.lastName} {userData.firstName}
                </text>
              </div>
              <Clock />
              <Head />
            </Header>
          )}
          <Content
            style={hiddenMenu ? { overflow: 'hidden', padding: '0 15px' } : { overflow: 'hidden', padding: '0 0px' }}
          >
            {renderRouter()}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
