'use strict';

const hott = require('../index');
const robot = require('robotjs');
const delay = require('delay');

const ASYNC_DELAY = 300;
let clearMonitor;

beforeAll(async () => {
	clearMonitor = hott.monitorHotkeys();
	await delay(ASYNC_DELAY);
});

afterAll(() => {
	clearMonitor();
});

test('should detect keys with no modifiers', async done => {
	hott.registerHotkey('VK_KEY_X', [], () => {
		done();
	});

	await delay(ASYNC_DELAY);

	robot.keyTap('x');
});

test('should detect keys with one modifier', async done => {
	hott.registerHotkey('VK_KEY_Y', ['MOD_SHIFT'], () => {
		done();
	});

	await delay(ASYNC_DELAY);

	robot.keyTap('y', 'shift');
});

test('should detect keys with multiple modifiers', async done => {
	hott.registerHotkey('VK_KEY_Z', ['MOD_SHIFT', 'MOD_CONTROL'], () => {
		done();
	});

	await delay(ASYNC_DELAY);

	robot.keyTap('z', ['shift', 'control']);
});
