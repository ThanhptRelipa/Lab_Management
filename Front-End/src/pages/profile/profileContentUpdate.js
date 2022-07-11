import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profile } from '../../redux/profile'
import { Col, Row, Divider, Button, Select, DatePicker, Input, Form, Upload } from 'antd'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import Loading from './Loading'
import moment from 'moment'
import style from './profile.module.css'
import ImgCrop from 'antd-img-crop'

const dateFormat = 'DD/MM/YYYY'
const formatYear = 'YYYY/MM/DD'
const initialGender = [
  { name: 'Male', value: 0 },
  { name: 'Female', value: 1 }
]
const initialMarial = [
  { name: 'Single', value: 0 },
  { name: 'Married', value: 1 },
  { name: 'Divorced', value: 2 },
  { name: 'Other', value: 3 }
]

const profileContentUpdate = () => {
  const [fileList, setFileList] = useState([])
  const dispatch = useDispatch()
  const { data, loading, successUpdate } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(profile.showLoadingProfile(true))
    dispatch(profile.getProfileApi(data))
  }, [])

  useEffect(() => {
    if (successUpdate) {
      window.location.href = '/profile'
      dispatch(profile.clearSuccess())
    }
  }, [successUpdate])

  const { Option } = Select
  const onFinish = (value) => {
    const formData = new FormData()
    Object.keys(value).forEach((key) => formData.append(`${key}`, value[key]))
    formData.append('file_avatar', fileList[0].originFileObj)
    formData.append('file_avatar_official', fileList[1].originFileObj)
    formData.set('gender', parseInt(value.gender))
    formData.set('marital_status', parseInt(value.marital_status))
    formData.set('birth_date', moment(value.birth_date).format(formatYear))
    formData.set('identity_card_date', moment(value.identity_card_date).format(formatYear))
    formData.set(
      'passport_expiration',
      data.passport_expiration ? moment(value.passport_expiration).format(formatYear) : ''
    )
    console.log(value.passport_expiration)
    formData.set('start_date_official', moment(value.start_date_official).format(formatYear))
    dispatch(profile.updateProfileApi(formData))
  }
  const onFinishFailed = (errorInfo) => {}

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async(file) => {
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <div>
      <div className={style.timesheet}>
        <div className={style.timesheet_title}>
          <Title level={4}>
            <Text className={style.f_font}>My profile</Text>
          </Title>
        </div>
        {loading === true ? (
          <Loading />
        ) : (
          <Form
            initialValues={{
              gender: data ? data.gender : null,
              birth_date: data ? moment(data.birth_date) : null,
              identity_number: data ? data.identity_number : null,
              identity_card_date: data ? moment(data.identity_card_date) : null,
              identity_card_place: data ? data.identity_card_place : null,
              passport_number: data ? data.passport_number : null,
              passport_expiration: data ? moment(data.passport_expiration) : null,
              nationality: data ? data.nationality : null,
              permanent_address: data ? data.permanent_address : null,
              temporary_address: data ? data.temporary_address : null,
              nick_name: data ? data.nick_name : null,
              other_email: data ? data.other_email : null,
              skype: data ? data.skype : null,
              facebook: data ? data.facebook : null,
              bank_name: data ? data.bank_name : null,
              bank_account: data ? data.bank_account : null,
              marital_status: data ? initialMarial[data.marital_status] : null,
              academic_level: data ? data.academic_level : null,
              tax_identification: data ? data.tax_identification : null,
              tax_place: data ? data.tax_place : null,
              insurance_number: data ? data.insurance_number : null,
              healthcare_provider: data ? data.healthcare_provider : null,
              emergency_contact_name: data ? data.emergency_contact_name : null,
              emergency_contact_relationship: data ? data.emergency_contact_relationship : null,
              emergency_contact_number: data ? data.emergency_contact_number : null,
              start_date_official: data ? moment(data.start_date_official) : null
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className={style.Container}>
              <div className={style.d_flex}>
                <div className={style.avatar}>
                  <div className={style.col_flex}>
                    <ImgCrop>
                      <Upload listType='picture-card' fileList={fileList} onChange={onChange} onPreview={onPreview}>
                        {fileList.length < 2 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </div>
                </div>
                <div className={style.userInfo}>
                  <Row>
                    <Col span={15}>
                      <label>Member Code:</label>
                    </Col>
                    <Col span={1}>
                      <span>{data.member_code}</span>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={15}>
                      <label>Email: </label>
                    </Col>
                    <Col span={1}>
                      <span>{data.email}</span>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={1}>
                      <label>Name: </label>
                    </Col>
                    <Col span={20} push={14}>
                      <span>{data.full_name}</span>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={15}>
                      <label>Phone number: </label>
                    </Col>
                    <Col span={1}>
                      <span>{data.phone}</span>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className={style.m_right}>
                <Form.Item>
                  <Button type='primary' onClick={onFinish} className={style.e_button} htmlType='submit'>
                    Update Profile
                  </Button>
                </Form.Item>
              </div>
            </div>
            <Divider className={style.divider} />

            <div className={style.d_flex}>
              <div>
                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='gender'
                  label='Gender'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your option'
                    }
                  ]}
                >
                  <Select className={style.l_width}>
                    {initialGender.map((item, index) => (
                      <Option value={item.value} key={index}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 14, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='birth_date'
                  label='Birth Date'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your birth date'
                    }
                  ]}
                >
                  <DatePicker format={dateFormat} className={style.l_width} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='identity_number'
                  label='Identity Number'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your identity number'
                    },
                    { whitespace: true },
                    { max: 12 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your identity...' />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='identity_card_date'
                  label='Date of issue Identity'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your date of issue identity'
                    }
                  ]}
                >
                  <DatePicker format={dateFormat} className={style.l_width} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='identity_card_place'
                  label='Place of issue Identity'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your place of issue identity'
                    },
                    { whitespace: true },
                    { max: 50 }
                  ]}
                  hasFeedback
                >
                  <Input className={style.l_width} placeholder='Input your place of issue...' />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='passport_number'
                  label='Passposs Number'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your passposs number'
                    },
                    { whitespace: true },
                    { max: 20 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your passposs...' />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='passport_expiration'
                  label='Passposs Expiration'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your passposs expiration'
                    }
                  ]}
                >
                  <DatePicker format={dateFormat} className={style.l_width} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 8, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='nationality'
                  label='Nationality'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your nationality'
                    },
                    { whitespace: true },
                    { max: 50 }
                  ]}
                  hasFeedback
                >
                  <Input className={style.l_width} placeholder='Input your nationality...' />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 24, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='permanent_address'
                  label='Permanent Address'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your permanent address'
                    },
                    { whitespace: true },
                    { max: 255 }
                  ]}
                  hasFeedback
                >
                  <Input className={style.r_width} placeholder='Input your permanent...' />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ span: 24, pull: 1 }}
                  labelCol={{ span: 10, pull: 3 }}
                  name='temporary_address'
                  label='Temporary Address'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your temporary address'
                    },
                    { whitespace: true },
                    { max: 255 }
                  ]}
                  hasFeedback
                >
                  <Input className={style.r_width} placeholder='Input your temporary...' />
                </Form.Item>
              </div>

              <div className={style.mr_right}>
                <Form.Item
                  name='nick_name'
                  label='Nick Name'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your nick name'
                    },
                    { whitespace: true }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your name' />
                </Form.Item>

                <Form.Item
                  name='other_email'
                  label='Other Email'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your other email'
                    },
                    { type: 'email' }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your email' />
                </Form.Item>

                <Form.Item
                  name='skype'
                  label='Skype'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your skype!'
                    },
                    { whitespace: true },
                    { max: 30 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your skype' />
                </Form.Item>

                <Form.Item
                  name='facebook'
                  label='Facebook'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your facebook!'
                    },
                    { whitespace: true }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your link facebook' />
                </Form.Item>

                <Form.Item
                  name='bank_name'
                  label='Bank Name'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your bank name!'
                    },
                    { whitespace: true },
                    { max: 70 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your bank name' />
                </Form.Item>

                <Form.Item
                  name='bank_account'
                  label='Bank Account'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your bank account!'
                    },
                    { whitespace: true },
                    { max: 20 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your bank account' />
                </Form.Item>

                <Form.Item
                  name='marital_status'
                  label='Marital Status'
                  wrapperCol={{ span: 24, push: 4 }}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your option!'
                    }
                  ]}
                >
                  <Select className={style.l_width}>
                    {initialMarial.map((item, index) => (
                      <Option value={item.value} key={index}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name='academic_level'
                  label='Academic Level'
                  wrapperCol={{ span: 18, push: 3 }}
                  labelCol={{ span: 9, pull: 1 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your academic level!'
                    },
                    { whitespace: true },
                    { max: 50 }
                  ]}
                  hasFeedback
                >
                  <Input className={style.rr_width} placeholder='Input your academic level' />
                </Form.Item>
              </div>
            </div>

            <Divider className={style.divider} />

            <div className={style.d_flex}>
              <div>
                <Form.Item
                  name='tax_identification'
                  label='Tax Identification'
                  wrapperCol={{ span: 14, push: 6 }}
                  labelCol={{ span: 10, push: 2 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your tax identification!'
                    },
                    { whitespace: true },
                    { max: 20 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your tax identification' />
                </Form.Item>

                <Form.Item
                  name='tax_place'
                  label='Tax Department In Change'
                  wrapperCol={{ span: 14, push: 4 }}
                  labelCol={{ span: 12 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your department!'
                    },
                    { whitespace: true }
                  ]}
                  hasFeedback
                >
                  <Input className={style.w_width} placeholder='Input your tax department in change' />
                </Form.Item>

                <Form.Item
                  name='insurance_number'
                  label='Insuarance Number'
                  wrapperCol={{ span: 14, push: 6 }}
                  labelCol={{ span: 10, push: 2 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your insuarance number!'
                    },
                    { whitespace: true },
                    { max: 10 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your insuarance number' />
                </Form.Item>

                <Form.Item
                  name='healthcare_provider'
                  label='Healthcare Provider'
                  wrapperCol={{ span: 14, push: 6 }}
                  labelCol={{ span: 10, push: 2 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your healthcare provider!'
                    },
                    { whitespace: true },
                    { max: 30 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your healthcare provider' />
                </Form.Item>
              </div>

              <div className={style.mrr_right}>
                <Form.Item
                  name='emergency_contact_name'
                  label='Emergency Contact Name'
                  wrapperCol={{ span: 12, pull: 12 }}
                  labelCol={{ span: 12, pull: 15 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your contact name!'
                    },
                    { whitespace: true }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your emergency contact name' />
                </Form.Item>

                <Form.Item
                  name='emergency_contact_relationship'
                  label='Emergency Contact Relationship'
                  wrapperCol={{ span: 14, pull: 13 }}
                  labelCol={{ span: 13, pull: 16 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your relationship!'
                    },
                    { whitespace: true },
                    { max: 50 }
                  ]}
                  hasFeedback
                >
                  <Input className={style.l_width} placeholder='Input your emergency contact relationship' />
                </Form.Item>

                <Form.Item
                  name='emergency_contact_number'
                  label='Emergency Contact Number'
                  wrapperCol={{ span: 12, pull: 12 }}
                  labelCol={{ span: 12, pull: 15 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your contact number!'
                    },
                    { whitespace: true },
                    { max: 20 }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input your emergency contact number' />
                </Form.Item>

                <Form.Item
                  name='start_date_official'
                  label='Start Date'
                  wrapperCol={{ span: 12, pull: 10 }}
                  labelCol={{ span: 10, pull: 13 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your start date!'
                    }
                  ]}
                >
                  <DatePicker format={dateFormat} className={style.l_width} />
                </Form.Item>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}

export default profileContentUpdate
