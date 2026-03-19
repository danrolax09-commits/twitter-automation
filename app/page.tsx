'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: '$19',
      priceId: 'price_starter_PLACEHOLDER',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      name: 'Professional',
      price: '$49',
      priceId: 'price_pro_PLACEHOLDER',
      features: ['All Starter features', 'Feature 4', 'Feature 5', 'Feature 6'],
    },
    {
      name: 'Enterprise',
      price: '$99',
      priceId: 'price_enterprise_PLACEHOLDER',
      features: ['All Pro features', 'Feature 7', 'Priority support', 'Custom integrations'],
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
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">twitter-automation</h1>
          <nav className="flex gap-4">
            <a href="#features" className="text-slate-300 hover:text-white">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Transform Your Workflow
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Powerful, simple, and affordable. Get started in minutes.
          </p>
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Simple, Transparent Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition bg-slate-800/50"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.price}/month</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-slate-300 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                {loading ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>&copy; 2026 twitter-automation. All rights reserved.</p>
      </footer>
    </main>
  );
}
