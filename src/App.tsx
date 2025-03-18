import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router";
import ReservationBoardWrapper from "./pages/ReservationsDashboard/ReservationBoardWrapper";
import AddReservation from "./pages/AddReservation/AddReservation";
import EditReservationWrapper from "./pages/EditReservation/EditReservationWrapper";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <ErrorBoundary
          fallback={
            <div className="error-fallback">⚠️ Something went wrong</div>
          }
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
}

export default App;
