import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile')
      setProfile(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', icon: '⊞', label: 'Dashboard' },
    { path: '/profile', icon: '◯', label: 'Profile' },
    { path: '/pricing', icon: '★', label: 'Pricing' },
  ]

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: '#060816' }}>

      {/* Background glow */}
      <div className="absolute top-10 left-20 w-72 h-72 rounded-full opacity-10 blur-[140px] pointer-events-none" style={{ background: '#7C3AED' }} />
      <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full opacity-10 blur-[140px] pointer-events-none" style={{ background: '#2563EB' }} />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-6 flex items-center justify-between"
        style={{
          background: 'rgba(6,8,22,0.85)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl text-gray-400 hover:text-white transition p-1"
          >
            ☰
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
            >
              R
            </div>
            <span className="font-bold text-base hidden sm:block">Resume Builder</span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium hidden sm:block"
            style={profile?.plan === 'PREMIUM'
              ? { background: 'rgba(250,204,21,0.15)', color: '#fbbf24', border: '1px solid rgba(250,204,21,0.3)' }
              : { background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }
            }
          >
            {profile?.plan === 'PREMIUM' ? '👑 Premium' : 'Free Plan'}
          </span>

          {profile?.plan !== 'PREMIUM' && (
            <button
              onClick={() => navigate('/pricing')}
              className="px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Upgrade
            </button>
          )}

          {/* Profile Avatar */}
          <div
            className="w-9 h-9 rounded-full overflow-hidden cursor-pointer flex-shrink-0"
            style={{ border: '2px solid rgba(124,58,237,0.5)' }}
            onClick={() => navigate('/profile')}
          >
            {profile?.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
              >
                {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex pt-16 relative z-10">
        {/* Sidebar */}
        <aside
          className="fixed left-0 bottom-0 z-40 flex flex-col px-3 py-5 transition-all duration-300"
          style={{
            top: '64px',
            width: sidebarOpen ? '240px' : '0px',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(18px)',
            borderRight: sidebarOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}
        >
          {/* Profile mini card in sidebar */}
          {sidebarOpen && (
            <div
              className="flex items-center gap-3 px-3 py-3 rounded-2xl mb-4"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                {profile?.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-semibold text-sm"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
                  >
                    {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">{profile?.name || 'User'}</div>
                <div className="text-xs truncate" style={{ color: '#4B5563' }}>{profile?.plan === 'PREMIUM' ? '👑 Premium' : 'Free Plan'}</div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1 flex-1 min-w-[210px]">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium transition-all whitespace-nowrap"
                  style={active
                    ? { background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white', boxShadow: '0 8px 24px rgba(124,58,237,0.25)' }
                    : { color: '#94A3B8' }
                  }
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium transition-all whitespace-nowrap"
            style={{ color: '#f87171' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span>↩</span> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 min-h-screen transition-all duration-300 p-4 md:p-8"
          style={{ marginLeft: sidebarOpen ? '240px' : '0px' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout