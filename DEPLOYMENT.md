# Deployment

## Production

This fork is deployed to https://auth.vmedia.se via Coolify.

Coolify deploys from the `production` branch. The `production` branch is
manually advanced — it does not auto-merge from `main`. To roll out a new
version, run `git merge main && git push origin production` after reviewing
upstream changes.

## Version history

| Date       | Commit  | Tag       | Notes                        |
|------------|---------|-----------|------------------------------|
| 2026-06-05 | 9925332 | v2026.6.0 | Initial production deploy    |
| 2026-06-08 | <merge-hash> | —         | Add Sentry/GlitchTip error reporting (step 7) |
| 2026-06-08 | <merge-hash> | —         | Remove Sentry verification endpoint           |
