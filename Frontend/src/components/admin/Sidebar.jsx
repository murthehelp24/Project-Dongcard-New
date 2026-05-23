import React from 'react'
import { Link, useLocation } from 'react-router'
import { LayoutDashboard, ShoppingCart, Package, ChevronRight } from 'lucide-react'

function Sidebar() {
  const location = useLocation()
  
  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { title: 'Manage Cards', path: '/admin/manage-card', icon: <Package size={20} /> },
    { title: 'Manage Orders', path: '/admin/manage-order', icon: <ShoppingCart size={20} /> },
  ]

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Menu</h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center justify-between p-3 rounded-2xl transition-all duration-300
                ${isActive(item.path) 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                    p-2 rounded-xl transition-colors
                    ${isActive(item.path) ? 'bg-blue-500/50' : 'bg-gray-100 group-hover:bg-blue-50'}
                `}>
                    {item.icon}
                </div>
                <span className="font-bold text-sm">{item.title}</span>
              </div>
              <ChevronRight 
                size={14} 
                className={`transition-transform duration-300 ${isActive(item.path) ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
              />
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs font-bold text-blue-600 uppercase mb-1">Status</p>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-black text-gray-700">Online Mode</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar