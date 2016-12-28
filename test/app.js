const hott = require('../index');

hott.registerHotkey('VK_KEY_G', ['MOD_SHIFT'], () => {
	console.log('Shift+G!');
});

const end = hott.monitorHotkeys();
console.log('Now monitoring!');

let i = 5;
const self = setInterval(() => {
	if (i--) {
		console.log('tick');
	} else {
		end();
		clearInterval(self);
		console.log('fin');
	}
}, 1000);
