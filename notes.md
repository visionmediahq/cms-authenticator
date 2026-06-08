
## Secrets management

### Vad finns var

| Secret | Lagras i | Används till |
|---|---|---|
| OAUTH_CLIENT_ID | Coolify env (cms-authenticator-app) | Sänds till GitHub i auth-flödet |
| OAUTH_CLIENT_SECRET | Coolify env (cms-authenticator-app) | Byter code mot token i /callback |

### Vad som ALDRIG ska finnas

- I klient-repon (visionmediahq/hugofinspang, etc.)
- I site-factory-repot eller dess .env
- I lokala .env-filer på utvecklarmaskiner
- Committed i Git på något ställe

Klientsajterna känner endast till `base_url: https://auth.vmedia.se` — det räcker.
Authenticator-appen är enda platsen som behöver veta secret:en.

### Rotering av Client Secret

Procedure (när någon lämnar bolaget, vid misstänkt läcka, eller var 12:e månad):

1. github.com/organizations/visionmediahq/settings/applications → Vision Media CMS
2. "Generate a new client secret" → kopiera direkt (visas bara en gång)
3. Coolify → cms-authenticator-app → Environment Variables
4. Uppdatera OAUTH_CLIENT_SECRET → Save → Restart
5. Vänta ~30 sek tills appen är igång
6. Verifiera login på hugofinspang.vmedia.se/admin
7. På GitHub OAuth App: ta bort den gamla secret:en (Active → Delete)

### Dependabot

Aktiverat på visionmediahq/cms-authenticator (.github/dependabot.yml).

Hanterar:
- npm dependencies (veckovis, måndag)
- Docker base image (veckovis, måndag)
- GitHub Actions (månadsvis)

Plus säkerhetsuppdateringar (omedelbart vid CVE) via Dependabot security updates.

PR:er går till `main`-branchen, INTE `production`.

För att rulla ut till produktion:
1. Merga Dependabot-PR till main
2. Verifiera att Coolify INTE auto-deployar (production-branchen rörs inte)
3. Lokalt: git checkout production && git merge main
4. Granska diff — finns något brytande?
5. git push origin production → Coolify auto-deployar
6. Verifiera login fortfarande funkar
7. Uppdatera DEPLOYMENT.md med ny commit + datum

## Dependency policy decisions

### Node.js base image

Pin to active LTS only. Currently node:24.x-alpine.

- Major bumps (e.g. 24 → 26) blocked in dependabot.yml via `ignore` rule
- Reasoning: Node 26 entered Current in 2026-04; LTS in 2026-10
- A SPOF auth service should not run non-LTS Node
- Revisit when Node 28 enters Active LTS (April 2027), or sooner if security
  requires bumping out of 24.x line

History:
- 2026-06-05: Dependabot PR #1 (node 24→26) declined, ignore rule added
