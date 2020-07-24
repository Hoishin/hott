const _ = require('underscore');
const ffi = require('ffi-napi');
const ref = require('ref-napi');
const structType = require('ref-struct-napi');

const WM_HOTKEY = 0x0312;
const Modifiers = {
	MOD_ALT: 1,
	MOD_CONTROL: 2,
	MOD_NOREPEAT: 16384,
	MOD_SHIFT: 4,
	MOD_WIN: 8
};

const Keys = {
	VK_ABNT_C1: 193,
	VK_ABNT_C2: 194,
	VK_ADD: 107,
	VK_ATTN: 246,
	VK_BACK: 8,
	VK_CANCEL: 3,
	VK_CLEAR: 12,
	VK_CRSEL: 247,
	VK_DECIMAL: 110,
	VK_DIVIDE: 111,
	VK_EREOF: 249,
	VK_ESCAPE: 27,
	VK_EXECUTE: 43,
	VK_EXSEL: 248,
	VK_ICO_CLEAR: 230,
	VK_ICO_HELP: 227,
	VK_KEY_0: 48,
	VK_KEY_1: 49,
	VK_KEY_2: 50,
	VK_KEY_3: 51,
	VK_KEY_4: 52,
	VK_KEY_5: 53,
	VK_KEY_6: 54,
	VK_KEY_7: 55,
	VK_KEY_8: 56,
	VK_KEY_9: 57,
	VK_KEY_A: 65,
	VK_KEY_B: 66,
	VK_KEY_C: 67,
	VK_KEY_D: 68,
	VK_KEY_E: 69,
	VK_KEY_F: 70,
	VK_KEY_G: 71,
	VK_KEY_H: 72,
	VK_KEY_I: 73,
	VK_KEY_J: 74,
	VK_KEY_K: 75,
	VK_KEY_L: 76,
	VK_KEY_M: 77,
	VK_KEY_N: 78,
	VK_KEY_O: 79,
	VK_KEY_P: 80,
	VK_KEY_Q: 81,
	VK_KEY_R: 82,
	VK_KEY_S: 83,
	VK_KEY_T: 84,
	VK_KEY_U: 85,
	VK_KEY_V: 86,
	VK_KEY_W: 87,
	VK_KEY_X: 88,
	VK_KEY_Y: 89,
	VK_KEY_Z: 90,
	VK_MULTIPLY: 106,
	VK_NONAME: 252,
	VK_NUMPAD0: 96,
	VK_NUMPAD1: 97,
	VK_NUMPAD2: 98,
	VK_NUMPAD3: 99,
	VK_NUMPAD4: 100,
	VK_NUMPAD5: 101,
	VK_NUMPAD6: 102,
	VK_NUMPAD7: 103,
	VK_NUMPAD8: 104,
	VK_NUMPAD9: 105,
	VK_OEM_1: 186,
	VK_OEM_102: 226,
	VK_OEM_2: 191,
	VK_OEM_3: 192,
	VK_OEM_4: 219,
	VK_OEM_5: 220,
	VK_OEM_6: 221,
	VK_OEM_7: 222,
	VK_OEM_8: 223,
	VK_OEM_ATTN: 240,
	VK_OEM_AUTO: 243,
	VK_OEM_AX: 225,
	VK_OEM_BACKTAB: 245,
	VK_OEM_CLEAR: 254,
	VK_OEM_COMMA: 188,
	VK_OEM_COPY: 242,
	VK_OEM_CUSEL: 239,
	VK_OEM_ENLW: 244,
	VK_OEM_FINISH: 241,
	VK_OEM_FJ_LOYA: 149,
	VK_OEM_FJ_MASSHOU: 147,
	VK_OEM_FJ_ROYA: 150,
	VK_OEM_FJ_TOUROKU: 148,
	VK_OEM_JUMP: 234,
	VK_OEM_MINUS: 189,
	VK_OEM_PA1: 235,
	VK_OEM_PA2: 236,
	VK_OEM_PA3: 237,
	VK_OEM_PERIOD: 190,
	VK_OEM_PLUS: 187,
	VK_OEM_RESET: 233,
	VK_OEM_WSCTRL: 238,
	VK_PA1: 253,
	VK_PACKET: 231,
	VK_PLAY: 250,
	VK_PROCESSKEY: 229,
	VK_RETURN: 13,
	VK_SELECT: 41,
	VK_SEPARATOR: 108,
	VK_SPACE: 32,
	VK_SUBTRACT: 109,
	VK_TAB: 9,
	VK_ZOOM: 251,
	VK__none_: 255, // eslint-disable-line camelcase
	VK_ACCEPT: 30,
	VK_APPS: 93,
	VK_BROWSER_BACK: 166,
	VK_BROWSER_FAVORITES: 171,
	VK_BROWSER_FORWARD: 167,
	VK_BROWSER_HOME: 172,
	VK_BROWSER_REFRESH: 168,
	VK_BROWSER_SEARCH: 170,
	VK_BROWSER_STOP: 169,
	VK_CAPITAL: 20,
	VK_CONVERT: 28,
	VK_DELETE: 46,
	VK_DOWN: 40,
	VK_END: 35,
	VK_F1: 112,
	VK_F10: 121,
	VK_F11: 122,
	VK_F12: 123,
	VK_F13: 124,
	VK_F14: 125,
	VK_F15: 126,
	VK_F16: 127,
	VK_F17: 128,
	VK_F18: 129,
	VK_F19: 130,
	VK_F2: 113,
	VK_F20: 131,
	VK_F21: 132,
	VK_F22: 133,
	VK_F23: 134,
	VK_F24: 135,
	VK_F3: 114,
	VK_F4: 115,
	VK_F5: 116,
	VK_F6: 117,
	VK_F7: 118,
	VK_F8: 119,
	VK_F9: 120,
	VK_FINAL: 24,
	VK_HELP: 47,
	VK_HOME: 36,
	VK_ICO_00: 228,
	VK_INSERT: 45,
	VK_JUNJA: 23,
	VK_KANA: 21,
	VK_KANJI: 25,
	VK_LAUNCH_APP1: 182,
	VK_LAUNCH_APP2: 183,
	VK_LAUNCH_MAIL: 180,
	VK_LAUNCH_MEDIA_SELECT: 181,
	VK_LBUTTON: 1,
	VK_LCONTROL: 162,
	VK_LEFT: 37,
	VK_LMENU: 164,
	VK_LSHIFT: 160,
	VK_LWIN: 91,
	VK_MBUTTON: 4,
	VK_MEDIA_NEXT_TRACK: 176,
	VK_MEDIA_PLAY_PAUSE: 179,
	VK_MEDIA_PREV_TRACK: 177,
	VK_MEDIA_STOP: 178,
	VK_MODECHANGE: 31,
	VK_NEXT: 34,
	VK_NONCONVERT: 29,
	VK_NUMLOCK: 144,
	VK_OEM_FJ_JISHO: 146,
	VK_PAUSE: 19,
	VK_PRINT: 42,
	VK_PRIOR: 33,
	VK_RBUTTON: 2,
	VK_RCONTROL: 163,
	VK_RIGHT: 39,
	VK_RMENU: 165,
	VK_RSHIFT: 161,
	VK_RWIN: 92,
	VK_SCROLL: 145,
	VK_SLEEP: 95,
	VK_SNAPSHOT: 44,
	VK_UP: 38,
	VK_VOLUME_DOWN: 174,
	VK_VOLUME_MUTE: 173,
	VK_VOLUME_UP: 175,
	VK_XBUTTON1: 5,
	VK_XBUTTON2: 6
};

let hkId = 111111;
const commands = {};

const Point = structType({
	x: ref.types.int64,
	y: ref.types.int64
});

const Msg = structType({
	hwnd: ref.types.int32,
	message: ref.types.uint32,
	wParam: ref.types.uint32,
	lParam: ref.types.int32,
	time: ref.types.uint32,
	pt: Point
});

const MsgPtr = ref.refType(Msg);

const winapi = new ffi.Library('User32', {
	RegisterHotKey: ['bool', ['int32', 'int32', 'uint32', 'uint32']],
	PeekMessageA: ['bool', [MsgPtr, 'int32', 'uint32', 'uint32', 'uint32']]
});

// Register hotkeys using winapi
exports.registerHotkey = function (key, modifiers, command, cb) {
	if (!Keys[key]) {
		throw new Error(`Invalid key specified! ('${key}')`);
	}

	// If 'modifiers' is not supplied, or not an array, then we error
	if (!(modifiers && Array.isArray(modifiers))) {
		throw new Error('You must specify a modifiers array.');
	}

	/* eslint-disable no-mixed-operators */
	const fsModifiers = modifiers && modifiers.reduce((acc, m) => {
		return acc | (Modifiers[m] || 0);
	}, 0) || 0;

	if (winapi.RegisterHotKey(null, ++hkId, fsModifiers, Keys[key])) {
		commands[hkId] = {cmd: command, cb};
	}
	/* eslint-enable no-mixed-operators */
};

// Listen for hotkeys firing
const defaultMonitorOpts = {
	poll: 200
};

exports.monitorHotkeys = function (opts) {
	const msg = new Msg({});
	let reg;
	let cmd;
	let cb;
	let r;

	// Clear invalid poll periods
	if ((opts && opts.poll) < 10) {
		opts.poll = undefined;
	}

	// Apply default options
	opts = _.extend({}, defaultMonitorOpts, opts);

	const key = setInterval(() => {
		winapi.PeekMessageA(msg.ref(), null, 0, 0, 1);
		if (msg.wParam === WM_HOTKEY) {
			reg = commands[msg.time];
			if (reg && reg.cmd) {
				cmd = reg.cmd;
				cb = reg.cb;

				r = cmd();

				if (typeof cb === 'function') {
					cb(null, r);
				}
			}

			// Make sure we don't come back here till me actually get another message
			msg.wParam = WM_HOTKEY + 1;
		}
	}, opts.poll);

	// Return a disposer to let callers kill the interval timer
	return function () {
		clearInterval(key);
	};
};
