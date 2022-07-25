import { Avatar, Col, Descriptions, Row, Typography, Button, Upload } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation } from 'react-query'

import { storage } from '../../utils/firebase'
import './profile.css'
import { patch } from '../../api/BaseRequest'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const Profile = () => {
  // state
  const [imageUrl, setImageUrl] = useState()
  const [fileSource, setFileSource] = useState()
  const [avatarUrl, setAvatarUrl] = useState('')

  // redux
  const { userData } = useSelector((state) => state.userInfo)

  // arrowFunction
  const handleChange = (info) => {
    setFileSource(info.file.originFileObj)
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url)
    })
  }

  useEffect(() => {
    if (!fileSource) return
    const storageRef = ref(storage, fileSource?.name)
    const uploadAvatar = uploadBytesResumable(storageRef, fileSource)

    uploadAvatar.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadAvatar.snapshot.ref).then((downloadURL) => {
          setAvatarUrl(downloadURL)
        })
      }
    )
  }, [fileSource])

  const updateInfoUser = async(data) => {
    return await patch(`api/updateUserInfo`, data)
  }

  const { mutate: patchInfoUserAPI, isLoading: ispatchingInfoUserAPI } = useMutation(updateInfoUser, {
    onSuccess: (data) => {
      toast.success(`Update Success !`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    },
    onError: (errors) => {
      toast.error(`Update Failed !`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  })

  const handleUpdateImg = () => {
    patchInfoUserAPI({ avatarUrl: avatarUrl })
  }

  return (
    <Row>
      <Col className='wrapper' xl={23}>
        <Col className='wrapper__row' xl={24}>
          <Col className='wrapper__row-item'>
            <Avatar className='wrapper__row-avatar' src={imageUrl || userData.avatarUrl} shape='square' size={100} />
            <Col className='wrapper__row-title'>
              <Typography.Title level={2}>
                {userData.lastName} {userData.firstName}
              </Typography.Title>
              <Typography.Text>User</Typography.Text>
            </Col>
          </Col>
          <Col className='wrapper__row-item'>
            <Upload disabled={fileSource} showUploadList={false} onChange={handleChange} name='uploadAvatar'>
              <Button type='primary' loading={ispatchingInfoUserAPI} onClick={fileSource && handleUpdateImg}>
                {fileSource ? `Change` : `Edit avatar`}
              </Button>
            </Upload>
          </Col>
        </Col>
        <Col className='wrapper__row' xl={24}>
          <Descriptions className='user-info'>
            <Descriptions.Item label='Full Name'>{userData.firstName + ' ' + userData.lastName}</Descriptions.Item>
            <Descriptions.Item label='Code'>{userData.code}</Descriptions.Item>
            <Descriptions.Item label='Phone'>0{userData.phone}</Descriptions.Item>
            <Descriptions.Item label='Email'>{userData.email}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Col>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Row>
  )
}

export default Profile
