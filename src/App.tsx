import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Explore, Home } from './components';

function App() {

  return (
    <div className="App">
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
          </ul>
        </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
