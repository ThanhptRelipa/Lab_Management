import React, { useState, useCallback, memo } from 'react'
import moment from 'moment'

import styles from '../App.module.css'

const Clock = () => {
  let time = moment().format('MMMM Do YYYY, HH:mm:ss ')
  const [ctime, setCTime] = useState(time)

  const updateTime = useCallback(() => {
    time = moment().format('MMMM Do YYYY, HH:mm:ss ')
    setCTime(time)
  })

  setInterval(updateTime, 1000)

  return (
    <div className={styles.wrapperTimer}>
      <text className={styles.timer}>{ctime}</text>
    </div>
  )
}

export default memo(Clock)
