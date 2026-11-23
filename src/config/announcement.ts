import type { Announcement } from '@/types/announcement';

/**
 * Site-wide announcement banner.
 *
 * To announce an update:
 *   1. Fill in the object below (use a new `id`).
 *   2. Set `startsAt` / `endsAt` so it appears and disappears on its own.
 *   3. Merge to `main`, Vercel deploys and the banner goes live at `startsAt`.
 *
 * To turn the banner off, set this to `null`.
 * See docs/RUNBOOK.md, section "Announcement banner".
 */
export const ANNOUNCEMENT: Announcement | null = null;

// Example (copy it in place of `null` above):
//
// export const ANNOUNCEMENT: Announcement | null = {
//   // Required. Must be NEW for each announcement: users who closed a banner
//   // with this id will never see it again.
//   id: 'update-2026-12-01',
//
//   // Required. The text shown in the banner.
//   message: 'A platform update is coming. The site may be unavailable for about 30 minutes',
//
//   // Optional. Banner color: 'info' (blue, default) | 'warning' (amber) | 'success' (green).
//   variant: 'warning',
//
//   // Optional. Date of the update itself, appended to the message as
//   // "on December 1st, 2026, 2:00 AM" in the visitor's timezone.
//   scheduledAt: '2026-12-01T02:00:00+09:00',
//
//   // Optional. The banner only shows between these two dates.
//   // Without them, it shows as soon as it is deployed and until it is removed.
//   startsAt: '2026-11-24T00:00:00+09:00',
//   endsAt: '2026-12-01T03:00:00+09:00',
//
//   // Optional. A link displayed after the message.
//   link: { href: '/accommodations', label: 'Learn more' },
//
//   // Optional, true by default. false = no close button (critical notices only).
//   dismissible: true,
// };
