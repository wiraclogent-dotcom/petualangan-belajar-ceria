import { spawn } from 'child_process';
import fs from 'fs';

async function captureHtml() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9236',
    '--window-size=1000,900',
    'http://localhost:5173/preview_new_pieces.html'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  try {
    const res = await fetch('http://127.0.0.1:9236/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.url.includes('preview_new_pieces.html'));
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
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('preview_new_pieces.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved preview_new_pieces.png successfully!');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

captureHtml();
