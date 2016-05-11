// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = [];
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// only run tests that have changed after the first pass.
// require all `src/**/*.spec.js`
const srcContext = require.context('../src/', true, /\.spec\.js$/);
const testsToRun = srcContext.keys().filter(inManifest);
(testsToRun.length ? testsToRun : srcContext.keys()).forEach(srcContext);

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
if (__COVERAGE__) {
  const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/);
  componentsContext.keys().forEach(componentsContext);
}
