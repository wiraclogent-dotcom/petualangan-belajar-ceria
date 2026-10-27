import { spawn } from 'child_process';
import fs from 'fs';

async function testGridMaze() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9243',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const res = await fetch('http://127.0.0.1:9243/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.url.includes('localhost:5173'));
    if (!pageTab) throw new Error('Tab not found');

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
      await new Promise(r => setTimeout(r, 300));
    }

    // Launch GAME_GRID_MAZE
    await send('Runtime.evaluate', {
      expression: `window.app.showView('GAME_GRID_MAZE');`
    });

    await new Promise(r => setTimeout(r, 700));

    // 1. Capture Level 1 initial state (Apel - A)
    let shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('grid_maze_lvl1_ready.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved grid_maze_lvl1_ready.png');

    // 2. Drive steps:
    // Right (to 1,0)
    await pressKey('ArrowRight', 'ArrowRight', 39);
    // Down (to 1,1)
    await pressKey('ArrowDown', 'ArrowDown', 40);
    // Right (to 2,1)
    await pressKey('ArrowRight', 'ArrowRight', 39);

    let shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('grid_maze_lvl1_stepped.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved grid_maze_lvl1_stepped.png');

    // Down (to 2,2)
    await pressKey('ArrowDown', 'ArrowDown', 40);
    // Right (to 3,2)
    await pressKey('ArrowRight', 'ArrowRight', 39);
    // Down (to 3,3)
    await pressKey('ArrowDown', 'ArrowDown', 40);
    // Right (to 4,3: Goal!)
    await pressKey('ArrowRight', 'ArrowRight', 39);

    await new Promise(r => setTimeout(r, 500));

    let shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('grid_maze_lvl1_goal.png', Buffer.from(shot3.data, 'base64'));
    console.log('Saved grid_maze_lvl1_goal.png');

    // 3. Wait for auto-advance to Level 2
    await new Promise(r => setTimeout(r, 2600));

    let shot4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('grid_maze_lvl2_ready.png', Buffer.from(shot4.data, 'base64'));
    console.log('Saved grid_maze_lvl2_ready.png');

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chrome.kill();
  }
}

testGridMaze();
