# Portfolio

Personal portfolio site. Next.js (App Router) with Tailwind CSS.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000.

## Edit the content

All text, links and placeholders are in `lib/content.ts`. Search it for `TODO`.

- Links left as `""` (GitHub, LinkedIn, résumé, email) stay hidden until filled in.
- For a résumé, drop `resume.pdf` into `public/` and set `resume: "/resume.pdf"`.
- The headshot is `public/headshot.jpg`.
- The agent replay script is at the top of `components/AgentReplay.tsx`.

## Contact form

The form posts to `app/api/contact/route.ts`, which sends email through Resend.
Copy `.env.example` to `.env.local` and fill it in. Until then the form tells
visitors it isn't connected.
