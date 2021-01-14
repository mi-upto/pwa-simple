import { Workbox } from 'workbox-window';
import '../styles/index.scss';

if (process.env.NODE_ENV === 'production') {
  const wb = new Workbox('/sw.js');
  wb.register();
}