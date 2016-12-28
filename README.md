## hott [![Build status](https://ci.appveyor.com/api/projects/status/aq35s86aavdjx6fl/branch/master?svg=true)](https://ci.appveyor.com/project/Lange/hott/branch/master)
##### Simple global hotkeys for Windows, with node

### Install
```sh
npm install --save lange/hott
```

### Programmatic usage
You can use hott within scripts to establish (currently only **global**) key bindings and invoke callbacks when the hotkeys are pressed.

```js
const hott = require('hott');

hott.registerHotkey('VK_KEY_X', ['MOD_SHIFT'], () => {
	console.log('you entered a capital X');
});

// You MUST then tell hott to monitor for the hotkeys being pressed!
// You can pass in options if you want (currently only poll-rate, in ms)
hott.monitorHotkeys({poll: 50});
```

### How it works
Hott uses native winapi methods to register global hotkeys.
