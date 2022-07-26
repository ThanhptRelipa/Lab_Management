import { Layout } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

import FormSteps from './steps'
import RoomRegisterForm from './RoonRegisterForm'
import ListMember from './listMemberRegister'

const { Content } = Layout

export default function CreateSchedule() {
  const step = useSelector((state) => state.step)
  return (
    <Layout>
      <Content>
        <FormSteps step={step.current} />
        {step.current === 0 && <RoomRegisterForm />}
        {step.current === 1 && <ListMember />}
      </Content>
    </Layout>
  )
}
