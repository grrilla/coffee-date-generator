const { expect } = require('chai');

const thingy = require('../src');

describe('test suite', () => {
	it('unit test', () => {
		expect(thingy('foo')).to.eql('foo-suffix');
	});
});
