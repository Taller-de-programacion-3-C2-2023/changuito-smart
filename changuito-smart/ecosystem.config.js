module.exports = {
  apps: [
    {
      name: 'changuito-smart-app',
      script: './node_modules/.bin/ts-node',
      args: './src/server.ts',
      watch: true,
    },
  ],
}
