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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/show/:showId" element={<Show />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/episode/:episodeId" element={<Episode />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      
    <AudioPlayer />
  </BrowserRouter>
  )
}

export default App

