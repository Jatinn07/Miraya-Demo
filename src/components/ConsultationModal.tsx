import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Sparkles, Phone } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Solitaire Engagement Rings',
    type: 'Bandra Flagship Atelier (Mumbai)',
    date: '2026-10-05',
    time: '3:00 PM',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white max-w-lg w-full rounded-[20px] shadow-2xl border border-[#E7FFE6] p-6 sm:p-8 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E7FFE6] text-[#75686A] hover:text-[#302326] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center mx-auto border border-[#E7FFE6] animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#302326]">
                Appointment Requested
              </h3>
              <p className="text-sm sm:text-sm text-[#75686A] max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name || 'Patron'}. Our Senior Gemological Concierge 
                will contact you shortly to confirm your private champagne salon viewing on {formData.date} at {formData.time}.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-sm tracking-[0.2em] font-semibold text-[#214E34] uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BESPOKE ATELIER SALON</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#302326]">
                  Schedule Private Viewing
                </h3>
                <p className="text-sm text-[#75686A]">
                  Experience our certified solitaires and rare cuts in a secluded private suite.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-[#302326] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Singhania"
                    className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3.5 py-2.5 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#302326] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3.5 py-2.5 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#302326] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@domain.com"
                      className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3.5 py-2.5 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#302326] mb-1">
                      Viewing Location
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3 py-2 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                    >
                      <option>Bandra Flagship Atelier (Mumbai)</option>
                      <option>Surat Diamond Atelier</option>
                      <option>Private Virtual Video Salon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#302326] mb-1">
                      Jewellery Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3 py-2 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                    >
                      <option>Solitaire Engagement Rings</option>
                      <option>High Jewellery Necklaces</option>
                      <option>Diamond Tennis Bracelets</option>
                      <option>Bespoke Custom Commission</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#302326] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3 py-2 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#302326] mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#FFFAFA] border border-[#E7FFE6] rounded-[10px] px-3 py-2 text-sm text-[#302326] focus:border-[#214E34] focus:outline-none"
                    >
                      <option>11:00 AM</option>
                      <option>1:00 PM</option>
                      <option>3:00 PM</option>
                      <option>5:00 PM</option>
                      <option>7:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer mt-2"
                >
                  Confirm Atelier Appointment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
