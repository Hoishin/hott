'use strict';

const hott = require('../index');
const robot = require('robotjs');

describe('hott', () => {
	before(() => {
		hott.monitorHotkeys({poll: 1});
	});

	it('should detect keys with no modifiers', done => {
		hott.registerHotkey('VK_KEY_X', [], () => {
			done();
		});

		robot.keyTap('x');
	});

	it('should detect keys with one modifier', done => {
		hott.registerHotkey('VK_KEY_X', ['MOD_SHIFT'], () => {
			done();
		});

		robot.keyTap('x', 'shift');
	});

	it('should detect keys with multiple modifiers', done => {
		hott.registerHotkey('VK_KEY_X', ['MOD_SHIFT', 'MOD_CONTROL'], () => {
			done();
		});

		robot.keyTap('x', ['shift', 'control']);
	});
});
