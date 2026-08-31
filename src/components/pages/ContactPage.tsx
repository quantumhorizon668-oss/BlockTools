import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOHead } from '../common/SEOHead';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('tool-suggestion');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHead
        title="Contact BlockTools — Feedback, Bug Reports & Tool Requests"
        description="Get in touch with the BlockTools team to report a calculation bug, suggest a new Minecraft calculator, or share feedback."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#55D66F]/10 px-3 py-1 text-xs font-semibold text-[#55D66F] border border-[#55D66F]/30 mb-3">
            <Mail className="h-3.5 w-3.5" />
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F1F7F1] tracking-tight mb-4">
            Contact & Feedback
          </h1>
          <p className="text-base text-[#A7B5A9]">
            Have an idea for a new Minecraft tool? Found an edge-case coordinate calculation bug? We’d love to hear from you.
          </p>
        </div>

        <div className="rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 shadow-xl">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#55D66F]/10 border border-[#55D66F]/30 text-[#55D66F]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#F1F7F1]">Message Received!</h2>
              <p className="text-sm text-[#A7B5A9] max-w-md mx-auto">
                Thank you for your feedback. We review all tool requests and bug reports to make BlockTools even better.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 rounded-xl bg-[#55D66F] px-6 py-2.5 text-xs font-bold text-[#080D0A]"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-[#A7B5A9]">
                    Your Name / Minecraft Gamertag
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Steve"
                    className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-2.5 text-sm text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-[#A7B5A9]">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="steve@minecraft.net"
                    className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-2.5 text-sm text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-category" className="text-xs font-semibold text-[#A7B5A9]">
                  Inquiry Topic
                </label>
                <select
                  id="contact-category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] px-4 py-2.5 text-sm text-[#F1F7F1] focus:border-[#55D66F] focus:outline-none"
                >
                  <option value="tool-suggestion">💡 Suggest a New Minecraft Tool</option>
                  <option value="bug-report">🐛 Report a Math / Coordinate Bug</option>
                  <option value="general-feedback">💬 General Feedback or Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-[#A7B5A9]">
                  Message Details
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what tool or feature you'd like to see, or describe the calculation issue..."
                  className="w-full rounded-xl border border-[#26372A] bg-[#0D1510] p-4 text-sm text-[#F1F7F1] placeholder-[#6F8072] focus:border-[#55D66F] focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#55D66F] px-8 py-3 text-xs font-bold text-[#080D0A] transition-all hover:bg-[#9DF0AA] active:scale-95 shadow"
              >
                <Send className="h-4 w-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
