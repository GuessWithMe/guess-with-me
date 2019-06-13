module.exports = {
  apps: [
    {
      name: 'api',
      cwd: '.',
      node_args: '-r tsconfig-paths/register',
      script: 'src/index.ts',
      interpreter: `${__dirname}/node_modules/.bin/ts-node`,
      env: {
        TS_NODE_FILES: true,
        NODE_ENV: 'development'
      },
      watch: ['src/**/*']
    }
  ]
};
