import './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Articles from './components/Articles.tsx'
import PostDetail from './components/PostDetail.tsx'
import Contact from './contacts/Contact.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>

  );
}