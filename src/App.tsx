import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Only the home page ships in the first download; each other page loads when it is first opened.
const Projects = lazy(() => import('./pages/Projects'));
const TouTouLe = lazy(() => import('./pages/TouTouLe'));
const Dayweave = lazy(() => import('./pages/Dayweave'));
const GradPlanner = lazy(() => import('./pages/GradPlanner'));
const Grandma = lazy(() => import('./pages/Grandma'));
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
        <Route path="projects/grandma" element={<Grandma />} />
        <Route path="experience" element={<Experience />} />
        <Route path="about" element={<About />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:slug" element={<Note />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
