import { spawn } from 'child_process';
import fs from 'fs';

async function testSecretAgent() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const res = await fetch('http://127.0.0.1:9240/json');
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
      await new Promise(r => setTimeout(r, 250));
    }

    // Launch GAME_SECRET_AGENT
    await send('Runtime.evaluate', {
      expression: `window.app.showView('GAME_SECRET_AGENT');`
    });

    await new Promise(r => setTimeout(r, 700));

    // 1. Capture Level 1 initial state (BOLA)
    let shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('secret_agent_lvl1_ready.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved secret_agent_lvl1_ready.png');

    // 2. Press '1' to input 'B' (correct answer for BOLA)
    await pressKey('1', 'Digit1', 49);
    await new Promise(r => setTimeout(r, 600));

    // Capture Unlocked Vault state
    let shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('secret_agent_lvl1_unlocked.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved secret_agent_lvl1_unlocked.png');

    // 3. Wait for auto-advance to Level 2
    await new Promise(r => setTimeout(r, 2600));

    // Capture Level 2 initial state (APEL)
    let shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('secret_agent_lvl2_ready.png', Buffer.from(shot3.data, 'base64'));
    console.log('Saved secret_agent_lvl2_ready.png');

    // 4. Test jump to Level 9 (MOBIL: 2 locked letters)
    await send('Runtime.evaluate', {
      expression: `window.app.games.GAME_SECRET_AGENT.loadLevel(9);`
    });
    await new Promise(r => setTimeout(r, 600));

    let shot4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('secret_agent_lvl9_ready.png', Buffer.from(shot4.data, 'base64'));
    console.log('Saved secret_agent_lvl9_ready.png');

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chrome.kill();
  }
}

testSecretAgent();
