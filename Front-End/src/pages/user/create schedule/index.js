import { Layout } from 'antd'
import React, { useState } from 'react'
import FormCreate from './formCreate'
import ListMember from './listMemberRegister'
import moment from 'moment'
import FormSteps from './steps'
import AddMember from './addMember'

const { Content } = Layout

export default function CreateSchedule() {
  const [step, setStep] = useState(0)
  const [creatorInfo, setCreatorInfo] = useState({
    userName: '',
    userCode: '',
    phone: 0,
    email: '',
    dayStart: moment(new Date()).format('YYYY-MM-DD'),
    timeStart: moment(new Date()).format('HH:MM:SS'),
    dayEnd: moment(new Date()).format('YYYY-MM-DD'),
    timeEnd: moment(new Date()).format('HH:MM:SS'),
    purpose: '',
    checkShare: false
  })
  const [listMember, setListMember] = useState([])
  const [displayFormAddMember, setDisplayFormAddMember] = useState(false)
  const handleChangeUserName = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      userName: e.target.value
    })
  }
  const handleChangeUserCode = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      userCode: e.target.value
    })
  }
  const handleChangePhone = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      phone: e.target.value
    })
  }
  const handleChangeEmail = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      email: e.target.value
    })
  }
  const handleChangeDayStart = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      dayStart: e ? e.format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD')
    })
  }
  const handleChangeDayEnd = (e) => {
    console.log(e ? e.format('YYYY-MM-DD') : undefined)
    console.log(e ? e.format('HH:MM:SS') : undefined)
  }
  const handleChangePurpose = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      purpose: e.target.value
    })
  }
  const handleChangeCheckShare = (e) => {
    setCreatorInfo({
      ...creatorInfo,
      checkShare: e.target.checked
    })
  }
  const onAddMember = () => {
    // setListMember([
    //     ...listMember,
    //     {
    //         key: listMember.length + 1,
    //         no: listMember.length + 1,
    //         userName: creatorInfo.userName,
    //         userCode: creatorInfo.userCode,
    //         phone: creatorInfo.phone,
    //         purpose: creatorInfo.purpose
    //     }
    // ])
    console.log('abc')
  }
  const handleOpenFormAddMember = () => {
    setDisplayFormAddMember(!displayFormAddMember)
  }
  return (
    <Layout>
      <Content>
        <FormSteps step={step} />
        {step === 0
          ? <FormCreate
            data={listMember}
            handleChangeUserName={handleChangeUserName}
            handleChangeUserCode={handleChangeUserCode}
            handleChangePhone={handleChangePhone}
            handleChangeEmail={handleChangeEmail}
            handleChangeDayStart={handleChangeDayStart}
            handleChangeDayEnd={handleChangeDayEnd}
            handleChangePurpose={handleChangePurpose}
            handleChangeCheckShare={handleChangeCheckShare}
            onAddMember={onAddMember}
            setStep={setStep}
          />
          : step === 1
            ? <AddMember
              displayFormAddMember={displayFormAddMember}
              handleOpenFormAddMember={handleOpenFormAddMember}
              setStep={setStep}
            />
            : <ListMember data={listMember} />
        }
      </Content>
    </Layout>
  )
}
