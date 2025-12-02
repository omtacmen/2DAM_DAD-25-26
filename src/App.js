import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/products/:paramName/:category" element={<ProductsPage></ProductsPage>} />
        <Route path="/search" element={<SearchPage></SearchPage>} />


        {/* // Todo lo que no coincida con lo de arriba me va a este */}
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
  );
}

export default App;
