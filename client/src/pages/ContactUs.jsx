import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  User, 
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, subject, message } = formData;
    const whatsappMessage = `Name: ${name}%0ASubject: ${subject}%0AMessage: ${message}`;
    const phoneNumber = '919414173244';

    // Simulate form processing
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
      setFormData({ name: '', subject: '', message: '' });
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset success message
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Contact Us
            </h1>
            <p className="text-lg text-red-100 max-w-xl mx-auto">
              Need help finding the perfect laptop? We're here to assist you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Call Us Direct</h3>
            <p className="text-gray-600 text-sm mb-3">Speak with our experts</p>
            <a 
              href="tel:9414173244" 
              className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-1"
            >
              +91 94141 73244
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-3">24/7 email assistance</p>
            <a 
              href="mailto:maheshwaricmp@gmail.com" 
              className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-1 text-sm"
            >
              maheshwaricmp@gmail.com
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Don't know what to buy?</h3>
            <p className="text-gray-600 text-sm mb-3">Get instant expert advice</p>
            <a 
              href="https://wa.me/919414173244" 
              className="text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Send us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll redirect you to WhatsApp with your message pre-filled for instant communication.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white resize-none"
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitted}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent Successfully!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Preparing WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800 mb-1">
                      Why WhatsApp?
                    </p>
                    <p className="text-xs text-green-700">
                      Get instant responses, share images of laptops you're interested in, and have real-time conversations with our experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Visit Our Store</h3>
                </div>
                <p className="mt-2 text-red-100">See our laptops in person</p>
              </div>
              
              <div className="h-80">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.567201051375!2d73.87748927506791!3d25.056901477809235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c53c9a313f0f%3A0xefa9f478dfb788b1!2sIDBI%20Bank%20Kankroli!5e0!3m2!1sen!2sin!4v1717340142639!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Store Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Maheshwari Computer Services<br />
                      Gori Kunj, Below United India Insurance<br />
                      Opp IDBI Bank, Kankroli<br />
                      Rajsamand, Rajasthan 313324
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Why Choose Us?</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Quality guaranteed used laptops</li>
                    <li>• Expert technical support</li>
                    <li>• Competitive pricing</li>
                    <li>• Trusted local business</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;