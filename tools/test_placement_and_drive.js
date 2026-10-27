import { spawn } from 'child_process';
import fs from 'fs';

async function testPlacementAndDrive() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9241',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  try {
    const res = await fetch('http://127.0.0.1:9241/json');
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
    await send('Runtime.evaluate', { expression: `window.app.showView('GAME_TRAIN_TRACK');` });

    // Test Level 4 (Letter S): select choice 0 ('S')
    await send('Runtime.evaluate', { expression: `window.app.games.GAME_TRAIN_TRACK.loadLevel(4);` });
    await new Promise(r => setTimeout(r, 400));

    // Place the piece
    await send('Runtime.evaluate', {
      expression: `window.app.games.GAME_TRAIN_TRACK.handleChoiceSelect(0);`
    });

    // Wait 250ms for piece to be placed and train to start moving
    await new Promise(r => setTimeout(r, 350));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_lvl4_placed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_lvl4_placed.png');

    // Wait 1.2s for train to be in middle of the S curve
    await new Promise(r => setTimeout(r, 1200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_lvl4_driving.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_lvl4_driving.png');

    // Test Level 7 (Letter X): select choice 0 ('X')
    await send('Runtime.evaluate', { expression: `window.app.games.GAME_TRAIN_TRACK.loadLevel(7);` });
    await new Promise(r => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `window.app.games.GAME_TRAIN_TRACK.handleChoiceSelect(0);`
    });
    await new Promise(r => setTimeout(r, 350));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_lvl7_placed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_lvl7_placed.png');

    // Wait 1.2s for train to be in middle of the X crossing
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('train_lvl7_driving.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved train_lvl7_driving.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

testPlacementAndDrive();
