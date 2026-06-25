import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', icon: '◫', label: 'Dashboard' },
    { path: '/profile', icon: '◉', label: 'Profile' },
    { path: '/pricing', icon: '✦', label: 'Pricing' },
  ]

  return (
    <div className="min-h-screen bg-[#060816] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-purple-600 opacity-10 blur-[140px]" />
      <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-blue-600 opacity-10 blur-[140px]" />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 px-6 flex items-center justify-between"
        style={{
          background: 'rgba(6,8,22,0.75)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl text-gray-300 hover:text-white"
          >
            ☰
          </button>

          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-primary glow flex items-center justify-center">
              <span className="font-bold text-white">R</span>
            </div>

            <span className="font-bold text-lg">Resume Builder</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Free Plan
          </span>

          <button
            onClick={() => navigate('/pricing')}
            className="gradient-primary px-4 py-2 rounded-xl text-sm font-semibold glow"
          >
            Upgrade
          </button>

          <div className="w-10 h-10 rounded-full gradient-primary glow flex items-center justify-center font-semibold">
            RR
          </div>
        </div>
      </nav>

      <div className="flex pt-16 relative z-10">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside
            className="w-64 fixed left-0 bottom-0 px-4 py-5 flex flex-col"
            style={{
              top: '64px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(18px)',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex flex-col gap-2 flex-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium"
                    style={
                      active
                        ? {
                            background:
                              'linear-gradient(135deg,#7C3AED,#2563EB)',
                            boxShadow:
                              '0 12px 30px rgba(124,58,237,.25)',
                          }
                        : {
                            color: '#94A3B8',
                          }
                    }
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-3 rounded-2xl flex items-center gap-3 text-red-300 hover:bg-red-500/10"
            >
              <span>↩</span>
              Logout
            </button>
          </aside>
        )}

        {/* Main Content */}
        <main
          className="flex-1 p-6 md:p-8"
          style={{
            marginLeft: sidebarOpen ? '256px' : '0',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout