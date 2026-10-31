/**
 * AROVIA HEALTHCARE — SOCIAL MEDIA CHANNELS CONFIGURATION
 *
 * Centralized, verifiable configuration for official Arovia social channels.
 *
 * POLICY & COMPLIANCE:
 * - Real profiles: Insert verified URLs below when officially published.
 * - Missing profiles: When `url: null` or empty, the platform button displays a
 *   distinct 'Coming Soon' badge and prevents navigating to broken or invented links.
 * - Modifying a channel: Update the `url` property below; all pages and panels
 *   will automatically reflect the change without touching HTML markup.
 */

window.AROVIA_SOCIAL_CONFIG = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    handle: '@arovia_homecare',
    meta: 'Health tips & service updates',
    // Insert verified URL here, e.g. 'https://www.instagram.com/aroviahealthcare'
    url: 'https://www.instagram.com/arovia_homecare?utm_source=qr&obrf=cGlpanF5ZW5kMGM0',
    statusText: 'Official Profile',
    comingSoonMessage: null
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    handle: '@arovia_homecareservices',
    meta: 'Care guides & patient education',
    // Insert verified URL here, e.g. 'https://www.youtube.com/@AroviaHealthcare'
    url: 'https://youtube.com/@arovia_homecareservices?si=G9FTV7dmVCOyWMSB',
    statusText: 'Official Channel',
    comingSoonMessage: null
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Arovia Healthcare Services',
    meta: 'Community news & care announcements',
    // Insert verified URL here, e.g. 'https://www.facebook.com/aroviahealthcare'
    url: 'https://www.facebook.com/profile.php?id=61596182516516',
    statusText: 'Official Page',
    comingSoonMessage: null
  }
};
