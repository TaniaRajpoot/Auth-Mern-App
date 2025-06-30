import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handelError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');

    if (!token || !user) {
      navigate('/login');
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged out successfully');
    setTimeout(() => navigate('/login'), 1000);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const result = await response.json();

      const withImages = result.map((p, i) => ({
        ...p,
        image: `https://source.unsplash.com/300x200/?${p.name},product`,
      }));

      setProducts(withImages);
    } catch (err) {
      handelError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
   <div className="home-container">
  <div className="top-bar">
    <div className="welcome"> Welcome, <span className="username">{loggedInUser}</span></div>
 
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  </div>

  <div className="product-grid">
    {products && products.map((item, index) => (
      <div className="product-card" key={index}>
        <div className="product-name">{item.name}</div>
        <div className="product-price">Rs {item.price}</div>
      </div>
    ))}
  </div>
   <ToastContainer/>
</div>



     
 
  );
}

export default Home;
