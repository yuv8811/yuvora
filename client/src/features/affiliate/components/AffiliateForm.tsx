import React, { useState } from 'react';
import { Button } from '@components/Button/Button';
import './AffiliateForm.css';

interface FormData {
  fullName: string;
  email: string;
  websiteUrl: string;
  partnerType: string;
  referralVolume: string;
  promotionStrategy: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  websiteUrl?: string;
  referralVolume?: string;
}

export const AffiliateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    websiteUrl: '',
    partnerType: 'agency',
    referralVolume: '1-5',
    promotionStrategy: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ message: string; applicationId: string } | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid work email address';
    }

    if (!formData.websiteUrl.trim() || formData.websiteUrl.trim().length < 3) {
      errs.websiteUrl = 'Please provide your agency website or profile URL';
    }

    if (!formData.referralVolume) {
      errs.referralVolume = 'Please select your estimated monthly merchant volume';
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
      const response = await fetch('/api/affiliate/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit affiliate application');
      }

      setSuccessInfo({
        message: data.message,
        applicationId: data.applicationId,
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        websiteUrl: '',
        partnerType: 'agency',
        referralVolume: '1-5',
        promotionStrategy: '',
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
      <div className="affiliate-form-card">
        <div className="affiliate-form-alert-success">
          <h4>Partner Application Received!</h4>
          <p>{successInfo.message}</p>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            <strong>Application Reference ID:</strong> <span style={{ fontFamily: 'var(--font-family-mono)' }}>{successInfo.applicationId}</span>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setSuccessInfo(null)}
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="affiliate-form-card">
      <h3 className="affiliate-form-title">Join the Yuvora Partner &amp; Affiliate Network</h3>
      <p className="affiliate-form-subtitle">
        Apply today to unlock up to 30% lifetime recurring commissions, free dev store testing licenses, and dedicated co-marketing resources.
      </p>

      {serverError && <div className="affiliate-form-alert-error">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="affiliate-form-grid affiliate-form-grid-2">
          {/* Full Name */}
          <div className="affiliate-form-group">
            <label htmlFor="affiliate-name" className="affiliate-form-label">
              Full Name <span className="affiliate-form-required">*</span>
            </label>
            <input
              id="affiliate-name"
              name="fullName"
              type="text"
              placeholder="e.g. Taylor Reed"
              className={`affiliate-form-input ${errors.fullName ? 'has-error' : ''}`}
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.fullName && <span className="affiliate-form-error">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="affiliate-form-group">
            <label htmlFor="affiliate-email" className="affiliate-form-label">
              Work Email <span className="affiliate-form-required">*</span>
            </label>
            <input
              id="affiliate-email"
              name="email"
              type="email"
              placeholder="taylor@agency.com"
              className={`affiliate-form-input ${errors.email ? 'has-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.email && <span className="affiliate-form-error">{errors.email}</span>}
          </div>
        </div>

        <div className="affiliate-form-grid affiliate-form-grid-2" style={{ marginTop: 'var(--space-4)' }}>
          {/* Website / Portfolio */}
          <div className="affiliate-form-group">
            <label htmlFor="affiliate-website" className="affiliate-form-label">
              Website or Portfolio URL <span className="affiliate-form-required">*</span>
            </label>
            <input
              id="affiliate-website"
              name="websiteUrl"
              type="text"
              placeholder="https://youragency.com"
              className={`affiliate-form-input ${errors.websiteUrl ? 'has-error' : ''}`}
              value={formData.websiteUrl}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.websiteUrl && <span className="affiliate-form-error">{errors.websiteUrl}</span>}
          </div>

          {/* Partner Type */}
          <div className="affiliate-form-group">
            <label htmlFor="affiliate-type" className="affiliate-form-label">
              Partner Business Model
            </label>
            <select
              id="affiliate-type"
              name="partnerType"
              className="affiliate-form-select"
              value={formData.partnerType}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="agency">Shopify Plus / Design Agency</option>
              <option value="consultant">E-commerce Consultant / Freelancer</option>
              <option value="creator">Content Creator / Course Instructor</option>
              <option value="tech_partner">Shopify App / Tech Ecosystem Partner</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Estimated Referral Volume */}
        <div className="affiliate-form-group" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="affiliate-volume" className="affiliate-form-label">
            Estimated Monthly Merchant Referrals <span className="affiliate-form-required">*</span>
          </label>
          <select
            id="affiliate-volume"
            name="referralVolume"
            className="affiliate-form-select"
            value={formData.referralVolume}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="1-5">1 – 5 merchants / month (Bronze Tier - 15%)</option>
            <option value="6-15">6 – 15 merchants / month (Silver Tier - 20%)</option>
            <option value="16-30">16 – 30 merchants / month (Gold Tier - 25%)</option>
            <option value="30+">30+ merchants / month (Platinum Plus - 30% &amp; Co-Sell)</option>
          </select>
        </div>

        {/* Strategy / Note */}
        <div className="affiliate-form-group" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="affiliate-strategy" className="affiliate-form-label">
            How do you plan to recommend Yuvora apps? <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea
            id="affiliate-strategy"
            name="promotionStrategy"
            placeholder="Tell us about your audience, client stack, or upcoming client store launches..."
            className="affiliate-form-textarea"
            value={formData.promotionStrategy}
            onChange={handleChange}
            disabled={loading}
            rows={4}
          />
        </div>

        <div className="affiliate-form-actions">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Submitting Application...' : 'Submit Partner Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};
