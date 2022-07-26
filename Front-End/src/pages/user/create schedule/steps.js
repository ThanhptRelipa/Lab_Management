import React from 'react'
import { Col, Row, Steps } from 'antd'
import './createSchedule.css'

const FormSteps = (props) => {
  const { step } = props
  return (
    <Row>
      <Col className='steps' xl={18}>
        <Steps progressDot current={step}>
          <Steps.Step title='Register' />
          <Steps.Step title='Number of members' />
          <Steps.Step title='Check and Finished' />
        </Steps>
      </Col>
    </Row>
  )
}

export default FormSteps
