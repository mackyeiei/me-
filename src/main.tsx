import { render } from 'preact';
import { App } from './app';
import { requestPersist } from './lib/persist';
import './styles.css';

render(<App />, document.getElementById('app')!);

// Ask once at startup; Tools > Offline status lets the user retry with a tap (Safari wants a gesture).
requestPersist();
