const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  console.log('Token response:', JSON.stringify(data));
  return data.access_token;
}

async function getNowPlaying(token) {
  const res = await fetch(SPOTIFY_NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('Now playing status:', res.status);
  if (res.status === 204 || res.status > 400) return null;

  const data = await res.json();
  console.log('Now playing data:', JSON.stringify(data));
  if (!data || !data.item) return null;

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((a) => a.name).join(', '),
    album: data.item.album.name,
    albumArt: data.item.album.images[0]?.url ?? null,
    songUrl: data.item.external_urls.spotify,
  };
}

async function getRecentlyPlayed(token) {
  const res = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('Recently played status:', res.status);
  const data = await res.json();
  console.log('Recently played data:', JSON.stringify(data));
  const item = data?.items?.[0]?.track;
  if (!item) return null;

  return {
    isPlaying: false,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(', '),
    album: item.album.name,
    albumArt: item.album.images[0]?.url ?? null,
    songUrl: item.external_urls.spotify,
  };
}

export const handler = async () => {
  try {
    const token = await getAccessToken();
    let track = await getNowPlaying(token);
    if (!track) {
      track = await getRecentlyPlayed(token);
    }

    if (!track) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ isPlaying: false, title: null }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(track),
    };
  } catch (err) {
    console.log('Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};