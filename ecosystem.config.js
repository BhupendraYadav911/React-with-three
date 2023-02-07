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
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user: 'root',
      host: '103.120.178.54',
      ref: 'origin/master',
      repo: 'git@github.com:Shubhras/react-with-three.git',
      path: '/var/www/html/react-with-three',
      // key: '/absolute/path/to/key',
      // ssh_options: ['ForwardAgent=yes'],
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'staging',
        PORT: 3009,
        URL: 'http://103.120.178.54',
      },
    },
    staging: {
      user: 'root',
      host: '103.120.178.54',
      ref: 'origin/master',
      repo: 'git@github.com:Shubhras/react-with-three.git',
      path: '/var/www/html/react-with-three',
      // key: '/absolute/path/to/key',
      // ssh_options: ['ForwardAgent=yes'],
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env staging'
    },
    dev : {}
  }
};