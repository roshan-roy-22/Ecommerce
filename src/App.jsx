import Home from './Pages/Home';
import Cart from './Pages/Cart';
import View from './Pages/View';
import Wishlist from './Pages/Wishlist';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
