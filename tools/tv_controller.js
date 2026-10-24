import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADB = path.join(__dirname, 'platform-tools', 'adb.exe');
const TV_DEVICE = '192.168.1.7:5555';

function ensureConnected() {
  try {
    const devices = execSync(`"${ADB}" devices`, { encoding: 'utf-8' });
    if (!devices.includes(TV_DEVICE) || devices.includes('offline')) {
      execSync(`"${ADB}" connect ${TV_DEVICE}`, { timeout: 6000, encoding: 'utf-8' });
      execSync('powershell -Command "Start-Sleep -Milliseconds 300"');
    }
  } catch (e) {}
}

function adb(cmd, timeout = 6000) {
  ensureConnected();
  return execSync(`"${ADB}" -s ${TV_DEVICE} ${cmd}`, { timeout, encoding: 'utf-8' });
}

function getState() {
  try {
    const out = adb('logcat -d -s chromium');
    const idx = out.lastIndexOf('TV_STATE:{');
    if (idx !== -1) {
      const start = idx + 'TV_STATE:'.length;
      const end = out.indexOf('}", source:', start);
      if (end !== -1) {
        return JSON.parse(out.substring(start, end + 1));
      }
      const closeBrace = out.indexOf('}', start);
      if (closeBrace !== -1) {
        return JSON.parse(out.substring(start, closeBrace + 1));
      }
    }
    const lines = out.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      const match = lines[i].match(/TV_STATE:(\{.*?\})/);
      if (match) {
        return JSON.parse(match[1]);
      }
    }
    return { status: 'TV_STATE not yet logged. App running?' };
  } catch (e) {
    return { error: e.message };
  }
}

function getSpeech(count = 5) {
  try {
    const out = adb('logcat -d -s PetualanganBelajar chromium');
    const speechLines = [];
    out.split('\n').forEach(line => {
      const m1 = line.match(/TTS: (.*)/);
      const m2 = line.match(/TV_SPEECH:(.*)/);
      const m3 = line.match(/queued utterance: (.*)/);
      if (m1) speechLines.push(m1[1].trim());
      else if (m2) speechLines.push(m2[1].trim());
      else if (m3) speechLines.push(m3[1].trim());
    });
    return speechLines.slice(-count);
  } catch (e) {
    return [];
  }
}

const KEY_MAP = {
  left: 21,
  right: 22,
  up: 19,
  down: 20,
  ok: 23,
  enter: 23,
  back: 4,
  home: 3
};

function sendKey(keyName) {
  const code = KEY_MAP[keyName.toLowerCase()];
  if (!code) {
    throw new Error(`Unknown key: ${keyName}. Supported: ${Object.keys(KEY_MAP).join(', ')}`);
  }
  adb(`shell input keyevent ${code}`);
  // Wait briefly for UI to update
  execSync('powershell -Command "Start-Sleep -Milliseconds 250"');
  return getState();
}

function takeScreenshot(destPath) {
  const target = destPath || 'tv_screen.png';
  adb('shell screencap -p /sdcard/tv_snap.png');
  adb(`pull /sdcard/tv_snap.png "${target}"`);
  return { savedTo: target };
}

// CLI Interface
const [,, cmd, arg1] = process.argv;

if (!cmd || cmd === 'help') {
  console.log(`
TV Controller CLI (Native Xiaomi TV Bridge)
-------------------------------------------
Usage:
  node tools/tv_controller.js state           - Get current game state in JSON (<150ms)
  node tools/tv_controller.js key <keyname>   - Send remote key (left/right/up/down/ok/back) & returns new state
  node tools/tv_controller.js speech [count]  - Get last spoken TTS utterances
  node tools/tv_controller.js shot [file.png] - Take screencap on-demand
  node tools/tv_controller.js launch          - Launch the app on Android TV
  node tools/tv_controller.js install [path]  - Install APK to Android TV via ADB
`);
  process.exit(0);
}

switch (cmd) {
  case 'state':
    console.log(JSON.stringify(getState(), null, 2));
    break;
  case 'key':
    if (!arg1) {
      console.error('Error: specify key (e.g. left, right, ok, back)');
      process.exit(1);
    }
    console.log(JSON.stringify(sendKey(arg1), null, 2));
    break;
  case 'speech':
    console.log(JSON.stringify(getSpeech(parseInt(arg1) || 5), null, 2));
    break;
  case 'shot':
    console.log(JSON.stringify(takeScreenshot(arg1), null, 2));
    break;
  case 'launch':
    adb('shell am start -n com.dinohitung.app/.MainActivity');
    console.log(JSON.stringify({ status: 'Launched com.dinohitung.app/.MainActivity' }));
    break;
  case 'install': {
    const apk = arg1 || 'dist/app-debug.apk';
    if (!fs.existsSync(apk)) {
      console.error(`Error: APK file not found at ${apk}`);
      process.exit(1);
    }
    const installOut = adb(`install -r "${apk}"`, 30000);
    console.log(JSON.stringify({ status: 'APK Installed', output: installOut.trim() }));
    break;
  }
  default:
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
}
