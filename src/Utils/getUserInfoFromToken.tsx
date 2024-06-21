import Cookies from 'js-cookie';
import base64 from 'base-64';
/**
 * JWT 토큰에서 사용자 정보를 추출하는 함수
 * @returns {object | null} - 사용자 정보 또는 null
 */
interface UserInfo {
  iat: number;
  id: number;
  iss: string;
  teamId: string;
}
export default function getUserInfoFromToken(): UserInfo {
  const jwtToken = Cookies.get('token');
  if (jwtToken) {
    const payload = jwtToken.substring(jwtToken.indexOf('.') + 1, jwtToken.lastIndexOf('.'));
    const decodingInfo = base64.decode(payload);
    const decodingInfoJson = JSON.parse(decodingInfo);
    return decodingInfoJson;
  }
  return { iat: 0, id: 0, iss: '', teamId: '' };
}
