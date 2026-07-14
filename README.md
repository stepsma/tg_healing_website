# TG Healing Website

React + TypeScript + Vite version of the TG Healing static website.

## Commands

```bash
pnpm install
pnpm run dev
pnpm run build
```

If you prefer npm, use `npm install`, `npm run dev`, and `npm run build`.

Pages included:

- Home
- Services
- Contact

## Cloudflare Pages deployment

Use Cloudflare Pages for this project.

- Build command: `npm run build`
- Build output directory: `dist`
- Functions directory: `functions`

Set these environment variables in Cloudflare Pages:

- `RESEND_API_KEY`: your Resend API key
- `BOOKING_TO_EMAIL`: `dandi525@hotmail.com`
- `BOOKING_CC_EMAIL`: `stepsma@hotmail.com`
- `BOOKING_FROM_EMAIL`: a Resend verified sender, for example `TG Healing <booking@tghealingaroma.com>`

After deployment, add the custom domain:

- `tghealingaroma.com`
- optional: `www.tghealingaroma.com`
