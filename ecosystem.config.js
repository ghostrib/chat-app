require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'chat-app',
      script: './server/index.js',
      watch: [ 'server', 'public' ],
      env: {
        NODE_ENV: 'development'
      },
      env_development: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: '165.232.145.102',
      port: '22',
      key: '~/.ssh/deploy',
      ref: 'origin/main',
      repo: 'git@github.com:ghostrib/chat-app.git',
      path: '/var/www/chat-app',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
    development: {
      user: 'deploy',
      host: '165.232.145.102',
      port: '22',
      key: '~/.ssh/deploy',
      ref: 'origin/staging',
      repo: 'git@github.com:ghostrib/chat-app.git',
      path: '/var/www/chat-app',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env development'
    }
  }
};
