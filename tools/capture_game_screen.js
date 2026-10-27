import { spawn } from 'child_process';
import fs from 'fs';

async function capture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1366,768',
    'http://localhost:5173/'
  ]);

  // Wait for Chrome to start
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    console.log('Tabs:', tabs.map(t => t.url));
    const targetTab = tabs.find(t => t.url.includes('localhost:5173')) || tabs[0];
    const wsUrl = targetTab.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    await new Promise((resolve) => ws.onopen = resolve);
    console.log('Connected to Chrome DevTools WebSocket');

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');

    // Check console errors
    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          window.app.showView('GAME_TRAIN_TRACK');
          const arena = document.getElementById('train-track-arena');
          const choices = document.getElementById('train-track-choices-container');
          return {
            currentView: window.app.currentView,
            arenaHtml: arena ? arena.innerHTML.substring(0, 300) : null,
            choicesCount: choices ? choices.children.length : 0,
            rects: {
              container: document.getElementById('game-container')?.getBoundingClientRect(),
              arena: arena?.getBoundingClientRect(),
              choices: choices?.getBoundingClientRect()
            }
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Eval result:', JSON.stringify(evalRes, null, 2));

    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot
    const shotRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_track_debug.png', Buffer.from(shotRes.data, 'base64'));
    console.log('Screenshot saved to train_track_debug.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

capture();
