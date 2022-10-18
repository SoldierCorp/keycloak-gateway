import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const getAuthorization = async (accesstoken) => {
  try {
    const response = await axios.post(process.env.KEYCLOAK_URL, {
      grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      audience: 'gm'
    }, {
      headers: {
        'Authorization': `Bearer ${accesstoken}`,
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const login = async (username, password) => {
  try {
    const response = await axios.post(process.env.KEYCLOAK_URL, {
      grant_type: 'password',
      username,
      password,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLEINT_SECRET,
    }, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    return getAuthorization(response.data.access_token)
  } catch (error) {
    return error
  }
}
