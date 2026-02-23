/**
 * Utility functions to detect if the website is running inside a mobile app
 * or as a standalone PWA vs regular web browser
 */

/**
 * Check if running inside GoodBarber mobile app
 */
export function isGoodBarberApp(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Check for GoodBarber user agent
  if (userAgent.includes('goodbarber')) return true;
  
  // Check for custom headers from GoodBarber
  if (document.referrer.includes('goodbarber')) return true;
  
  // Check for iOS standalone mode (when added to home screen from GoodBarber)
  if ((window.navigator as any).standalone === true) return true;
  
  return false;
}

/**
 * Check if running as Progressive Web App (installed from browser)
 */
export function isPWA(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check display mode
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  
  // Check iOS standalone
  if ((window.navigator as any).standalone === true) return true;
  
  return false;
}

/**
 * Check if running on mobile device (any mobile browser or app)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

/**
 * Check if running on iOS device
 */
export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  return /iphone|ipad|ipod/.test(userAgent);
}

/**
 * Check if running on Android device
 */
export function isAndroidDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  return /android/.test(userAgent);
}

/**
 * Get the platform type (for analytics or conditional rendering)
 */
export function getPlatform(): 'goodbarber' | 'pwa' | 'ios' | 'android' | 'web' {
  if (isGoodBarberApp()) return 'goodbarber';
  if (isPWA()) return 'pwa';
  if (isIOSDevice()) return 'ios';
  if (isAndroidDevice()) return 'android';
  return 'web';
}

/**
 * Check if the app should hide the navbar
 * (hide in GoodBarber app or PWA, show in regular browser)
 */
export function shouldHideNavbar(): boolean {
  return isGoodBarberApp() || isPWA();
}

/**
 * Check if the app should hide the footer
 */
export function shouldHideFooter(): boolean {
  return isGoodBarberApp() || isPWA();
}

/**
 * Get safe area insets for devices with notches
 */
export function getSafeAreaInsets() {
  if (typeof window === 'undefined') return { top: 0, bottom: 0, left: 0, right: 0 };
  
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
  };
}

