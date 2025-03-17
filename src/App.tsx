import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router";
import ReservationBoardWrapper from "./pages/ReservationsDashboard/Wrapper";
import AddReservation from "./pages/AddReservation/AddReservation";
import EditReservation from "./pages/EditReservation/EditReservation";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ReservationBoardWrapper />} />
            <Route path="/add" element={<AddReservation />} />
            <Route path="/edit" element={<EditReservation />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
