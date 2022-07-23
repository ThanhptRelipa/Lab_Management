import React from 'react'
import { Card } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faAddressCard, faCalendar, faRegistered, faList, faCirclePlus, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import '../siderUser/siderUser.css'

export default function SiderUser() {
  return (
    <>
      <Card className='sider__navbar-wrapper' title='MAIN' bordered={false}>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='dashboard'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faHouse} />
            Dashboard
        </NavLink>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='profile'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faAddressCard} />
            Profile
        </NavLink>
      </Card>
      <Card className='sider__navbar-wrapper' title='LAB MANAGEMENT' bordered={false}>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='lab-schedule'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faCalendar} />
            Lab schedule
        </NavLink>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='lab-assignment'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faRegistered} />
              Lab assignment
        </NavLink>
      </Card>
      <Card className='sider__navbar-wrapper' title='DEVICE MANAGEMENT' bordered={false}>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='list-devices'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faList} />
            List of devices
        </NavLink>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='add-device'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faCirclePlus} />
            Add device
        </NavLink>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='inventory'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faClipboardCheck} />
            Inventory
        </NavLink>
        <NavLink
          className='sider__nav-content'
          activeClassName='sider__nav-content-active'
          to='device-loan'
        >
          <FontAwesomeIcon className='sider__nav-icon' icon={faRegistered} />
            Device loan
        </NavLink>
      </Card>
    </>
  )
}

// import React from "react";
// import { Card, Space } from 'antd'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faAddressCard, faCalendar, faRegistered, faList, faCirclePlus, faClipboardCheck  } from '@fortawesome/free-solid-svg-icons'
// import '../siderUser/siderUser.css'
// import { Link } from "react-router-dom";

// export default function SiderAdmin () {
//     return (
//         <>
//             <Space direction="vertical">
//                 <Card className="sider__navbar-wrapper" title="MAIN" bordered={false}>
//                     <p className="sider__nav-content">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faHouse} />
//                         Dashboard
//                     </p>
//                     <p className="sider__nav-content">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faAddressCard} />
//                         Profile
//                     </p>
//                 </Card>
//                 <Card className="sider__navbar" title="LAB MANAGEMENT" bordered={false}>
//                     <Link className="sider__nav-content" to="lab-schedule">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faCalendar} />
//                         Lab schedule
//                     </Link>
//                     <p className="sider__nav-content">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faRegistered} />
//                         Lab assignment
//                     </p>
//                 </Card>
//                 <Card className="sider__navbar" title="DEVICE MANAGEMENT" bordered={false}>
//                     <Link className="sider__nav-content" to="list-devices">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faList} />
//                         List of devices
//                     </Link>
//                     <p className="sider__nav-content">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faCirclePlus} />
//                         Add device
//                     </p>
//                     <p className="sider__nav-content">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faClipboardCheck} />
//                         Inventory
//                     </p>
//                     <p className="sider__nav-content">
//                         <FontAwesomeIcon className="sider__nav-icon" icon={faRegistered} />
//                         Device loan
//                     </p>
//                 </Card>
//             </Space>
//         </>
//     )
// }
