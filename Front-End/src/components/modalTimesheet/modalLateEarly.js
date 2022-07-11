import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RegisterLateEarly from '../../layouts/components/registerLateEarly/index'

export default function ModalLateEarly({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)

  return (
    <>
      <Modal
        title='Register Late/Early'
        visible={isModalVisible}
        style={{ fontWeight: 500 }}
        width={1000}
        footer={null}
        closable={false}
      >
        <RegisterLateEarly isUser={true} onCancel={onCancel} onOk={onOk} dataLateEarly={dataModal}/>
      </Modal>
    </>
  )
}
