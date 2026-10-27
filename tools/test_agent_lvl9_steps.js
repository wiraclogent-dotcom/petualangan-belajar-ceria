import { spawn } from 'child_process';
import fs from 'fs';

async function testLevel9Steps() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9241',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1800));

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

    async function pressKey(key, code, keyCode) {
      await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key, code, windowsVirtualKeyCode: keyCode });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: keyCode });
      await new Promise(r => setTimeout(r, 250));
    }

    await send('Runtime.evaluate', {
      expression: `
        window.app.showView('GAME_SECRET_AGENT');
        window.app.games.GAME_SECRET_AGENT.loadLevel(9);
      `
    });

    await new Promise(r => setTimeout(r, 600));

    // Level 9 target sequence: [1, 2] -> 'B' then 'K' for BUKU
    // Step 1: Press '1' ('B')
    await pressKey('1', 'Digit1', 49);
    await new Promise(r => setTimeout(r, 400));

    let shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('secret_agent_lvl9_step1.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved secret_agent_lvl9_step1.png');

    // Step 2: Press '2' ('K')
    await pressKey('2', 'Digit2', 50);
    await new Promise(r => setTimeout(r, 600));

    let shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('secret_agent_lvl9_step2_unlocked.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved secret_agent_lvl9_step2_unlocked.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

testLevel9Steps();
