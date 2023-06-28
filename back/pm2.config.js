module.exports = {
  apps: [
    {
      name: 'school-app',
      script: 'node_modules/.bin/ts-node',
      args: 'src/main.ts',
      exec_mode: 'fork',
      watch: false,
      ignore_watch: ['node_modules'],
      interpreter: 'none',
      env: {
        NODE_ENV: 'test',
      },
    },
  ],
};
