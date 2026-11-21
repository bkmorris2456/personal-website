import './App.css';
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './features/home/Home.jsx';
import Login from './features/login/Login.jsx';
import ProtectedRoute from './features/login/ProtectedRoute.jsx';
import { getPortfolioSection, routes, sectionPath } from './routing/routes';
import { AuthProvider } from './context/AuthContext';
import './assets/fonts/fonts.css';
import { lazy, Suspense, useEffect } from "react";

import UrsusStatus from "./features/brand/UrsusStatus";

const Dashboard = lazy(() => import("./features/dashboard/Dashboard.jsx"));

function PortfolioRoute({ toggleTheme, mode }) {
  const { pathname, hash, search } = useLocation();
  const section = getPortfolioSection(pathname, hash);
  const canonicalPath = sectionPath(section);

  if (pathname !== canonicalPath || hash || search) {
    return <Navigate to={canonicalPath} replace />;
  }

  return <Home section={section} toggleTheme={toggleTheme} mode={mode} />;
}

function App({ toggleTheme, mode }) {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    // Section destinations own scroll restoration, including Back and Forward.
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path={routes.login} element={<Login mode={mode} />}/>
            <Route
              path={routes.dashboard}
              element={
                <ProtectedRoute mode={mode}>
                  <Suspense fallback={
                    <div className="ursus" data-mode={mode}>
                      <div className="u-container"><UrsusStatus state="loading" subject="dashboard" /></div>
                    </div>
                  }>
                    <Dashboard mode={mode} toggleTheme={toggleTheme} />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PortfolioRoute toggleTheme={toggleTheme} mode={mode} />}/>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
