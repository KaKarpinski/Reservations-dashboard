import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import ReservationBoardWrapper from "./pages/ReservationsDashboard/ReservationBoardWrapper";
import AddReservation from "./pages/AddReservation/AddReservation";
import EditReservationWrapper from "./pages/EditReservation/EditReservationWrapper";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";

interface FallbackProps {
  resetErrorBoundary: () => void;
}

const FallbackComponent: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const location = useLocation();

  useEffect(() => {
    resetErrorBoundary();
  }, [location.pathname, resetErrorBoundary]);

  return <div className="error-fallback">⚠️ Something went wrong</div>;
};

const App: React.FC = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <FallbackComponent resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ReservationBoardWrapper />} />
              <Route path="/add" element={<AddReservation />} />
              <Route path="/edit/:id" element={<EditReservationWrapper />} />
            </Routes>
          </main>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};

export default App;
