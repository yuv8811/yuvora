import React, { useState } from 'react';
import { Button } from '@components/Button/Button';
import './ContactForm.css';

interface FormData {
  name: string;
  email: string;
  shopifyStore: string;
  topic: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    shopifyStore: '',
    topic: 'general',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ message: string; ticketId: string } | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (minimum 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Please enter a subject (minimum 3 characters)';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please describe your request (minimum 10 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit contact message');
      }

      setSuccessInfo({
        message: data.message,
        ticketId: data.ticketId,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        shopifyStore: '',
        topic: 'general',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (successInfo) {
    return (
      <div className="form-card">
        <div className="form-alert-success">
          <h4>Message Received!</h4>
          <p>{successInfo.message}</p>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            <strong>Reference Ticket ID:</strong> <span style={{ fontFamily: 'var(--font-family-mono)' }}>{successInfo.ticketId}</span>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setSuccessInfo(null)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Send Us a Direct Message</h2>
      <p className="form-subtitle">
        Fill out the details below and our technical support &amp; partnerships team will respond promptly.
      </p>

      {serverError && <div className="form-alert-error">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid form-grid-2">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">
              Full Name <span className="form-required">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">
              Work Email <span className="form-required">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="alex@brand.com"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-grid form-grid-2" style={{ marginTop: 'var(--space-4)' }}>
          {/* Shopify Store */}
          <div className="form-group">
            <label htmlFor="contact-store" className="form-label">
              Shopify Store Domain <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>(Optional)</span>
            </label>
            <input
              id="contact-store"
              name="shopifyStore"
              type="text"
              placeholder="brand.myshopify.com"
              className="form-input"
              value={formData.shopifyStore}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Topic */}
          <div className="form-group">
            <label htmlFor="contact-topic" className="form-label">
              Inquiry Topic
            </label>
            <select
              id="contact-topic"
              name="topic"
              className="form-select"
              value={formData.topic}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="general">General Inquiry</option>
              <option value="technical_support">Merchant Technical Support</option>
              <option value="partnership">Agency &amp; Affiliate Partnerships</option>
              <option value="feature_request">App Feature Request</option>
              <option value="billing">Billing &amp; Schemes</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="contact-subject" className="form-label">
            Subject <span className="form-required">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="How can we help your store?"
            className={`form-input ${errors.subject ? 'has-error' : ''}`}
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.subject && <span className="form-error">{errors.subject}</span>}
        </div>

        {/* Message */}
        <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="contact-message" className="form-label">
            Message <span className="form-required">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Please describe your question, app feedback, or partnership request..."
            className={`form-textarea ${errors.message ? 'has-error' : ''}`}
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            rows={5}
            required
          />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Sending Message...' : 'Submit Contact Request'}
          </Button>
        </div>
      </form>
    </div>
  );
};

