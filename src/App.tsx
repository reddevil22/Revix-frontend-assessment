// import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { CoinDisplay, Explore, Home } from './components';

function App() {

  return (
    <div className="flex flex-col">
      <div>
        <nav className="flex flex-row">
          <div className="p-4 hover:bg-sky-500 rounded-lg">
            <Link to="/" className="hover:bg-white-500">Home</Link>
          </div>
          <div className="p-4 hover:bg-sky-500 rounded-lg">
            <Link to="/explore" className="hover:bg-white-500">Explore</Link>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="explore/:coinId" element={<CoinDisplay />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
