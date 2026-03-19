'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      priceId: 'price_starter',
      description: 'For content creators',
      features: ['Schedule up to 30 tweets/month', 'Basic analytics', 'Tweet templates', 'Queue management'],
    },
    {
      name: 'Professional',
      price: '$79',
      priceId: 'price_pro',
      description: 'For growing accounts',
      features: ['Unlimited tweets', 'Advanced analytics', 'Thread builder', 'Engagement tracking', 'Team access (2 users)'],
    },
    {
      name: 'Enterprise',
      price: '$199',
      priceId: 'price_enterprise',
      description: 'For agencies and brands',
      features: ['Everything in Pro', 'Multi-account management', 'API access', 'White-label options', 'Dedicated support', 'Custom integrations'],
    },
  ];

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="border-b border-slate-700 sticky top-0 bg-slate-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <span>𝕏</span> Auto Tweet
          </h1>
          <nav className="flex gap-6">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">Automate Your Twitter Presence</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Schedule posts, grow engagement, and track performance. The smart way to manage your Twitter account.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Free
          </button>
          <button className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8 py-3 rounded-lg font-semibold transition">
            View Demo
          </button>
        </div>
      </section>

      <section id="features" className="bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose Auto Tweet</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📅', title: 'Smart Scheduling', desc: 'Auto-schedule tweets at peak engagement times' },
              { icon: '🔄', title: 'Auto-Reply', desc: 'Respond to mentions automatically with AI' },
              { icon: '📊', title: 'Deep Analytics', desc: 'See what drives engagement and conversions' },
              { icon: '🧵', title: 'Thread Builder', desc: 'Create and schedule tweet threads effortlessly' },
              { icon: '🚀', title: 'Growth Tools', desc: 'Grow followers with intelligent engagement' },
              { icon: '🔌', title: 'Integrations', desc: 'Connect with your entire marketing stack' },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-lg bg-slate-700/30 border border-slate-600 hover:border-blue-500 transition">
                <p className="text-4xl mb-3">{feature.icon}</p>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={plan.name} 
              className={`rounded-lg p-8 transition transform hover:scale-105 border ${
                idx === 1 
                  ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500' 
                  : 'border-slate-700 bg-slate-800/50'
              }`}
            >
              {idx === 1 && <div className="text-sm font-bold text-blue-400 mb-2 uppercase">Most Popular</div>}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
              <p className="text-4xl font-bold text-white mb-6">
                {plan.price}
                <span className="text-lg text-slate-400">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="text-slate-300 flex items-start">
                    <span className="text-green-400 mr-3">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
                  idx === 1
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {loading ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>&copy; 2026 Revenue Product. All rights reserved.</p>
      </footer>
    </main>
  );
}
