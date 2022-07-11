import React, { useEffect, useState } from 'react'
import { Col, Row, Avatar, Divider, Button, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { profile } from '../../redux/profile'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import style from '../profile/profile.module.css'
import Loading from './Loading'
import moment from 'moment'

const inititalGender = ['Male', 'Female']
const initialMarial = ['Single', 'Married', 'Divorced', 'Other']

const profileContentPage = () => {
  const [avatar, setAvatal] = useState('')
  const [avatarOfficial, setAvatarOfficial] = useState('')
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.profile)
  useEffect(() => {
    dispatch(profile.showLoadingProfile(true))
    dispatch(profile.getProfileApi())
  }, [])

  return (
    <div className={style.timesheet}>
      <div className={style.timesheet_title}>
        <Title level={4}>
          <Text className={style.f_font}>My profile</Text>
        </Title>
      </div>
      {loading === true ? (
        <Loading />
      ) : (
        <Form>
          <div className={style.Container}>
            <div className={style.d_flex}>
              <div className={style.avatar}>
                <Avatar
                  shape='square'
                  className={style.avatar_image}
                  size={150}
                  alt='avatar loading...'
                  src={
                    data?.avatar && !avatar
                      ? data?.avatar
                      : (data?.avatar && avatar) || (!data?.avatar && avatar)
                        ? URL.createObjectURL(avatar)
                        : data?.gender === 0
                          ? '/images/women.png'
                          : '/images/man.jpg'
                  }
                />
                <Avatar
                  shape='square'
                  size={100}
                  alt='avatar loading...'
                  src={
                    data.avatar_official && !avatarOfficial
                      ? data.avatar_official
                      : (data.avatar_official && avatarOfficial) || (!data.avatar_official && avatarOfficial)
                        ? URL.createObjectURL(avatarOfficial)
                        : data.gender === 1
                          ? '/images/women.png'
                          : '/images/man.jpg'
                  }
                />
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
            <div>
              <Link to='/profileUpdate'>
                <Button type='primary' className={style.e_button}>
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <Divider className={style.divider} />

          <div className={style.d_flex}>
            <div className={style.c_flex}>
              <Row>
                <Col span={15}>
                  <label>Gender: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{inititalGender[data.gender]}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Birth Date: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{moment(data.birth_date).format('DD/MM/YYYY')}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Identity Number: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{data.identity_number}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Date of issue Identity: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{moment(data.identity_card_date).format('DD/MM/YYYY')}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Place of issue identity: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{data.identity_card_place}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Passport Number: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{data.passport_number}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Passport Expiration: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{moment(data?.passport_expiration).format('DD/MM/YYYY')}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Nationnality: </label>
                </Col>
                <Col span={9} pull={2}>
                  <span>{data.nationality}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <label>Permanent Address: </label>
                </Col>
                <Col span={14} push={3}>
                  <span>{data.permanent_address}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <label>Temporary Address: </label>
                </Col>
                <Col span={14} push={3}>
                  <span>{data.temporary_address}</span>
                </Col>
              </Row>
            </div>

            <div className={style.flex_mr}>
              <Row>
                <Col span={10} pull={20}>
                  <label>Nick name: </label>
                </Col>
                <Col span={14} pull={18}>
                  <span>{data.nick_name}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={21}>
                  <label>Other email: </label>
                </Col>
                <Col span={14} pull={18}>
                  <span>{data.other_email}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={17}>
                  <label>Skype:</label>
                </Col>
                <Col span={4} pull={18}>
                  <span>{data.skype}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={19}>
                  <label>Facebook: </label>
                </Col>
                <Col pull={18}>
                  <a>{data.facebook}</a>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={20}>
                  <label>Bank name: </label>
                </Col>
                <Col pull={18}>
                  <span>{data.bank_name}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={22}>
                  <label>Bank Account: </label>
                </Col>
                <Col pull={18}>
                  <span>{data.bank_account}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={22}>
                  <label>Marital Status: </label>
                </Col>
                <Col pull={18}>
                  <span>{initialMarial[data.marital_status]}</span>
                </Col>
              </Row>

              <Row>
                <Col span={16} pull={23}>
                  <label>Academic Level: </label>
                </Col>
                <Col span={8} pull={24}>
                  <span>{data.academic_level}</span>
                </Col>
              </Row>
            </div>
          </div>
          <Divider className={style.divider} />

          <div className={style.d_flex}>
            <div className={style.l_flex}>
              <Row>
                <Col span={15}>
                  <label>Tax Identification: </label>
                </Col>
                <Col span={9} push={8}>
                  <span>{data.tax_identification}</span>
                </Col>
              </Row>

              <Row>
                <Col span={19}>
                  <label>Tax Department Change: </label>
                </Col>
                <Col span={5} push={4}>
                  <span>{data.tax_place}</span>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <label>Insurance Number: </label>
                </Col>
                <Col span={9} push={8}>
                  <span>{data.insurance_number}</span>
                </Col>
              </Row>

              <Row>
                <Col span={18}>
                  <label>Healthcare Provider: </label>
                </Col>
                <Col span={6} push={5}>
                  <span>{data.healthcare_provider}</span>
                </Col>
              </Row>
            </div>

            <div className={style.f_overrall_mr}>
              <Row>
                <Col span={20} push={2}>
                  <label>Emergency Contact Name:</label>
                </Col>
                <Col span={4} push={2}>
                  <span>{data.emergency_contact_name}</span>
                </Col>
              </Row>
              <Row>
                <Col span={20} pull={2}>
                  <label>Emergency Contact Relationship:</label>
                </Col>
                <Col span={3} push={2}>
                  <span>{data.emergency_contact_relationship}</span>
                </Col>
              </Row>
              <Row>
                <Col span={18}>
                  <label>Emergency Contact Number:</label>
                </Col>
                <Col span={6} push={4}>
                  <span>{data.emergency_contact_number}</span>
                </Col>
              </Row>
              <Row>
                <Col span={18} push={10}>
                  <label>Start Date:</label>
                </Col>
                <Col span={6} push={4}>
                  <span>{moment(data.start_date_official).format('DD/MM/YYYY')}</span>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

export default profileContentPage
