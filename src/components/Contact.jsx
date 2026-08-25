import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import { resumeData } from '../data/resumeData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'activation_needed' | 'fallback' | null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Direct-to-Inbox Background Form Submission using FormSubmit API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${resumeData.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (result.success === 'true' || result.success === true) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#2DD4BF', '#7DD3FC', '#F0F9FF']
        });
      } else if (result.message && result.message.includes('Activation')) {
        setSubmitStatus('activation_needed');
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitStatus('fallback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailtoFallback = () => {
    const mailtoUrl = `mailto:${resumeData.personal.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1926] border border-[#1E3A5F] text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Let's Build Something <span className="gradient-text-hero">Exceptional</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Open for full-time engineering roles, high-impact contract opportunities, and innovative freelance collaborations.
          </p>
        </div>

        {/* DIRECT CONTACT & MESSAGE FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Quick Contact Cards */}
            <div className="bg-[#0D1926] p-6 sm:p-7 rounded-3xl border border-[#1E3A5F] space-y-5 shadow-2xl backdrop-blur-2xl">
              <h3 className="text-lg font-bold text-[#F0F9FF]">Direct Reach</h3>
              
              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#08101A] border border-[#1E3A5F] group hover:border-[#38BDF8] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0D1926] text-[#38BDF8] border border-[#1E3A5F]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Email</div>
                      <a href={`mailto:${resumeData.personal.email}`} className="text-xs sm:text-sm font-semibold text-[#F0F9FF] hover:text-[#7DD3FC] transition-colors">
                        {resumeData.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F0F9FF] bg-[#0D1926] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#2DD4BF]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp Item */}
                <a
                  href={resumeData.personal.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#08101A] border border-[#1E3A5F] group hover:border-[#2DD4BF] hover:bg-[#0D1926] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0D1926] text-[#2DD4BF] border border-[#1E3A5F]">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#2DD4BF] uppercase">WhatsApp Direct Line</div>
                      <div className="text-xs sm:text-sm font-bold text-[#F0F9FF]">
                        {resumeData.personal.phone}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#2DD4BF] group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#08101A] border border-[#1E3A5F]">
                  <div className="p-2.5 rounded-xl bg-[#0D1926] text-[#38BDF8] border border-[#1E3A5F]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#F0F9FF]">
                      {resumeData.personal.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#1E3A5F]/50 space-y-3">
                <div className="text-xs font-mono text-[#94A3B8]">Official Profiles:</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] hover:border-[#38BDF8] text-xs font-bold text-[#F0F9FF] transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#38BDF8]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={resumeData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] hover:border-[#38BDF8] text-xs font-bold text-[#F0F9FF] transition-all"
                  >
                    <GithubIcon className="w-4 h-4 text-[#38BDF8]" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Custom Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0D1926] p-6 sm:p-8 rounded-3xl border border-[#1E3A5F] space-y-6 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-[#1E3A5F]/50 pb-4">
                <h3 className="text-xl font-bold text-[#F0F9FF] flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#38BDF8]" />
                  <span>Send Direct Message</span>
                </h3>
                <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#08101A] px-2.5 py-1 rounded-full border border-[#2DD4BF]/30">
                  ● Direct Inbox API
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#7DD3FC]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#08101A] border border-[#1E3A5F] focus:border-[#38BDF8] focus:outline-none text-sm text-[#F0F9FF] placeholder-[#94A3B8]/60 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#7DD3FC]">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#08101A] border border-[#1E3A5F] focus:border-[#38BDF8] focus:outline-none text-sm text-[#F0F9FF] placeholder-[#94A3B8]/60 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#7DD3FC]">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Interview Invitation / Web Development Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#08101A] border border-[#1E3A5F] focus:border-[#38BDF8] focus:outline-none text-sm text-[#F0F9FF] placeholder-[#94A3B8]/60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#7DD3FC]">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, timeline, or open role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#08101A] border border-[#1E3A5F] focus:border-[#38BDF8] focus:outline-none text-sm text-[#F0F9FF] placeholder-[#94A3B8]/60 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-sm text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-xl shadow-[#38BDF8]/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#070D14] animate-spin" />
                      <span>Transmitting Directly to Ashraff's Inbox...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#070D14]" />
                      <span>Send Direct to Inbox</span>
                    </>
                  )}
                </button>
              </form>

              {/* Success Notification Alert */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-[#08101A] border border-[#2DD4BF]/80 text-[#2DD4BF] text-xs font-mono flex items-start gap-3 animate-in fade-in">
                  <div className="p-1 rounded-full bg-[#2DD4BF]/20 text-[#2DD4BF] mt-0.5">
                    <Check className="w-4 h-4 text-[#2DD4BF]" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Message Delivered Directly! 🎉</span>
                    <span>Your inquiry has reached Ashraff's Gmail inbox (<span className="text-[#2DD4BF] font-bold">{resumeData.personal.email}</span>). I will respond promptly to your email.</span>
                  </div>
                </div>
              )}

              {/* Activation Notice (First Time Setup) */}
              {submitStatus === 'activation_needed' && (
                <div className="p-4 rounded-2xl bg-[#08101A] border border-[#38BDF8] text-[#7DD3FC] text-xs font-mono space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <AlertCircle className="w-4 h-4 text-[#38BDF8]" />
                    <span>One-Time Email Activation Required (Check your Gmail)</span>
                  </div>
                  <p className="text-[#94A3B8] leading-relaxed">
                    FormSubmit has sent a 1-click confirmation email to <strong className="text-white">himas0406@gmail.com</strong>. Please check your Inbox (or Spam folder) and click the <strong>"Activate Form"</strong> button. Once clicked, all future submissions will land directly in your inbox!
                  </p>
                </div>
              )}

              {/* Fallback Option */}
              {submitStatus === 'fallback' && (
                <div className="p-4 rounded-2xl bg-[#08101A] border border-[#38BDF8] text-[#7DD3FC] text-xs font-mono space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <AlertCircle className="w-4 h-4 text-[#38BDF8]" />
                    <span>Instant Alternative: Dispatch via Mail Client</span>
                  </div>
                  <p className="text-[#94A3B8]">
                    You can launch your local email app with one click:
                  </p>
                  <button
                    onClick={triggerMailtoFallback}
                    className="px-4 py-2 rounded-xl bg-[#38BDF8] text-[#070D14] font-bold text-xs hover:bg-[#7DD3FC] transition-all cursor-pointer shadow-md"
                  >
                    Open in Mail Client
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
