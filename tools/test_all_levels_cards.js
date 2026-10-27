import { spawn } from 'child_process';
import fs from 'fs';

async function testAllLevelsCards() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9237',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  try {
    const res = await fetch('http://127.0.0.1:9237/json');
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

    // Launch into Train Track game
    await send('Runtime.evaluate', {
      expression: `window.app.showView('GAME_TRAIN_TRACK');`
    });

    const levelsToTest = [1, 2, 3, 4, 5, 6, 7, 8];

    for (const lvl of levelsToTest) {
      await send('Runtime.evaluate', {
        expression: `window.app.games.GAME_TRAIN_TRACK.loadLevel(${lvl});`
      });

      await new Promise(r => setTimeout(r, 500));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const filename = `level_${lvl}_cards_preview.png`;
      fs.writeFileSync(filename, Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${filename}`);
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

testAllLevelsCards();
