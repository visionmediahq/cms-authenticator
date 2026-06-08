// Sentry/GlitchTip instrumentation.
// Måste importeras INNAN andra moduler för att kunna instrumenta dem.
// Aktiveras endast om GLITCHTIP_DSN är satt i miljön.

import * as Sentry from '@sentry/node';

if (process.env.GLITCHTIP_DSN) {
  Sentry.init({
    dsn: process.env.GLITCHTIP_DSN,
    // 'environment' visas i GlitchTip UI och hjälper filtrera mellan
    // staging/production om vi någonsin kör flera instanser.
    environment: process.env.NODE_ENV || 'production',
    // Lägre tracesSampleRate räcker — authenticatorn har låg trafik
    // och vi bryr oss primärt om fel, inte performance.
    tracesSampleRate: 0.0,
    // Inkludera version-info för enklare debugging när releaser rullar ut.
    release: process.env.APP_VERSION || undefined,
  });
} else {
  console.log('GLITCHTIP_DSN not set — error reporting disabled.');
}

export default Sentry;
