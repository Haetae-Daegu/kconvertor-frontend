export type AnnouncementVariant = 'info' | 'warning' | 'success';

export interface Announcement {
  /**
   * Unique id. Dismissals are remembered per id, so change it for every new
   * announcement (e.g. "update-2026-12-01"), otherwise users who closed the
   * previous banner will never see the new one.
   */
  id: string;
  message: string;
  variant?: AnnouncementVariant;
  /** ISO 8601 date. The banner is hidden before this moment. */
  startsAt?: string;
  /** ISO 8601 date. The banner is hidden after this moment. */
  endsAt?: string;
  /**
   * ISO 8601 date of the update itself. If set, it is shown after the message,
   * formatted in the visitor's local timezone.
   */
  scheduledAt?: string;
  link?: {
    href: string;
    label: string;
  };
  /** Defaults to true. Set to false for critical notices that must stay visible. */
  dismissible?: boolean;
}
