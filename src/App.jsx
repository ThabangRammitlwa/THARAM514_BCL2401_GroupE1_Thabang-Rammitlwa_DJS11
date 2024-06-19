import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Show from './components/Show';
import Genre from './components/Genre';
import Episode from './components/Episode';
import ShowList from './components/ShowList';
import Favourites from './components/Favourites';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/episode/:id" element={<Episode />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/favourites" element={<Favourites />} />
    </Routes>
    <AudioPlayer />
  </BrowserRouter>
  )
}

export default App

