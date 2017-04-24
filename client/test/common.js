import ReactDOM from 'react-dom';

import sinon from 'sinon';
import chai from 'chai';
import proxyquire from 'proxyquire';

chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));

chai.config.showDiff = true;
chai.config.truncateThreshold = 0;

const vendor = require('../webpack.default.config').entry.vendor;
vendor.splice(vendor.indexOf('bootstrap-loader'), 1);
vendor.forEach(module => require(module));
