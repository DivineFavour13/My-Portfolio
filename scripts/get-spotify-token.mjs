/**
 * Run this script ONCE to get your Spotify refresh token.
 *
 * Steps:
 *  1. Go to https://developer.spotify.com/dashboard and create an app
 *  2. Set redirect URI to: http://localhost:3000/callback
 *  3. Copy your Client ID and Client Secret below (or pass as env vars)
 *  4. Run: node scripts/get-spotify-token.mjs
 *  5. Open the printed URL in your browser, log in, approve access
 *  6. You'll be redirected to localhost:3000/callback?code=XXXX
 *  7. Copy the `code` from the URL and paste it when prompted
 *  8. The script prints your REFRESH TOKEN — save it in Netlify env vars
 */

import http from 'http';
import { createInterface } from 'readline';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '5646c888222a4d6d9d91a762e086c9a5';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '40257c8e91f84e59921cc4b541195b33';
const REDIRECT_URI = 'https://127.0.0.1:3000/callback';

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

// Step 1: Print the auth URL
const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);

console.log('\n=== Spotify Token Generator ===\n');
console.log('1. Open this URL in your browser:\n');
console.log(authUrl.toString());
console.log('\n2. After approving, you\'ll be redirected to localhost:3000/callback?code=...');
console.log('3. Copy the `code` value from the URL\n');

// Step 2: Wait for code input
const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question('Paste the code here: ', async (code) => {
  rl.close();

  // Step 3: Exchange code for tokens
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code.trim(),
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await res.json();

  if (data.error) {
    console.error('\nError:', data.error, data.error_description);
    process.exit(1);
  }

  console.log('\n=== SUCCESS! Add these to Netlify Environment Variables ===\n');
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
  console.log('\n=== Done! ===\n');
});
