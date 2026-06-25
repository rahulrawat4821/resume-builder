import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'

const Pricing = () => {
  const navigate = useNavigate()

  const freeFeatures = [
    { text: '1 resume only', ok: true },
    { text: '1 basic theme', ok: true },
    { text: 'PDF download', ok: false },
    { text: 'Profile photo', ok: false },
    { text: 'Multiple themes', ok: false },
    { text: 'Priority support', ok: false },
  ]

  const premiumFeatures = [
    { text: 'Unlimited resumes', ok: true },
    { text: '10+ themes', ok: true },
    { text: 'PDF download', ok: true },
    { text: 'Profile photo', ok: true },
    { text: 'Custom sections', ok: true },
    { text: 'Priority support', ok: true },
  ]

  return (
    <DashboardLayout>
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Choose Your Plan
          </h1>

          <p className="text-muted text-lg">
            Upgrade to unlock premium features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">Free</h2>

            <div className="mb-2">
              <span className="text-5xl font-bold text-white">₹0</span>
            </div>

            <p className="text-muted mb-8">Forever free</p>

            <div className="space-y-4 mb-8">
              {freeFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className={`text-lg ${
                      feature.ok ? 'text-green-400' : 'text-gray-600'
                    }`}
                  >
                    {feature.ok ? '✓' : '✕'}
                  </span>

                  <span
                    className={`${
                      feature.ok ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-medium">
              Current Plan
            </button>
          </div>

          {/* Premium */}
          <div className="glass glow rounded-3xl p-8 border border-purple-500/30 relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-4 right-4 gradient-primary px-4 py-1 rounded-full text-xs font-semibold text-white">
              Most Popular
            </div>

            {/* Background glow inside card */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 opacity-20 blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Premium</h2>

              <div className="mb-2">
                <span className="text-5xl font-bold text-white">₹199</span>
                <span className="text-muted ml-2">/month</span>
              </div>

              <p className="text-purple-300 mb-8">
                Best for serious job seekers
              </p>

              <div className="space-y-4 mb-8">
                {premiumFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-green-400 text-lg">✓</span>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/payment')}
                className="w-full py-3 rounded-2xl gradient-primary glow font-semibold text-white"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted">
            Need help deciding? Contact support anytime.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Pricing