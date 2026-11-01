import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/plus-jakarta-sans/index.css';
import './theme/tokens.css';
import './theme/global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { site } from './config/site';
import { LaunchGate } from './components/launch/LaunchGate';
import PrivacyPage from './pages/PrivacyPage';
import SuccessPage from './pages/SuccessPage';
import WaitlistPage from './pages/WaitlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={site.routes.home}
          element={
            <LaunchGate>
              <WaitlistPage />
            </LaunchGate>
          }
        />
        <Route path={site.routes.success} element={<SuccessPage />} />
        <Route path={site.routes.privacy} element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
