import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Show from './components/Show';
import Genre from './components/Genre';
import Episode from './components/Episode';
import ShowList from './components/ShowList';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShowList />} />
      <Route path="/show/:showId" element={<Show />} />
      <Route path="/episode/:episodeId" element={<Episode />} />
      <Route path="/genre/:genreId" element={<Genre />} />
    </Routes>
    <AudioPlayer />
  </BrowserRouter>
  )
}

export default App

