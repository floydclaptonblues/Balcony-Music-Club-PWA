export type SourceId =
  | 'website-home'
  | 'website-shows'
  | 'website-host-event'
  | 'website-events-tickets'
  | 'website-store'
  | 'website-footer'
  | 'public-social-search'
  | 'site-owner-approval-2026-06-05'
  | 'generated-placeholder';

export type VenueInfo = {
  name: string;
  addressLine1: string;
  cityRegion: string;
  tagline: string;
  sourceIds: SourceId[];
  rooms: string[];
};

export type BookingInfo = {
  title: string;
  subtitle: string;
  spaces: string[];
  eventTypes: string[];
  privateEventsEmail: string;
  privateEventsPhone: string;
  paintAndSipPhone: string;
  sourceIds: SourceId[];
};

export type Band = {
  id: string;
  name: string;
  sourceIds: SourceId[];
};

export type ScheduleItem = {
  id: string;
  date: string;
  dayLabel: string;
  startTime: string;
  endTime: string;
  title: string;
  bandId?: string;
  sourceIds: SourceId[];
  archivedSourceOnly?: boolean;
  notes?: string;
};

export type SpecialEvent = {
  id: string;
  title: string;
  timing: string;
  description: string;
  prices?: string[];
  contactLabel?: string;
  contactHref?: string;
  sourceIds: SourceId[];
};

export type StoreLink = {
  id: string;
  title: string;
  artistCredit: string;
  priceLabel: string;
  href: string;
  sourceIds: SourceId[];
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  sourceIds: SourceId[];
};

export type AppConfig = {
  appName: string;
  repoName: string;
  publicUrl: string;
  qrReady: boolean;
  videoEnabled: false;
  realPushNotificationsEnabled: false;
};

export type SiteAsset = {
  id: string;
  label: string;
  intendedUse: string;
  sourcePage: string;
  localPath: string;
  status: 'approved-not-yet-imported' | 'imported' | 'placeholder';
  notes: string;
  sourceIds: SourceId[];
};
