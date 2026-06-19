// src/pages/ContactPage.jsx
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useSubmitInquiry } from '../hooks/useProperties';

const CONTACT_INFO = [
  { icon: MapPin, title: 'Our Office',      value: '15/A, Nest Tower, Brooklyn, New York' },
  { icon: Phone,  title: 'Phone Number',    value: '+0123-456789' },
  { icon: Mail,   title: 'Email Address',   value: 'contact@homeverse.com' },
  { icon: Clock,  title: 'Working Hours',   value: 'Mon–Sat: 9AM – 6PM' },
];

export default function ContactPage() {
  const { mutate: submitInquiry, isPending } = useSubmitInquiry();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    submitInquiry(data, { onSuccess: () => reset() });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="section-badge">Get In Touch</span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-2">Contact Us</h1>
          <p className="text-gray-400 mt-3 text-sm max-w-xl">
            Have a question or ready to start your property journey? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Contact info ── */}
          <div className="space-y-4">
            {CONTACT_INFO.map(({ icon: Icon, title, value }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-dark-700 flex items-start gap-4"
              >
                <div className="w-11 h-11 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{title}</p>
                  <p className="font-semibold text-dark-900 dark:text-white text-sm">{value}</p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-card border border-gray-100 dark:border-dark-700">
              <div className="bg-gray-100 dark:bg-dark-700 aspect-video flex flex-col items-center justify-center gap-2">
                <MapPin size={32} className="text-primary-400" />
                <p className="text-sm font-semibold text-dark-900 dark:text-white">Brooklyn, New York</p>
                <p className="text-xs text-gray-400">Interactive map coming soon</p>
              </div>
            </div>
          </div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-card border border-gray-100 dark:border-dark-700"
          >
            <h2 className="font-heading font-bold text-2xl text-dark-900 dark:text-white mb-2">Send Us a Message</h2>
            <p className="text-sm text-gray-400 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="John Doe"
                    className="form-input"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Email Address *</label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
                    placeholder="john@example.com"
                    className="form-input"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Phone Number</label>
                <input
                  {...register('phone')}
                  placeholder="+1 (555) 000-0000"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Subject</label>
                <select {...register('subject')} className="form-select">
                  <option>General Inquiry</option>
                  <option>Property Listing</option>
                  <option>Agent Contact</option>
                  <option>Investment Advice</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  className="form-input resize-none"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>

              <button type="submit" disabled={isPending} className="btn-primary w-full justify-center py-4 text-base">
                {isPending ? 'Sending…' : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
