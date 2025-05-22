// src/pages/Services.tsx
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

interface FormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  eventType: string;
  questionType: string;
  coordinatorInfo: string;
  eventDate: string;
  eventTime: string;
  eventDuration: string;
  eventAddress: string;
  numberOfGuests: string;
  referral: string;
  comments: string;
}

const initialFormData: FormData = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  eventType: '',
  questionType: '',
  coordinatorInfo: '',
  eventDate: '',
  eventTime: '',
  eventDuration: '',
  eventAddress: '',
  numberOfGuests: '',
  referral: '',
  comments: '',
};

const Services: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const notificationDuration = 3000;

  // Vite env var for Google Script ID
  const scriptId = import.meta.env.VITE_GOOGLE_SCRIPT_ID;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
      e: ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
  ) => {
    const { id, value } = e.target;
    setFormData((f) => ({ ...f, [id]: value }));
  };

  const isFormValid = () => {
    return (
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.eventType &&
        formData.eventDate &&
        formData.eventTime &&
        formData.eventDuration &&
        formData.eventAddress &&
        formData.numberOfGuests &&
        formData.referral
    );
  };

  const triggerNotification = (message: string, success: boolean) => {
    setNotificationMessage(message);
    setNotificationSuccess(success);
    setShowNotification(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      triggerNotification('Please fill in all required fields', false);
      return;
    }

    setLoading(true);
    fetch(
        `https://script.google.com/macros/s/${scriptId}/exec`,
        {
          method: 'POST',
          body: new URLSearchParams(Object.entries(formData)),
        }
    )
        .then((res) => res.text())
        .then(() => {
          setFormSubmitted(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          triggerNotification('Error submitting form', false);
        });
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setFormSubmitted(false);
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto py-[var(--space-lg)] px-[var(--space-md)] dark:bg-gray-900">
          {!formSubmitted && !loading ? (
              <>
                <div className="text-center mb-[var(--space-lg)]">
                  <h1 className="text-3xl font-bold mb-[var(--space-sm)] dark:text-white">
                    Event Information
                  </h1>
                  <h3 className="text-lg text-gray-700 dark:text-gray-300">
                    Fill out the form below & we&apos;ll contact you ASAP!
                  </h3>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={`
                bg-[var(--color-form-bg)]
                dark:bg-[var(--color-form-bg-dark)]
                rounded-[var(--radius-lg)]
                w-[600px] max-w-full
                mx-auto
                px-[var(--space-lg)] py-[var(--space-md)]
                space-y-[var(--space-md)]
              `}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-[var(--color-accent)]">*</span> Indicates required
                  </p>

                  {/* Name */}
                  <div>
                    <label
                        htmlFor="name"
                        className="font-medium mb-[var(--space-xs)] hSidden sm:block dark:text-gray-200 "
                    >
                      *Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="*Your name"
                        className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                  `}
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                        htmlFor="companyName"
                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                    >
                      Company Name (if applicable):
                    </label>
                    <input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company name"
                        className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                  `}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-md)]">
                    <div>
                      <label
                          htmlFor="email"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Email:
                      </label>
                      <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="*Email address"
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                    <div>
                      <label
                          htmlFor="phone"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Phone Number:
                      </label>
                      <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="*Phone number"
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                  </div>

                  {/* Event Type & Question Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-md)]">
                    <div>
                      <label
                          htmlFor="eventType"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Event Type:
                      </label>
                      <input
                          id="eventType"
                          type="text"
                          value={formData.eventType}
                          onChange={handleChange}
                          placeholder="*Event type (Birthday, Wedding, etc.)"
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                    <div>
                      <label
                          htmlFor="questionType"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        Question Type:
                      </label>
                      <select
                          id="questionType"
                          value={formData.questionType}
                          onChange={handleChange}
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      bg-white dark:bg-gray-800 dark:text-gray-200
                    `}
                      >
                        <option value="">Select question type</option>
                        <option value="pricing">Pricing Inquiry</option>
                        <option value="availability">Availability</option>
                        <option value="services">Services Offered</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Event Date & Event Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-md)]">
                    <div>
                      <label
                          htmlFor="eventDate"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Event Date:
                      </label>
                      <input
                          id="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                    <div>
                      <label
                          htmlFor="eventTime"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Event Time:
                      </label>
                      <input
                          id="eventTime"
                          type="time"
                          value={formData.eventTime}
                          onChange={handleChange}
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                  </div>

                  {/* Event Duration & Coordinator Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-md)]">
                    <div>
                      <label
                          htmlFor="eventDuration"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Event Duration:
                      </label>
                      <select
                          id="eventDuration"
                          value={formData.eventDuration}
                          onChange={handleChange}
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      bg-white dark:bg-gray-800 dark:text-gray-200
                    `}
                      >
                        <option value="">Select duration</option>
                        <option value="1-2 hours">1-2 hours</option>
                        <option value="2-4 hours">2-4 hours</option>
                        <option value="4-6 hours">4-6 hours</option>
                        <option value="6+ hours">6+ hours</option>
                        <option value="multi-day">Multi-day</option>
                      </select>
                    </div>
                    <div>
                      <label
                          htmlFor="coordinatorInfo"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        Coordinator Contact Info:
                      </label>
                      <input
                          id="coordinatorInfo"
                          type="text"
                          value={formData.coordinatorInfo}
                          onChange={handleChange}
                          placeholder="Coordinator name & phone"
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                  </div>

                  {/* Address & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-md)]">
                    <div>
                      <label
                          htmlFor="eventAddress"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Address of Event:
                      </label>
                      <input
                          id="eventAddress"
                          type="text"
                          value={formData.eventAddress}
                          onChange={handleChange}
                          placeholder="*Event venue address"
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                    <div>
                      <label
                          htmlFor="numberOfGuests"
                          className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                      >
                        *Number of Guests:
                      </label>
                      <input
                          id="numberOfGuests"
                          type="number"
                          value={formData.numberOfGuests}
                          onChange={handleChange}
                          placeholder="*Number of guests"
                          className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200
                    `}
                      />
                    </div>
                  </div>

                  {/* Referral */}
                  <div>
                    <label
                        htmlFor="referral"
                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                    >
                      *How did you hear about us?
                    </label>
                    <select
                        id="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    bg-white dark:bg-gray-800 dark:text-gray-200
                  `}
                    >
                      <option value="">Select how you heard about us</option>
                      <option value="google">Google Search</option>
                      <option value="social-media">Social Media</option>
                      <option value="word-of-mouth">Word of Mouth</option>
                      <option value="previous-client">Previous Client</option>
                      <option value="website">Our Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Comments */}
                  <div>
                    <label
                        htmlFor="comments"
                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                    >
                      Additional Comments:
                    </label>
                    <textarea
                        id="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Any additional details or special requests..."
                        rows={4}
                        className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    placeholder-transparent sm:placeholder-gray-500 dark:placeholder-gray-400
                    resize-vertical
                  `}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-[var(--space-md)]">
                    <button
                        type="submit"
                        className={`
                    w-full bg-[var(--color-primary)] text-white
                    hover:filter hover:brightness-75
                    transition-filter duration-200
                    font-medium
                    px-[var(--space-lg)] py-[var(--space-sm)]
                    rounded
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                        disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Event Information'}
                    </button>
                  </div>
                </form>
              </>
          ) : loading ? (
              <LoadingSpinner />
          ) : (
              <div className="text-center space-y-[var(--space-md)]">
                <h1 className="text-2xl font-bold dark:text-white">
                  Your form has been submitted!
                </h1>
                <button
                    onClick={handleResetForm}
                    className={`
                bg-[var(--color-primary)] text-white
                hover:filter hover:brightness-75
                transition-filter duration-200
                font-medium
                px-[var(--space-lg)] py-[var(--space-sm)]
                rounded
              `}
                >
                  Submit Another
                </button>
              </div>
          )}

          {showNotification && (
              <Notification
                  message={notificationMessage}
                  success={notificationSuccess}
                  timer={notificationDuration}
                  onComplete={() => setShowNotification(false)}
              />
          )}
        </div>
      </div>
  );
};

export default Services;