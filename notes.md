# Notes — temporary

Detta är arbetsanteckningar inför Steg 5 (formell ADR i site-factory).
Flyttas dit när ADR:n skrivs.

## Authenticator

- Repo: visionmediahq/cms-authenticator (fork av inclusive-design/idrc-cms-authenticator)
- Production-deploy från `production`-branch
- Initial deploy: commit 9925332, tag v2026.6.0, 2026-06-05
- Coolify-app pekar mot production-branch, auto-deploy via Coolifys GitHub App

## OAuth App

- Namn: "Vision Media CMS"
- Ägare: visionmediahq-orgen
- Client ID: Ov23liwbSqfmOLu0HTqf
- Inställningar: github.com/organizations/visionmediahq/settings/applications
- Callback URL: https://auth.vmedia.se/callback
- Device Flow: AV

## Secrets

- OAUTH_CLIENT_SECRET: endast i Coolify (cms-authenticator app, env)
- OAUTH_CLIENT_ID: endast i Coolify (samma)
- Roteras manuellt — generera nytt secret i OAuth App-inställningarna,
  uppdatera env i Coolify, restarta app

## Allowed domains

- ALLOWED_DOMAINS=*.vmedia.se (en rad, täcker alla framtida sajter)
- CMS-admin alltid på {slug}.vmedia.se/admin, oavsett kundens publika domän

## Endpoints

- https://auth.vmedia.se/auth     — login start
- https://auth.vmedia.se/callback — GitHub OAuth callback
- https://auth.vmedia.se/         — 404 (medveten — ingen landing page)

## Att göra (kvarvarande steg)

- [ ] Steg 4: Dependabot på forken
- [ ] Steg 5: ADR i site-factory + base_url i astro-starter
- [ ] Steg 6: Kund-onboarding-rutin
- [ ] Steg 7: Uptime Kuma + GlitchTip för auth.vmedia.se
