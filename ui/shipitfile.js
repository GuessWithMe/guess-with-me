const path = require('path');

module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: './dist',
      deployTo: '/home/ubuntu/ui',
      ignores: ['.git', 'node_modules'],
      key: '~/.ssh/guesswithme-aws.pem',
    },
    // Set custom Variables
    production: {
      servers: 'ubuntu@ec2-18-191-188-37.us-east-2.compute.amazonaws.com',
      build : 'ng build --prod'
    }
  });


  shipit.task('default', () => {
    return shipit.local(shipit.config.build)
  });


  shipit.task('sync', ['default'], async () => {
    shipit.log('Build:Finished');
    const releaseTimestamp = +new Date();
    const targetDir = `${shipit.config.deployTo}/${releaseTimestamp}`

    // Making a directory for the new release
    await shipit.remote(`mkdir ${targetDir}`);

    // Copying new relase files
    await shipit.copyToRemote(path.resolve('./dist/ui6/*'), targetDir)

    // Removing old symlink (current)
    await shipit.remote(`rm -rf ${shipit.config.deployTo}/current`);

    // Create a symlink to the new release
    return shipit.remote(`ln -s ${targetDir}/ ${shipit.config.deployTo}/current`);
  });

  shipit.task('cleanup', ['sync'], async () => {
    // Getting the amount of versions + 1
    const versionCount = await shipit.remote(`find /home/ubuntu/ui  -maxdepth 1 -type d | wc -l`);

    if (Number(versionCount[0]['stdout']) > 5) {
      await shipit.remote(`rm -R ${shipit.config.deployTo}/$(ls -lt ${shipit.config.deployTo} | grep '^d' | tail -1  | tr " " "\n" | tail -1)`)
    }
  });

  shipit.start('default', 'sync', 'cleanup');
}
