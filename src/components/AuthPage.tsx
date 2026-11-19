import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarSync, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { formatSGD, SupplementProduct } from '../data/supplements';
import { ResilientImage } from './ResilientImage';

export interface SubscriptionSelection {
  product: SupplementProduct;
  variantId: string;
  cadence: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthPageProps {
  subscription: SubscriptionSelection | null;
  currentUser: AuthUser | null;
  onBackToStore: () => void;
  onAuthSuccess: (
    user: AuthUser,
    cadence?: string,
    subscription?: SubscriptionSelection | null
  ) => void;
  onSignOut: () => void;
}

export function AuthPage({
  subscription,
  currentUser,
  onBackToStore,
  onAuthSuccess,
  onSignOut,
}: AuthPageProps) {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [cadence, setCadence] = useState(
    subscription?.cadence || 'Every 30 days'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (subscription?.cadence) {
      setCadence(subscription.cadence);
    }
  }, [subscription]);

  const selectedVariant = subscription
    ? subscription.product.variants.find((v) => v.id === subscription.variantId) ||
      subscription.product.variants[0]
    : null;
  const subscribedPrice = selectedVariant
    ? selectedVariant.priceSGD * 0.9
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim().includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'register' && !fullName.trim()) {
      setErrorMsg('Please enter your full name to register.');
      return;
    }

    const resolvedName =
      mode === 'register'
        ? fullName.trim()
        : email.split('@')[0].replace(/[._-]/g, ' ');

    onAuthSuccess(
      { name: resolvedName, email: email.trim() },
      cadence,
      subscription
    );
    setCompleted(true);
  };

  const handleActivateLoggedIn = () => {
    if (!currentUser) return;
    onAuthSuccess(currentUser, cadence, subscription);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-[#1C241E] flex flex-col">
      {/* Clean Top Bar */}
      <header className="bg-white border-b border-[#E5E8E3]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={onBackToStore}
            className="font-display text-xl font-bold tracking-tight text-[#386E00] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#458500] rounded"
          >
            iHerb
          </button>
          <button
            type="button"
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4A554C] hover:text-[#1C241E] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Supplements</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {completed ? (
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#E5E8E3] p-8 space-y-5">
            <div className="w-12 h-12 rounded-full bg-[#EDF3E8] text-[#3D7700] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#1C241E]">
                {subscription
                  ? 'Subscription Activated (10% Off)'
                  : 'Welcome to iHerb Singapore'}
              </h1>
              <p className="mt-2 text-sm text-[#4A554C] leading-relaxed">
                Signed in as{' '}
                <span className="font-semibold text-[#1C241E]">
                  {currentUser?.email || email}
                </span>
                .
                {subscription && selectedVariant && subscribedPrice !== null
                  ? ` Your recurring ${cadence.toLowerCase()} delivery for ${subscription.product.brand} ${subscription.product.name} (${selectedVariant.label}) is locked at ${formatSGD(subscribedPrice)} per shipment.`
                  : ' Your account is ready for Subscribe & Save orders.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onBackToStore}
              className="w-full min-h-[44px] rounded-lg bg-[#3D7700] hover:bg-[#315F00] text-white text-sm font-semibold transition-colors"
            >
              Return to Supplements Storefront
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Auth Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E8E3] p-6 sm:p-8">
              {currentUser ? (
                <div className="space-y-6">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-[#1C241E]">
                      Confirm Your Subscription
                    </h1>
                    <p className="mt-1.5 text-sm text-[#4A554C]">
                      Signed in as{' '}
                      <span className="font-semibold text-[#1C241E]">
                        {currentUser.name}
                      </span>{' '}
                      ({currentUser.email})
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="signedin-cadence"
                      className="block text-xs font-semibold text-[#1C241E] mb-1.5"
                    >
                      Delivery Frequency
                    </label>
                    <select
                      id="signedin-cadence"
                      value={cadence}
                      onChange={(e) => setCadence(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm text-[#1C241E] focus:outline-none focus:border-[#C2410C]"
                    >
                      <option>Every 30 days</option>
                      <option>Every 60 days</option>
                      <option>Every 90 days</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleActivateLoggedIn}
                      className="subscribe-glow-btn flex-1 min-w-[200px] min-h-[44px] px-6 py-2.5 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-semibold transition-colors"
                    >
                      Activate 10% Subscription
                    </button>
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="px-4 min-h-[44px] rounded-lg border border-[#D4DBD0] text-xs font-semibold text-[#4A554C] hover:text-[#1C241E] hover:bg-[#F3F5F2] transition-colors"
                    >
                      Switch Account
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h1 className="font-display text-2xl font-bold text-[#1C241E]">
                      {mode === 'register'
                        ? 'Create Account to Subscribe'
                        : 'Sign In to Subscribe'}
                    </h1>
                    <p className="mt-1.5 text-sm text-[#4A554C]">
                      Save 10% on recurring supplement deliveries to Singapore. Pause or cancel anytime.
                    </p>
                  </div>

                  {/* Segmented Register / Sign In Toggle */}
                  <div
                    role="tablist"
                    aria-label="Account authentication mode"
                    className="grid grid-cols-2 gap-1 p-1 bg-[#F3F5F2] rounded-lg mb-6"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'register'}
                      onClick={() => {
                        setMode('register');
                        setErrorMsg('');
                      }}
                      className={`py-2.5 min-h-[40px] rounded-md text-xs font-semibold transition-colors ${
                        mode === 'register'
                          ? 'bg-white text-[#1C241E] shadow-xs'
                          : 'text-[#5A655C] hover:text-[#1C241E]'
                      }`}
                    >
                      Create Account
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'login'}
                      onClick={() => {
                        setMode('login');
                        setErrorMsg('');
                      }}
                      className={`py-2.5 min-h-[40px] rounded-md text-xs font-semibold transition-colors ${
                        mode === 'login'
                          ? 'bg-white text-[#1C241E] shadow-xs'
                          : 'text-[#5A655C] hover:text-[#1C241E]'
                      }`}
                    >
                      Sign In
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                      <>
                        <div>
                          <label
                            htmlFor="auth-fullname"
                            className="block text-xs font-semibold text-[#1C241E] mb-1.5"
                          >
                            Full Name
                          </label>
                          <input
                            id="auth-fullname"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Tan Wei Ming"
                            className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#C2410C]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="auth-phone"
                            className="block text-xs font-semibold text-[#1C241E] mb-1.5"
                          >
                            Singapore Mobile (Optional)
                          </label>
                          <input
                            id="auth-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +65 9123 4567"
                            className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#C2410C]"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label
                        htmlFor="auth-email"
                        className="block text-xs font-semibold text-[#1C241E] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="auth-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#C2410C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="auth-password"
                        className="block text-xs font-semibold text-[#1C241E] mb-1.5"
                      >
                        Password
                      </label>
                      <input
                        id="auth-password"
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-[#D4DBD0] text-sm focus:outline-none focus:border-[#C2410C]"
                      />
                    </div>

                    {subscription && (
                      <div>
                        <label
                          htmlFor="auth-cadence"
                          className="block text-xs font-semibold text-[#1C241E] mb-1.5"
                        >
                          Auto-Delivery Cadence
                        </label>
                        <select
                          id="auth-cadence"
                          value={cadence}
                          onChange={(e) => setCadence(e.target.value)}
                          className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-[#D4DBD0] bg-white text-sm focus:outline-none focus:border-[#C2410C]"
                        >
                          <option>Every 30 days</option>
                          <option>Every 60 days</option>
                          <option>Every 90 days</option>
                        </select>
                      </div>
                    )}

                    {errorMsg && (
                      <p role="alert" className="text-xs font-medium text-[#B91C1C]">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="subscribe-glow-btn w-full min-h-[44px] px-6 py-2.5 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-semibold transition-colors"
                    >
                      {mode === 'register'
                        ? 'Register & Subscribe Now'
                        : 'Sign In & Subscribe Now'}
                    </button>

                    <div className="pt-2 flex items-center gap-2 text-xs text-[#5A655C]">
                      <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        Encrypted checkout · Cancel or adjust your schedule anytime
                      </span>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Right Column: Subscription Plan Summary */}
            <aside className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E8E3] p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEFE9]">
                <h2 className="font-display text-base font-bold text-[#1C241E]">
                  Subscribe &amp; Save Summary
                </h2>
                <span className="text-xs font-bold text-[#DC2626]">
                  10% Off
                </span>
              </div>

              {subscription && selectedVariant && subscribedPrice !== null ? (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg bg-[#F3F5F2] border border-[#E5E8E3] overflow-hidden shrink-0">
                      <ResilientImage
                        src={subscription.product.image}
                        alt={subscription.product.name}
                        title={subscription.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#5A655C]">
                        {subscription.product.brand}
                      </p>
                      <p className="font-display text-sm font-semibold text-[#1C241E] line-clamp-2">
                        {subscription.product.name}
                      </p>
                      <p className="text-xs text-[#5A655C] mt-1">
                        {selectedVariant.label}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#ECEFE9] space-y-2 text-xs text-[#4A554C]">
                    <div className="flex justify-between">
                      <span>Standard Price</span>
                      <span className="tabular-nums">
                        {formatSGD(selectedVariant.priceSGD)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#DC2626] font-semibold">
                      <span>Subscribe &amp; Save (10%)</span>
                      <span className="tabular-nums">
                        -{formatSGD(selectedVariant.priceSGD * 0.1)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#ECEFE9] text-sm font-bold text-[#1C241E]">
                      <span>Recurring Price</span>
                      <span className="tabular-nums font-extrabold text-[#DC2626]">
                        {formatSGD(subscribedPrice)}{' '}
                        <span className="text-xs font-semibold text-[#5A655C]">
                          (10%)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#4A554C]">
                  Sign in or register to unlock 10% savings on recurring supplement
                  deliveries across Singapore.
                </p>
              )}

              <div className="pt-4 border-t border-[#ECEFE9] space-y-2.5 text-xs text-[#4A554C]">
                <div className="flex items-start gap-2.5">
                  <CalendarSync
                    className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Flexible auto-refill—skip, adjust cadence, or cancel online in one click.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck
                    className="w-4 h-4 text-[#3D7700] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Priority climate-controlled dispatch to Singapore on every cycle.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
