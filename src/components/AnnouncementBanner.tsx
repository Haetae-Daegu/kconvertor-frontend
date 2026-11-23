import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ANNOUNCEMENT } from '@/config/announcement';
import type { Announcement, AnnouncementVariant } from '@/types/announcement';

const STORAGE_PREFIX = 'announcement-dismissed:';

const VARIANT_CLASSES: Record<AnnouncementVariant, string> = {
  info: 'bg-blue-600 text-white',
  warning: 'bg-amber-400 text-gray-900',
  success: 'bg-green-600 text-white',
};

const isWithinWindow = (announcement: Announcement, now: Date): boolean => {
  if (announcement.startsAt && now < new Date(announcement.startsAt)) return false;
  if (announcement.endsAt && now > new Date(announcement.endsAt)) return false;
  return true;
};

const isDismissed = (id: string): boolean => {
  try {
    return localStorage.getItem(STORAGE_PREFIX + id) === '1';
  } catch {
    return false;
  }
};

interface AnnouncementBannerProps {
  announcement?: Announcement | null;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ announcement = ANNOUNCEMENT }) => {
  // Visibility depends on the current time and localStorage, which only exist
  // in the browser, so start hidden and decide after mount to avoid a
  // server/client hydration mismatch.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;
    const dismissible = announcement.dismissible !== false;
    setVisible(
      isWithinWindow(announcement, new Date()) && !(dismissible && isDismissed(announcement.id)),
    );
  }, [announcement]);

  if (!announcement || !visible) return null;

  const { id, message, variant = 'info', scheduledAt, link, dismissible = true } = announcement;

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_PREFIX + id, '1');
    } catch {
      // Storage unavailable (private mode, blocked): hide for this page view only.
    }
    setVisible(false);
  };

  return (
    <div role="status" aria-live="polite" className={VARIANT_CLASSES[variant]}>
      <div className="relative mx-auto max-w-screen-xl px-4 lg:px-6 py-2.5 pr-12 text-sm text-center">
        <span className="font-medium">{message}</span>
        {scheduledAt && (
          <span>
            {' '}on <time dateTime={scheduledAt}>{format(new Date(scheduledAt), 'PPP, p')}</time>
          </span>
        )}
        {link && (
          <>
            {' '}
            <Link href={link.href} className="underline font-semibold hover:opacity-80">
              {link.label}
            </Link>
          </>
        )}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
