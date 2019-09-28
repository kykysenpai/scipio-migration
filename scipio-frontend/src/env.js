(function (window) {
  window.__env = window.__env || {};
  window.__env.keycloakRootUrl = 'http://localhost:4080/auth';
  window.__env.apiBaseUrl = 'http://localhost:4200';
  window.__env.clientId = 'scipio-frontend';
  window.__env.realm = 'TCC';
  window.__env.socketBaseUrl = 'ws://localhost:8090';
  window.__env.version='dev';
}(this));
