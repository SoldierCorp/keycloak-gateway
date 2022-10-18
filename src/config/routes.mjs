import { statementsGETPOST } from '../keycloakProtect/statements.mjs'

const baseUrl = 'http://localhost:3000'

export const routes = [
  // Statements
  {
    url: '/api/fleet/statements',
    auth: true,
    keycloakProtect: statementsGETPOST,
    proxy: {
      target: `${baseUrl}/statements`,
      changeOrigin: true,
      pathRewrite: {
        [`^/api/fleet/statements`]: '',
      },
    }
  },
  {
    url: '/api/fleet/statements/:id',
    auth: true,
    keycloakProtect: statementsGETPOST,
    proxy: {
      target: `${baseUrl}/statements/:id`,
      changeOrigin: true,
      pathRewrite: {
        [`^/api/fleet/statements`]: '',
      },
    }
  },
]
