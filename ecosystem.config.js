module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'react_app_with_threejs',
      script    : 'npm',
      args      : 'run start:production',
      env_production: {
        NODE_ENV: 'production',
        PM2_SERVE_PATH: 'build',
        PM2_SERVE_PORT: 3009,
        PM2_SERVE_SPA: 'true',
      },
    },
  ]
};