import { OAuth2Client, TokenPayload } from 'google-auth-library'

const clientId = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientId);

export async function googleVerify(token:string = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, picture, email } = ticket.getPayload() as TokenPayload;

  return {
    nombre: name,
    img:    picture, 
    correo: email 
  }
}
