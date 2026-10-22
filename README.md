# AI Workspace: Next.js + Supabase + OpenAI/Gemini

Chat jaisa interface jahan user category chun kar prompt deta hai (Writing, Coding, Summaries, Images). Login, chat history aur credits system included hain.

## Project structure

```
app/
  api/chat/route.ts     <- secure backend: auth, credits, AI call, save
  chat/page.tsx         <- main chat screen
  login/page.tsx        <- sign in / sign up
  layout.tsx, page.tsx, globals.css
components/
  Sidebar.tsx, CategorySelector.tsx, MessageBubble.tsx, PromptInput.tsx
lib/
  categories.ts         <- categories, credit costs, system prompts
  ai.ts                 <- OpenAI / Gemini calls (server only)
  supabase/client.ts    <- browser client (anon key)
  supabase/admin.ts     <- server client (service role key)
supabase/schema.sql     <- tables, RLS, credit functions, image bucket
```

## Local setup

1. Node.js 18.18+ install karein.
2. Folder mein terminal kholein:
   ```
   npm install
   cp .env.example .env.local
   ```
3. **Supabase**: supabase.com par naya project banayein.
   - SQL Editor mein `supabase/schema.sql` poora paste karke Run karein.
   - Project Settings > API se URL, anon key aur service_role key `.env.local` mein daalein.
   - Authentication > Providers > Email: development mein "Confirm email" band kar sakte hain taake signup foran chal jaye.
4. **AI key**: `OPENAI_API_KEY` daalein (platform.openai.com). Gemini use karna ho to `TEXT_PROVIDER=gemini` aur `GEMINI_API_KEY` daalein. Images abhi sirf OpenAI se hoti hain.
5. `npm run dev` chalayein, phir http://localhost:3000 kholein.

Model names `.env.local` se badalte hain (`OPENAI_TEXT_MODEL`, `OPENAI_IMAGE_MODEL`, `GEMINI_MODEL`). Agar provider koi model retire kar de to sirf wahan naam badalna hoga.

## Vercel par deploy

1. Code GitHub par push karein (`.env.local` push nahi hoti, `.gitignore` mein hai).
2. vercel.com > Add New Project > repo select karein.
3. Environment Variables mein `.env.example` ki saari values daalein.
4. Deploy dabayein. Phir Supabase > Authentication > URL Configuration mein apni Vercel URL "Site URL" mein daalein.

Note: image generation 60 second tak le sakti hai. Vercel Hobby plan par function time limit kam ho sakti hai; agar images time out hon to Pro plan ya `maxDuration` check karein.

## Security: kya already hai

- API keys sirf server par hain, browser tak nahi jatin.
- Har request par login token server verify karta hai.
- Credits database mein atomic function se kat'te hain; client cost nahi bhej sakta.
- AI call fail ho to credits wapas ho jate hain.
- RLS ki wajah se user sirf apni chats aur credits dekh sakta hai.

## Launch se pehle zaroor karein

- **Rate limiting**: credits ke ilawa per-user requests/minute limit lagayein (jaise Upstash Ratelimit), warna koi script se server par bojh daal sakta hai.
- **Credits khareedna**: abhi credits sirf signup par milte hain. Payment (Stripe, Lemon Squeezy, ya local gateway) ke webhook se `refund_credits` jaisa function use karke credits add karein.
- **Images**: bucket public hai, URL ka path random hai lekin link jisko mile woh dekh sakta hai. Private chahiye to signed URLs use karein.
- **Content moderation**: public product ke liye OpenAI Moderation API prompt par chalana behtar hai.
- **Streaming**: abhi jawab poora ek saath aata hai. Lamba text stream karna agla improvement hai.

## Rang aur naam badalna

Colors `tailwind.config.ts` mein hain (ink, mist, lagoon, gold). App ka naam `NEXT_PUBLIC_APP_NAME` se badalta hai. Categories aur unki credit cost `lib/categories.ts` mein.
