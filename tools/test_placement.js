import { spawn } from 'child_process';
import fs from 'fs';

async function testPlacement() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1366,768',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const targetTab = tabs.find(t => t.url.includes('localhost:5173')) || tabs[0];
    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

    await new Promise((resolve) => ws.onopen = resolve);

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

    // 1. Show Game
    await send('Runtime.evaluate', {
      expression: `
        window.app.showView('GAME_TRAIN_TRACK');
      `
    });
    await new Promise(r => setTimeout(r, 400));

    // 2. Select Choice 1 (Press Key 1)
    await send('Runtime.evaluate', {
      expression: `
        window.app.games.GAME_TRAIN_TRACK.handleKey('1');
      `
    });
    await new Promise(r => setTimeout(r, 800));

    // Screenshot after piece placed
    const shotPlaced = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_placed_debug.png', Buffer.from(shotPlaced.data, 'base64'));
    console.log('Saved train_placed_debug.png');

    // 3. Press OK to drive train
    await send('Runtime.evaluate', {
      expression: `
        window.app.games.GAME_TRAIN_TRACK.handleKey('Enter');
      `
    });
    // Wait halfway through driving
    await new Promise(r => setTimeout(r, 1500));

    const shotDriving = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_driving_debug.png', Buffer.from(shotDriving.data, 'base64'));
    console.log('Saved train_driving_debug.png');

    ws.close();
  } catch (err) {
    console.error('Error during placement test:', err);
  } finally {
    chrome.kill();
  }
}

testPlacement();
