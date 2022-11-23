// utils/extractTrackingCookie.ts

/**
 * Extracts the tracking cookie from the Bloomreach cookie pixel
 * @remarks Designed to check for the cookie,and if not present will set a default
 * @returns {string}
 */
export function extractTrackingCookie(): string {
  const trackingCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('_br_uid_2='));
  return trackingCookie ? trackingCookie.replace('_br_uid_2=', '') : 'uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55';
};
