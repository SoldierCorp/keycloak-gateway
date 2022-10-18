import { NodeAdapter } from 'keycloak-nodejs-connect';
import session from 'express-session'

export const setupAuth = (app, routes) => {
  var memoryStore = new session.MemoryStore();
  var keycloak = new NodeAdapter({ store: memoryStore });

  app.use(session({
    secret: '0abcd0',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  app.use(keycloak.middleware());
  routes.forEach(r => {
    if (r.auth) {
      app.use(r.url, keycloak.protect(r.keycloakProtect), function (req, res, next) {
        next();
      });
    }
  });
}
