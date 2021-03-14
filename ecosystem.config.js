module.exports = {
  apps: [ {
    script: './server/index.js',
    watch: '.'
  } ],

  deploy: {
    development: {
      user: 'gizmo',
      host: '165.232.145.102',
      ref: 'origin/staging',
      repo: 'git@github.com:ghostrib/chat-app.git',
      path: '/var/www/chat-app',
      ssh_options: 'IdentityFile=~/.ssh/mattbrannon',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
