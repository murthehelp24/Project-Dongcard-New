import React from 'react'
import { Link } from 'react-router'

function Sidebar() {
  return (
    <div className='flex flex-col p-5 gap-2'>
      <Link className="btn btn-soft">Dashboard</Link>
      <Link to='/admin/manage-card' className="btn btn-soft">Cards</Link>
      <Link to='/admin/manage-order' className="btn btn-soft">Orders</Link>
    </div>
  )
}

export default Sidebar