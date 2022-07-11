import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Radio, Row, Select, Typography } from 'antd'
import 'antd/dist/antd.css'
import Layout, { Content } from 'antd/lib/layout/layout'
import Title from 'antd/lib/typography/Title'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeSheetRedux } from '../../redux/timesheet'
import styles from './styles.module.css'
import moment from 'moment'

const SearchTimeSheetRedux = ({ onSearch }) => {
  const { Text } = Typography
  const { Option } = Select
  const dateFormat = 'DD/MM/YY'
  const [radioBtn, setRadioBtn] = useState(1)
  const [disableRadio, setDisableRadio] = useState({ radioSort: false, radioTime: true })
  const [rolesTimestart, setRolesTimeStart] = useState({})
  const btnLoadingRedux = useSelector((state) => state.timesheet.btnLoading)
  const [valueTime, setValueTime] = useState({
    startValue: null,
    endValue: null,
    endOpen: false
  })
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (radioBtn === 2) {
      setRolesTimeStart({
        rulesRadioTime: {
          rules: [
            {
              required: true,
              message: 'Please input date!'
            }
          ]
        },
        rulesRadioSort: {
          rules: [
            {
              required: false
            }
          ]
        }
      })
    } else {
      setRolesTimeStart({
        rulesRadioTime: {
          rules: [
            {
              required: false,
              message: ''
            }
          ]
        },
        rulesRadioSort: {
          rules: [
            {
              required: true,
              message: 'Please input select!'
            }
          ]
        }
      })
    }
  }, [radioBtn])

  const onReset = () => {
    form.resetFields()
    dispatch(timeSheetRedux.btnLoadingSearch(false))
    onSearch({ radioBtn: 3 })
  }

  const onFinish = (value) => {
    dispatch(timeSheetRedux.btnLoadingSearch(true))
    dispatch(timeSheetRedux.loadingTableTrue())
    const values = { ...value, radioBtn }
    onSearch(values)
  }

  const onFinishFailed = () => {}
  const onChangeRadio = (e) => {
    setRadioBtn(e.target.value)
    if (e.target.value === 2) {
      setDisableRadio({ radioSort: true, radioTime: false })
    } else if (e.target.value === 1) {
      setDisableRadio({ radioSort: false, radioTime: true })
    }
    dispatch(timeSheetRedux.btnLoadingSearch(false))
  }

  const disabledStartDate = (startValue) => {
    const { endValue } = valueTime
    if (!startValue || !endValue) {
      return false
    }
    return endValue.valueOf() < startValue.valueOf() || startValue.valueOf() <= moment(endValue).subtract(45, 'day')
  }

  const disabledEndDate = (endValue) => {
    const { startValue } = valueTime
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf() || endValue.valueOf() >= moment(startValue).add(45, 'day')
  }

  const onChange = (field, value) => {
    setValueTime({
      ...valueTime,
      [field]: value
    })
  }

  const onStartChange = (value) => {
    onChange('startValue', value)
  }

  const onEndChange = (value) => {
    onChange('endValue', value)
  }

  return (
    <>
      <div className={styles.timesheet}>
        <div className={styles.timesheetTitle}>
          <Title level={4}>
            <Text className={styles.myTimesheet}>My Timesheet</Text>
          </Title>
        </div>
        <div className={styles.optionSearch}>
          <Layout>
            <Content className={styles.radioOption}>
              <Radio.Group defaultValue={1} onChange={onChangeRadio}>
                <Form
                  name='basic'
                  className={styles.formSearch}
                  initialValues={{
                    remember: true
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete='off'
                  form={form}
                >
                  <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Form.Item>
                        <Form.Item noStyle>
                          <Radio value={1}>Choose from list</Radio>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Form.Item
                        label=''
                        name='Date'
                        className={styles.selectOption}
                        {...rolesTimestart.rulesRadioSort}
                      >
                        <Select placeholder='Select time' disabled={disableRadio.radioSort}>
                          <Option value={1}>This month</Option>
                          <Option value={2}>Last month</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }}>
                      <Form.Item>
                        <Text>Sort by work date</Text>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }}>
                      <Form.Item name='Sort' {...rolesTimestart.rulesRadioSort}>
                        <Select placeholder='Select sort' style={{ width: '160px' }} disabled={disableRadio.radioSort}>
                          <Option value='asc'>Ascending</Option>
                          <Option value='desc'>Decrease</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Form.Item>
                        <Form.Item noStyle>
                          <Radio value={2}>Choose start, end</Radio>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Form.Item name='dateStart' {...rolesTimestart.rulesRadioTime}>
                        <DatePicker
                          disabledDate={disabledStartDate}
                          format={dateFormat}
                          className={styles.selectOption}
                          value={valueTime.startValue}
                          placeholder='Start'
                          onChange={onStartChange}
                          disabled={disableRadio.radioTime}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }}>
                      <Form.Item>
                        <Text>To</Text>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }}>
                      <Form.Item name='dateEnd' {...rolesTimestart.rulesRadioTime}>
                        <DatePicker
                          format={dateFormat}
                          className={styles.selectOption}
                          disabledDate={disabledEndDate}
                          value={valueTime.endValue}
                          placeholder='End'
                          onChange={onEndChange}
                          disabled={disableRadio.radioTime}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24} justify='center'>
                    <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }}>
                      <Form.Item>
                        <Button
                          type='primary'
                          htmlType='submit'
                          style={{ display: 'flex', alignItems: 'center' }}
                          icon={<SearchOutlined />}
                          loading={btnLoadingRedux}
                        >
                          Search
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4, offset: 1 }} lg={{ span: 2, offset: 1 }}>
                      <Form.Item>
                        <Button
                          htmlType='button'
                          style={{ display: 'flex', alignItems: 'center' }}
                          onClick={onReset}
                          icon={<ReloadOutlined />}
                        >
                          Reset
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Radio.Group>
            </Content>
          </Layout>
        </div>
      </div>
    </>
  )
}

export default memo(SearchTimeSheetRedux)
