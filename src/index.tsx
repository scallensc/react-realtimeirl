import * as ReactDOM from 'react-dom/client';
import App from './App';

import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
  auto: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
