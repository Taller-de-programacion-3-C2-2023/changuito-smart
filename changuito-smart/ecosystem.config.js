module.exports = {
  apps: [
    {
      // name: 'changuito-smart-app',
      name: 'APP',
      script: './node_modules/.bin/ts-node',
      args: './src/server.ts',
      instances: 1,
      watch: true,
      autorestart: false,
      // stop_exit_codes: [0]
      // out_file: "/dev/null",
      // error_file: "/dev/null",
    },
  ],
}
