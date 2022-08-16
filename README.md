## Getting Started

First, fetch dependencies:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to obtain a new Twitch token

1. Install Redis (natively or as a docker instance)
2. Clone https://github.com/BarryCarlyon/twitch_misc
3. /twitch_misc/authentication/app_access_tokens/nodejs/ > node run.js
4. Copy the bearer and change it in the project (it lasts 2 months)
