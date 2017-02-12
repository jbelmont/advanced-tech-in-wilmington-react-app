process.env.NODE_ENV = 'testing';
process.env.PORT = 3000;
require('../app');
const spawn = require('cross-spawn'); // eslint-disable-line

// 2. run the nightwatch test suite against it
// to run in additional browsers:
//    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
//    2. add it to the --env flag below
// or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
// For more information on Nightwatch's config file, see
// http://nightwatchjs.org/guide#settings-file
let opts = process.argv.slice(2);

if (opts.indexOf('--config') === -1) {
  opts = opts.concat(['--config', 'test/nightwatch.conf.js']);
}
if (opts.indexOf('--env') === -1) {
  opts = opts.concat(['--env', 'chrome']);
}
const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

runner.on('exit', (code) => {
  process.exit(code);
});

runner.on('error', (err) => {
  throw err;
});
