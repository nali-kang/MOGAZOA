import axios from 'axios';
import Cookies from 'js-cookie';
import { OAuthAppPayload } from './Oauth.type';

export async function registerOAuthApp(teamId: string, payload: OAuthAppPayload) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${teamId}/oauthApps`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );
    console.log('OAuth App registered:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering OAuth App:', error);
    throw error;
  }
}

export async function fetchOAuthSession() {
  try {
    const response = await axios.get('/api/auth/session');
    return response.data;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
}
