'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Gamepad, Heart, Utensils, User, LayoutDashboard, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Navbar: React.FC = () => {
  const {data : session} = useSession();

  console.log(session)
  return (
    <motion.nav
      className="bg-white/90 backdrop-blur-md border-b border-gray-100 p-3 fixed w-full top-0 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Mindful Kids
        </motion.div>
        <div className="flex items-center space-x-8">
         {session && <motion.a
            whileHover={{ 
              scale: 1.05,
              color: '#7C3AED',
            }}
            href="/dashboard"
            className="text-gray-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-violet-50 transition-all"
            aria-label="Dashboard"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </motion.a> }
         {session && <motion.a
            whileHover={{ 
              scale: 1.05,
              color: '#7C3AED',
            }}
            href="/account"
            className="text-gray-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-violet-50 transition-all"
            aria-label="Account"
          >
            <User className="w-4 h-4" />
            <span>Account</span>
          </motion.a>}
          {!session && <motion.a
            whileHover={{ scale: 1.05 }}
            href="/sign-in"
            className="flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors shadow-lg hover:shadow-xl"
            aria-label="Sign In"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </motion.a>}
        </div>
      </div>
    </motion.nav>
  );
};

const TopBanner: React.FC = () => {
  return (
    <motion.div
      className="bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 min-h-screen flex flex-col justify-center items-center text-white text-center px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div 
        className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-20 bg-cover bg-center"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 max-w-4xl"
      >
        <motion.h1 
          className="text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-purple-100 to-white text-transparent bg-clip-text"
          animate={{ 
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Mindful Kids
        </motion.h1>
        <p className="text-2xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Empowering children with mindful practices for a balanced and healthy future
        </p>
        <motion.button
          className="mt-8 px-10 py-4 bg-white text-violet-600 rounded-full font-semibold hover:bg-violet-50 transition-colors shadow-xl hover:shadow-2xl"
          whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link href="/api/sign-up">Get Started</Link> 
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const features = [
  { 
    icon: <Bed className="w-10 h-10 text-violet-600" />, 
    title: 'Better Sleep', 
    description: 'Guided techniques to improve sleep quality and establish healthy bedtime routines.' 
  },
  { 
    icon: <Gamepad className="w-10 h-10 text-violet-600" />, 
    title: 'Mindful Play', 
    description: 'Interactive games and activities that foster mindfulness and emotional well-being.' 
  },
  { 
    icon: <Heart className="w-10 h-10 text-violet-600" />, 
    title: 'Healthy Habits', 
    description: 'Build positive routines that support mental and physical development.' 
  },
  { 
    icon: <Utensils className="w-10 h-10 text-violet-600" />, 
    title: 'Balanced Nutrition', 
    description: 'Fun and educational approach to understanding the importance of healthy eating.' 
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="bg-violet-100 w-20 h-20 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:rotate-6">
        {feature.icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <motion.div
      id="features"
      className="py-32 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            Our Features
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Discover how we help children develop mindfulness through engaging activities
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const testimonials = [
  { 
    name: 'John Doe',
    role: 'Parent of two',
    feedback: 'Mindful Kids has transformed our daily routine. My children are more focused, calm, and happy than ever before.' 
  },
  { 
    name: 'Jane Smith',
    role: 'Mother',
    feedback: 'The mindfulness techniques have significantly improved my child sleep and overall well-being. It has been a game-changer!' 
  },
  { 
    name: 'Robert Williams',
    role: 'Father',
    feedback: 'An incredible platform that makes developing healthy habits fun and engaging. My kids look forward to their daily mindfulness practice.' 
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">"{testimonial.feedback}"</p>
      <div className="border-t pt-4">
        <h4 className="text-xl font-semibold text-gray-800">{testimonial.name}</h4>
        <p className="text-violet-600 font-medium">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <motion.div
      id="testimonials"
      className="py-32 bg-gradient-to-b from-white to-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            What Parents Are Saying
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Read about the positive impact Mindful Kids has had on families worldwide
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const page: React.FC = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main className="overflow-hidden">
        <TopBanner />
        <FeatureSection />
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default page;