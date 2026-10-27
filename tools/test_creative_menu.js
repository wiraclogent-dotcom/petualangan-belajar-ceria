import { spawn } from 'child_process';
import fs from 'fs';

async function testCreativeMenu() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9244',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const res = await fetch('http://127.0.0.1:9244/json');
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

    await send('Runtime.evaluate', {
      expression: `window.app.showView('MENU_CREATIVE');`
    });

    await new Promise(r => setTimeout(r, 600));

    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('creative_menu_all_4_ready.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved creative_menu_all_4_ready.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

testCreativeMenu();
