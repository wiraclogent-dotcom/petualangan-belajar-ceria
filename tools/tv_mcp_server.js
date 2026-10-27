#!/usr/bin/env node
/**
 * Model Context Protocol (MCP) Server for Xiaomi Android TV
 * Provides native tools for TV Remote Control, State Inspection, and Audio Monitoring
 */

import { execSync } from 'child_process';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADB = path.join(__dirname, 'platform-tools', 'adb.exe');
const TV_DEVICE = '192.168.1.6:5555';

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
  execSync('powershell -Command "Start-Sleep -Milliseconds 250"');
  return getState();
}

function takeScreenshot(destPath) {
  const target = destPath || 'tv_screen.png';
  adb('shell screencap -p /sdcard/tv_snap.png');
  adb(`pull /sdcard/tv_snap.png "${target}"`);
  return { savedTo: target, timestamp: new Date().toISOString() };
}

// JSON-RPC Stdio Protocol Handler
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function sendResponse(id, result) {
  const response = {
    jsonrpc: '2.0',
    id: id,
    result: result
  };
  process.stdout.write(JSON.stringify(response) + '\n');
}

function sendError(id, code, message) {
  const response = {
    jsonrpc: '2.0',
    id: id,
    error: { code, message }
  };
  process.stdout.write(JSON.stringify(response) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const request = JSON.parse(line);
    const { id, method, params } = request;

    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: 'tv-controller-mcp',
          version: '1.0.0'
        }
      });
      return;
    }

    if (method === 'notifications/initialized') {
      // Client notification, no reply needed
      return;
    }

    if (method === 'tools/list') {
      sendResponse(id, {
        tools: [
          {
            name: 'tv_get_state',
            description: 'Get real-time structured JSON state of the game on Xiaomi TV without capturing any screenshots.',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          },
          {
            name: 'tv_send_key',
            description: 'Send TV remote key (left, right, up, down, ok, back) and return the updated state.',
            inputSchema: {
              type: 'object',
              properties: {
                key: {
                  type: 'string',
                  description: 'Key to send: left, right, up, down, ok, back'
                }
              },
              required: ['key']
            }
          },
          {
            name: 'tv_get_speech',
            description: 'Get the last spoken Text-to-Speech phrases by the app.',
            inputSchema: {
              type: 'object',
              properties: {
                count: {
                  type: 'number',
                  description: 'Number of recent utterances to return (default 5)'
                }
              }
            }
          },
          {
            name: 'tv_take_screenshot',
            description: 'Capture screenshot of the TV only when visual inspection is explicitly required.',
            inputSchema: {
              type: 'object',
              properties: {
                filename: {
                  type: 'string',
                  description: 'Destination filename (default tv_screen.png)'
                }
              }
            }
          }
        ]
      });
      return;
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;

      if (name === 'tv_get_state') {
        const state = getState();
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(state, null, 2) }]
        });
        return;
      }

      if (name === 'tv_send_key') {
        const state = sendKey(args.key);
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(state, null, 2) }]
        });
        return;
      }

      if (name === 'tv_get_speech') {
        const speech = getSpeech(args.count || 5);
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(speech, null, 2) }]
        });
        return;
      }

      if (name === 'tv_take_screenshot') {
        const result = takeScreenshot(args.filename);
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        });
        return;
      }

      sendError(id, -32601, `Tool not found: ${name}`);
      return;
    }

    sendError(id, -32601, `Method not supported: ${method}`);
  } catch (err) {
    // Ignore malformed input
  }
});
