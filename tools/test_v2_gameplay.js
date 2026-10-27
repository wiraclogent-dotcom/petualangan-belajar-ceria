import { spawn } from 'child_process';
import fs from 'fs';

async function testFullGame() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  try {
    const res = await fetch('http://127.0.0.1:9226/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.url.includes('localhost:5173'));
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const curId = id++;
        const handler = (e) => {
          const data = JSON.parse(e.data);
          if (data.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');

    async function pressKey(key, code, keyCode) {
      await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key, code, windowsVirtualKeyCode: keyCode });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: keyCode });
      await new Promise(r => setTimeout(r, 200));
    }

    // Direct launch into GAME_TRAIN_TRACK
    await send('Runtime.evaluate', {
      expression: `window.app.showView('GAME_TRAIN_TRACK');`
    });

    await new Promise(r => setTimeout(r, 500));

    // Capture Level 1: Letter I
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl1_ready.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl1_ready.png');

    // Press '1' to choose option 1 (correct answer: I)
    await pressKey('1', 'Digit1', 49);

    // Wait 1.0s (mid driving)
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl1_driving.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl1_driving.png');

    // Wait for arrival & automatic transition to Level 2 (total ~3.2s)
    await new Promise(r => setTimeout(r, 3200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl2_ready.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl2_ready.png');

    // Level 2 choices: ['I', 'L', 'S'], correct is L (index 1 -> key '2')
    await pressKey('2', 'Digit2', 50);

    // Wait 1.2s (mid driving corner L)
    await new Promise(r => setTimeout(r, 1200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl2_driving.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl2_driving.png');

    // Wait for Level 3
    await new Promise(r => setTimeout(r, 3200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl3_ready.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl3_ready.png');

    // Level 3 choices: ['T', 'C', 'I'], correct is C (index 1 -> key '2')
    await pressKey('2', 'Digit2', 50);

    // Wait 1.2s (mid driving C loop)
    await new Promise(r => setTimeout(r, 1200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl3_driving.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl3_driving.png');

    // Wait for Level 4
    await new Promise(r => setTimeout(r, 3200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_v2_lvl4_ready.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_v2_lvl4_ready.png');

    // Inspect game state
    const state = await send('Runtime.evaluate', {
      expression: `(() => {
        const g = window.app.games.GAME_TRAIN_TRACK;
        return {
          currentLevel: g.level,
          title: g.currentData.title,
          phase: g.phase,
          targetLetter: g.currentData.targetLetter
        };
      })()`,
      returnByValue: true
    });
    console.log('Final game state:', state.result.value);

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
  }
}

testFullGame();
