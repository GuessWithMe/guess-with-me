module.exports = {
  apps : [
    {
      name      : 'api',
      cwd       : 'api',
      node_args : '-r tsconfig-paths/register',
      script    : 'src/index.ts',
      interpreter: `${__dirname}/api/node_modules/.bin/ts-node`,
      env: {
        TS_NODE_FILES: true,
        NODE_ENV: 'development'
      },
      watch: ['src/**/*'],
    },
  ]
};
