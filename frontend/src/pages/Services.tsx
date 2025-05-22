// src/pages/Services.tsx
import React, {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';
import { useTranslation } from '../i18n/useTranslation';
import ScrollToTopButton from "../components/ScrollToTopButton";
import { scrollToTop } from "../utils/scrollToTop";

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
    const t = useTranslation;
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
            triggerNotification(t('requiredFieldsError'), false);
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
                triggerNotification(t('submitError'), false);
            });
    };

    const handleResetForm = () => {
        setFormData(initialFormData);
        setFormSubmitted(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-25">
            <div className="max-w-3xl mx-auto py-[var(--space-lg)] px-[var(--space-md)] dark:bg-gray-900">
                {!formSubmitted && !loading ? (
                    <>
                        <div className="text-center mb-[var(--space-lg)]">
                            <h1 className="text-3xl font-bold mb-[var(--space-sm)] dark:text-white">
                                {t("pageTitle")}
                            </h1>
                            <h3 className="text-lg text-gray-700 dark:text-gray-300">
                                {t("pageSubtitle")}
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
                                <span className="text-[var(--color-accent)]">*</span> {t('indicatesRequired')}
                            </p>

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                >
                                    {t('nameLabel')}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('namePlaceholder')}
                                    className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    placeholder-gray-500 dark:placeholder-gray-400 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                  `}
                                />
                            </div>

                            {/* Company Name */}
                            <div>
                                <label
                                    htmlFor="companyName"
                                    className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                >
                                    {t('companyNameLabel')}
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder={t('companyNamePlaceholder')}
                                    className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    placeholder-gray-500 dark:placeholder-gray-400 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
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
                                        {t('emailLabel')}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('emailPlaceholder')}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                    `}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                    >
                                        {t('phoneLabel')}
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={t('phonePlaceholder')}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
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
                                        {t('eventTypeLabel')}
                                    </label>
                                    <input
                                        id="eventType"
                                        type="text"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        placeholder={t('eventTypePlaceholder')}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                    `}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="questionType"
                                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                    >
                                        {t('questionTypeLabel')}
                                    </label>
                                    <select
                                        id="questionType"
                                        value={formData.questionType}
                                        onChange={handleChange}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                    `}
                                    >
                                        <option value="">{t('selectQuestionType')}</option>
                                        <option value="pricing">{t('pricingInquiry')}</option>
                                        <option value="availability">{t('availability')}</option>
                                        <option value="services">{t('servicesOffered')}</option>
                                        <option value="other">{t('other')}</option>
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
                                        {t('eventDateLabel')}
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
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                    `}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="eventTime"
                                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                    >
                                        {t('eventTimeLabel')}
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
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
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
                                        {t('eventDurationLabel')}
                                    </label>
                                    <select
                                        id="eventDuration"
                                        value={formData.eventDuration}
                                        onChange={handleChange}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                    `}
                                    >
                                        <option value="">{t('selectDuration')}</option>
                                        <option value="1-2 hours">{t('duration1to2')}</option>
                                        <option value="2-4 hours">{t('duration2to4')}</option>
                                        <option value="4-6 hours">{t('duration4to6')}</option>
                                        <option value="6+ hours">{t('duration6plus')}</option>
                                        <option value="multi-day">{t('durationMultiDay')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="coordinatorInfo"
                                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                    >
                                        {t('coordinatorLabel')}
                                    </label>
                                    <input
                                        id="coordinatorInfo"
                                        type="text"
                                        value={formData.coordinatorInfo}
                                        onChange={handleChange}
                                        placeholder={t('coordinatorPlaceholder')}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
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
                                        {t('eventAddressLabel')}
                                    </label>
                                    <input
                                        id="eventAddress"
                                        type="text"
                                        value={formData.eventAddress}
                                        onChange={handleChange}
                                        placeholder={t('eventAddressPlaceholder')}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                    `}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="numberOfGuests"
                                        className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                    >
                                        {t('numberOfGuestsLabel')}
                                    </label>
                                    <input
                                        id="numberOfGuests"
                                        type="number"
                                        value={formData.numberOfGuests}
                                        onChange={handleChange}
                                        placeholder={t('numberOfGuestsPlaceholder')}
                                        className={`
                      w-full border border-gray-300 dark:border-gray-600
                      rounded px-[var(--space-sm)] py-[var(--space-xs)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      placeholder-gray-500 dark:placeholder-gray-400 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
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
                                    {t('referralLabel')}
                                </label>
                                <select
                                    id="referral"
                                    value={formData.referral}
                                    onChange={handleChange}
                                    className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                  `}
                                >
                                    <option value="">{t('selectReferral')}</option>
                                    <option value="google">{t('googleSearch')}</option>
                                    <option value="social-media">{t('socialMedia')}</option>
                                    <option value="word-of-mouth">{t('wordOfMouth')}</option>
                                    <option value="previous-client">{t('previousClient')}</option>
                                    <option value="website">{t('ourWebsite')}</option>
                                    <option value="other">{t('other')}</option>
                                </select>
                            </div>

                            {/* Comments */}
                            <div>
                                <label
                                    htmlFor="comments"
                                    className="block font-medium mb-[var(--space-xs)] hidden sm:block dark:text-gray-200"
                                >
                                    {t('commentsLabel')}
                                </label>
                                <textarea
                                    id="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder={t('commentsPlaceholder')}
                                    rows={4}
                                    className={`
                    w-full border border-gray-300 dark:border-gray-600
                    rounded px-[var(--space-sm)] py-[var(--space-xs)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                    placeholder-gray-500 dark:placeholder-gray-400
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
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
                                    {loading ? t('submitting') : t('submitButton')}
                                </button>
                            </div>
                        </form>
                    </>
                ) : loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="text-center space-y-[var(--space-md)]">
                        <h1 className="text-2xl font-bold dark:text-white">
                            {t('formSubmittedMessage')}
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
                            {t('submitAnother')}
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
            <ScrollToTopButton onClick={scrollToTop} />
        </div>
    );
};

export default Services;