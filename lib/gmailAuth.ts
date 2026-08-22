import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from './firebase';

export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose'
];

const provider = new GoogleAuthProvider();
GMAIL_SCOPES.forEach(scope => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

export const initGmailAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    cachedUser = user;
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

export const signInWithGoogleGmail = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }
    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In / Gmail error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getGmailAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const getCurrentGoogleUser = (): User | null => {
  return cachedUser;
};

export const logoutGmail = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  cachedUser = null;
};

// Encode UTF-8 text to base64url format for Gmail API
const encodeBase64Url = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.byteLength; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export interface SendInquiryParams {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export const sendInquiryViaGmailAPI = async (
  params: SendInquiryParams,
  token?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    return { success: false, error: 'Token de acceso no disponible' };
  }

  const recipient = 'authomia.agency@gmail.com';
  const subject = `[Consulta Authomia] ${params.empresa} - ${params.nombre}`;
  
  const rawEmailContent = [
    `To: ${recipient}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    `NUEVA CONSULTA TÉCNICA - AUTHOMIA ENGINEERING`,
    `--------------------------------------------------`,
    `Nombre / Contacto: ${params.nombre}`,
    `Empresa / Organización: ${params.empresa}`,
    `Email Corporativo: ${params.email}`,
    `Teléfono / WhatsApp: ${params.telefono || 'No especificado'}`,
    `Fecha / Hora: ${new Date().toLocaleString()}`,
    `--------------------------------------------------`,
    `REQUERIMIENTO:`,
    `${params.mensaje}`,
    `--------------------------------------------------`
  ].join('\r\n');

  const rawBase64 = encodeBase64Url(rawEmailContent);

  try {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${activeToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: rawBase64
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return { success: true, messageId: data.id };
  } catch (err: any) {
    console.error('Error sending message via Gmail API:', err);
    return { success: false, error: err.message || 'Error al conectar con Gmail API' };
  }
};
