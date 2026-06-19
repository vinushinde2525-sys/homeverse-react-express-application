// src/pages/PropertyDetailPage.jsx
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  MapPin, BedDouble, Bath, Square, Calendar, Heart, Scale,
  CheckCircle, ArrowLeft, Share2, Eye, Star, Phone, Mail
} from 'lucide-react';
import { useProperty } from '../hooks/useProperties';
import { useSubmitInquiry } from '../hooks/useProperties';
import { useForm } from 'react-hook-form';
import useStore from '../store/useStore';
import { formatPrice, getStatusClass } from '../utils';
import MortgageCalculator from '../components/property/MortgageCalculator';
import PropertyCardSkeleton from '../components/property/PropertyCardSkeleton';

const AGENT_MAP = {
  'agent-001': { name: 'William Seklo',   title: 'Senior Estate Agent',       avatar: '/assets/images/author.jpg', phone: '+1 (312) 555-0101', email: 'william@homeverse.com', rating: 4.9 },
  'agent-002': { name: 'Sarah Mitchell',  title: 'Luxury Property Specialist', avatar: '/assets/images/author.jpg', phone: '+1 (212) 555-0202', email: 'sarah@homeverse.com',   rating: 4.8 },
  'agent-003': { name: 'Marcus Johnson',  title: 'Commercial & Res. Expert',   avatar: '/assets/images/author.jpg', phone: '+1 (718) 555-0303', email: 'marcus@homeverse.com',  rating: 4.7 },
  'agent-004': { name: 'Elena Rodriguez', title: 'Relocation Specialist',      avatar: '/assets/images/author.jpg', phone: '+1 (312) 555-0404', email: 'elena@homeverse.com',   rating: 4.9 },
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading, isError } = useProperty(id);
  const { toggleFavorite, isFavorite, addRecentlyViewed } = useStore();
  const { mutate: submitInquiry, isPending } = useSubmitInquiry();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const favorited = property ? isFavorite(property.id) : false;
  const agent = property ? AGENT_MAP[property.agentId] : null;

  // Track recently viewed
  useEffect(() => {
    if (property) addRecentlyViewed(property);
  }, [property]);

  const onInquirySubmit = (data) => {
    submitInquiry({ ...data, propertyId: property.id, agentId: property.agentId });
    reset();
  };

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="skeleton rounded-2xl aspect-video" />
        </div>
        <div className="space-y-4">
          <PropertyCardSkeleton />
        </div>
      </div>
    </div>
  );

  if (isError || !property) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-lg">Property not found.</p>
      <button onClick={() => navigate('/properties')} className="btn-primary">Back to Listings</button>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen pb-20">
      {/* ── Breadcrumb ── */}
      <div className="bg-dark-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 text-sm">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-dark-600">·</span>
          <Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link>
          <span className="text-dark-600">·</span>
          <span className="text-white truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={getStatusClass(property.status)}>{property.status}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-300 rounded-full">{property.type}</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-dark-900 dark:text-white mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <MapPin size={15} className="text-primary-400" />
              <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <p className="font-heading font-extrabold text-3xl text-primary-500">
              {formatPrice(property.price, property.priceUnit)}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(property)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  favorited ? 'bg-red-100 text-red-500' : 'bg-gray-100 dark:bg-dark-700 text-gray-400 hover:bg-red-100 hover:text-red-400'
                }`}
              >
                <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />
              </button>
              <button className="w-9 h-9 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT: Main content ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Swiper */}
            <div className="rounded-2xl overflow-hidden shadow-card2">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
                className="aspect-video"
              >
                {property.images.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img src={src} alt={`${property.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Quick stats bar */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-dark-700">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: BedDouble, label: 'Bedrooms',   value: property.bedrooms > 0 ? property.bedrooms : 'Studio' },
                  { icon: Bath,      label: 'Bathrooms',  value: property.bathrooms },
                  { icon: Square,    label: 'Area (ft²)', value: property.area.toLocaleString() },
                  { icon: Calendar,  label: 'Year Built', value: property.yearBuilt },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="font-heading font-bold text-dark-900 dark:text-white text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-dark-700">
              <h2 className="font-heading font-bold text-xl text-dark-900 dark:text-white mb-4">About This Property</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features?.length > 0 && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-dark-700">
                <h2 className="font-heading font-bold text-xl text-dark-900 dark:text-white mb-4">Property Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle size={15} className="text-accent-green shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-dark-700">
              <h2 className="font-heading font-bold text-xl text-dark-900 dark:text-white mb-4">Location</h2>
              <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-700 aspect-video flex items-center justify-center">
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${property.location.lng},${property.location.lat},13,0/800x400?access_token=pk.placeholder`}
                  alt="Map"
                  className="w-full h-full object-cover opacity-0"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-dark-700">
                  <MapPin size={32} className="text-primary-400" />
                  <p className="font-semibold text-dark-900 dark:text-white text-sm">{property.location.address}, {property.location.city}</p>
                  <p className="text-xs text-gray-400">Interactive map — connect Mapbox API key to enable</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="space-y-6">
            {/* Agent card */}
            {agent && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-dark-700">
                <div className="flex items-center gap-4 mb-4">
                  <img src={agent.avatar} alt={agent.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-heading font-bold text-dark-900 dark:text-white">{agent.name}</p>
                    <p className="text-xs text-gray-400">{agent.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-dark-900 dark:text-white">{agent.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mb-4">
                  <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Phone size={14} /> Call
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Mail size={14} /> Email
                  </a>
                </div>

                {/* Inquiry form */}
                <form onSubmit={handleSubmit(onInquirySubmit)} className="space-y-3">
                  <input
                    {...register('name', { required: 'Name required' })}
                    placeholder="Your name"
                    className="form-input"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}

                  <input
                    {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                    placeholder="Your email"
                    className="form-input"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

                  <input
                    {...register('phone')}
                    placeholder="Your phone (optional)"
                    className="form-input"
                  />

                  <textarea
                    {...register('message', { required: 'Message required' })}
                    placeholder={`I'm interested in ${property.title}...`}
                    rows={4}
                    className="form-input resize-none"
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}

                  <button type="submit" disabled={isPending} className="btn-primary w-full justify-center">
                    {isPending ? 'Sending…' : 'Send Inquiry'}
                  </button>
                </form>
              </div>
            )}

            {/* Mortgage Calculator */}
            <MortgageCalculator defaultPrice={property.price} />

            {/* Property stats */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-dark-700">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Views</p>
                  <p className="font-heading font-bold text-dark-900 dark:text-white flex items-center justify-center gap-1">
                    <Eye size={13} className="text-primary-400" /> {property.views.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Rating</p>
                  <p className="font-heading font-bold text-dark-900 dark:text-white flex items-center justify-center gap-1">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" /> {property.rating}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Reviews</p>
                  <p className="font-heading font-bold text-dark-900 dark:text-white">{property.reviewCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
