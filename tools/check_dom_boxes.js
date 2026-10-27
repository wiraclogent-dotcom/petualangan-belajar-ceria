import { spawn } from 'child_process';

async function check() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const res = await fetch('http://127.0.0.1:9225/json');
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
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        window.app.showView('GAME_TRAIN_TRACK');
        const stage = document.querySelector('.train-stage');
        const socket = document.getElementById('rail-gap-socket');
        const loco = document.getElementById('train-locomotive');
        const topStation = document.querySelector('.station-top');
        const btmStation = document.querySelector('.station-bottom');
        const topTrack = document.querySelector('.vertical-track-top');
        const btmTrack = document.querySelector('.vertical-track-bottom');
        const choices = document.getElementById('train-track-choices-container');
        
        const getBox = el => el ? {
          tag: el.tagName,
          className: el.className,
          rect: el.getBoundingClientRect(),
          top: window.getComputedStyle(el).top,
          left: window.getComputedStyle(el).left,
          width: window.getComputedStyle(el).width,
          height: window.getComputedStyle(el).height,
          transform: window.getComputedStyle(el).transform,
          display: window.getComputedStyle(el).display,
          position: window.getComputedStyle(el).position
        } : null;

        return {
          windowSize: { innerWidth: window.innerWidth, innerHeight: window.innerHeight },
          container: getBox(document.getElementById('game-container')),
          stage: getBox(stage),
          socket: getBox(socket),
          loco: getBox(loco),
          topStation: getBox(topStation),
          btmStation: getBox(btmStation),
          topTrack: getBox(topTrack),
          btmTrack: getBox(btmTrack),
          choices: getBox(choices),
          choiceCards: Array.from(choices.children).map(getBox),
          socketSvg: socket ? socket.innerHTML.substring(0, 300) : ''
        };
      })()`,
      returnByValue: true
    });
    console.log(JSON.stringify(evalRes.result.value, null, 2));
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

check();
