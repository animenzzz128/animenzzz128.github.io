import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Only the home page ships in the first download; each other page loads when it is first opened.
const Projects = lazy(() => import('./pages/Projects'));
const Games = lazy(() => import('./pages/Games'));
const TouTouLe = lazy(() => import('./pages/TouTouLe'));
const Dayweave = lazy(() => import('./pages/Dayweave'));
const GradPlanner = lazy(() => import('./pages/GradPlanner'));
const Grandma = lazy(() => import('./pages/Grandma'));
const Room = lazy(() => import('./pages/Room'));
const Level0 = lazy(() => import('./pages/Level0'));
const Spire = lazy(() => import('./pages/Spire'));
const Experience = lazy(() => import('./pages/Experience'));
const About = lazy(() => import('./pages/About'));
const Notes = lazy(() => import('./pages/Notes'));
const Note = lazy(() => import('./pages/Note'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/toutoule" element={<TouTouLe />} />
        <Route path="projects/dayweave" element={<Dayweave />} />
        <Route path="projects/gradplanner" element={<GradPlanner />} />
        <Route path="games" element={<Games />} />
        <Route path="projects/room" element={<Room />} />
        <Route path="games/grandma" element={<Grandma />} />
        <Route path="games/spire" element={<Spire />} />
        <Route path="games/level0" element={<Level0 />} />
        {/* Grandma moved to the games section; the old link (in the v4 portfolio PDF) still lands on it. */}
        <Route path="projects/grandma" element={<Navigate to="/games/grandma" replace />} />
        <Route path="experience" element={<Experience />} />
        <Route path="about" element={<About />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:slug" element={<Note />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
