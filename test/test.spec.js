'use strict';

const hott = require('../index');
const robot = require('robotjs');

let clearMonitor;

beforeAll(() => {
	clearMonitor = hott.monitorHotkeys();
});

afterAll(() => {
	clearMonitor();
});

test('should detect keys with no modifiers', done => {
	hott.registerHotkey('VK_KEY_X', [], () => {
		done();
	});

	robot.keyTap('x');
});

test('should detect keys with one modifier', done => {
	hott.registerHotkey('VK_KEY_X', ['MOD_SHIFT'], () => {
		done();
	});

	robot.keyTap('x', 'shift');
});

test('should detect keys with multiple modifiers', done => {
	hott.registerHotkey('VK_KEY_X', ['MOD_SHIFT', 'MOD_CONTROL'], () => {
		done();
	});

	robot.keyTap('x', ['shift', 'control']);
});
