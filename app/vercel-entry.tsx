import { createRoot } from 'react-dom/client';
import Page from './page';
import './globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('The application root is missing.');
createRoot(root).render(<Page />);
