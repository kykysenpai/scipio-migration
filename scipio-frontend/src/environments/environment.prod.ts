export const environment = {
  production: true,
  keycloakRootUrl: (<any>window).__env.keycloakRootUrl,
  realm: (<any>window).__env.realm,
  clientId: (<any>window).__env.clientId,
  apiBaseUrl: (<any>window).__env.apiBaseUrl
};
