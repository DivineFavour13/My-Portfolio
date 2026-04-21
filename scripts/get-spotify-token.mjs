/**
 * Run this script once to get your Spotify refresh token.
 *
 * Steps:
 *  1. Go to https://developer.spotify.com/dashboard and create an app.
 *  2. Add this redirect URI in the Spotify app settings:
 *     http://127.0.0.1:8888/callback
 *  3. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your shell.
 *  4. Run: npm run spotify:token
 *  5. Open the printed URL in your browser, log in, and approve access.
 *  6. Copy the code from the redirected URL and paste it into the prompt.
 *  7. Save the printed values in Netlify environment variables.
 */
import dotenv from 'dotenv';
dotenv.config();
import { createInterface } from 'readline';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8888/callback';

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
].join(' ');


if (!CLIENT_ID || !CLIENT_SECRET) {

  console.error('\nMissing Spotify credentials.');
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before running this script.\n');
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);

console.log('\n=== Spotify Token Generator ===\n');
console.log('1. Open this URL in your browser:\n');
console.log(authUrl.toString());
console.log(`\n2. After approving, you'll be redirected to ${REDIRECT_URI}?code=...`);
console.log('3. Copy the `code` value from the URL\n');

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question('Paste the code here: ', async (code) => {
  rl.close();

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
  console.log('\n=== Success! ===\n');
  console.log('Your refresh token is:\n');
  console.log(data.refresh_token);
  console.log('\nUse this value for SPOTIFY_REFRESH_TOKEN in your environment variables.\n');
});
