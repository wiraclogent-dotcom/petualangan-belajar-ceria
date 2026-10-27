import { spawn } from 'child_process';
import fs from 'fs';

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const res = await fetch('http://127.0.0.1:9224/json');
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

    const consoleLogs = [];
    ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({ type: data.params.type, args: data.params.args.map(a => a.value) });
      } else if (data.method === 'Runtime.exceptionThrown') {
        consoleLogs.push({ type: 'EXCEPTION', exception: data.params.exceptionDetails });
      }
    });

    await send('Runtime.enable');
    await send('Page.enable');

    // 1. Screenshot Hub
    await new Promise(r => setTimeout(r, 600));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_1_hub.png', Buffer.from(shot.data, 'base64'));

    // Key dispatch helper
    async function pressKey(key, code, keyCode) {
      await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key, code, windowsVirtualKeyCode: keyCode });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: keyCode });
      await new Promise(r => setTimeout(r, 250));
    }

    // Navigate to Tantangan Kreatif in Hub
    // Let's check hub focus first
    let hubState = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          currentView: window.app.currentView,
          focusedIndex: window.app.hub.focusedIndex
        };
      })()`,
      returnByValue: true
    });
    console.log('Initial Hub state:', hubState.result.value);

    // Press ArrowRight or ArrowDown to reach card 4 (5th card, index 4)
    await pressKey('ArrowRight', 'ArrowRight', 39);
    await pressKey('ArrowRight', 'ArrowRight', 39);
    await pressKey('ArrowRight', 'ArrowRight', 39);
    await pressKey('ArrowRight', 'ArrowRight', 39);

    hubState = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          focusedIndex: window.app.hub.focusedIndex,
          cardText: window.app.hub.cards[window.app.hub.focusedIndex]?.innerText
        };
      })()`,
      returnByValue: true
    });
    console.log('Hub state after arrows:', hubState.result.value);

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_2_hub_selected.png', Buffer.from(shot.data, 'base64'));

    // Press Enter to enter Submenu
    await pressKey('Enter', 'Enter', 13);
    await new Promise(r => setTimeout(r, 400));

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_3_submenu.png', Buffer.from(shot.data, 'base64'));

    let subMenuState = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          currentView: window.app.currentView,
          focusedSubIndex: window.app.hub.focusedSubIndex,
          cardsCount: window.app.hub.creativeCards.length
        };
      })()`,
      returnByValue: true
    });
    console.log('SubMenu state:', subMenuState.result.value);

    // Press Enter to start Train Track Architect
    await pressKey('Enter', 'Enter', 13);
    await new Promise(r => setTimeout(r, 600));

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_4_train_game_start.png', Buffer.from(shot.data, 'base64'));

    let gameState = await send('Runtime.evaluate', {
      expression: `(() => {
        const g = window.app.games.GAME_TRAIN_TRACK;
        return {
          currentView: window.app.currentView,
          phase: g.phase,
          levelIndex: g.currentLevelIndex,
          selectedChoice: g.selectedChoiceIndex,
          containerRect: document.getElementById('game-container')?.getBoundingClientRect(),
          arenaRect: document.getElementById('train-track-arena')?.getBoundingClientRect(),
          choicesRect: document.getElementById('train-track-choices-container')?.getBoundingClientRect(),
          isTVScalingActive: document.body.classList.contains('is-tv-native')
        };
      })()`,
      returnByValue: true
    });
    console.log('Game state at start:', gameState.result.value);

    // Press '1' to choose option 1
    await pressKey('1', 'Digit1', 49);
    await new Promise(r => setTimeout(r, 300));

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_5_train_game_option1.png', Buffer.from(shot.data, 'base64'));

    // Wait 1.5s for train driving
    await new Promise(r => setTimeout(r, 1500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_6_train_driving.png', Buffer.from(shot.data, 'base64'));

    // Wait another 2s for level completion / next level
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('diag_7_next_level.png', Buffer.from(shot.data, 'base64'));

    console.log('Console logs caught:', consoleLogs);

    ws.close();
  } catch (err) {
    console.error('Inspection error:', err);
  } finally {
    chrome.kill();
  }
}

run();
