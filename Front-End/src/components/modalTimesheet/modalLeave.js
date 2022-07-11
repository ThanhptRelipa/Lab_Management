import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormRegisterLeave from '../FormLeave/FormRegisterLeave'

export default function ModalLeave({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)
  const { infoUser } = useSelector((state) => state.infoUser)

  return (
    <>
      <Modal width={1000} footer={false} title='' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <FormRegisterLeave infoUser={infoUser} dataModal={dataModal} onCancel={onCancel} />
      </Modal>
    </>
  )
}
