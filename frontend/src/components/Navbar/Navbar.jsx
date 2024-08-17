import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links = [
    { title: 'Home', link: '/' },
    { title: 'All Books', link: '/all-books' },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // If the user is logged in, check their role
  if (isLoggedIn) {
    if (role === "admin") {
      // Show only Home, All Books, and Profile for admins
      links.push({ title: 'Profile', link: '/profile' });
    } else {
      // Show additional links for regular users
      links.push(
        { title: 'Cart', link: '/cart' },
        { title: 'Profile', link: '/profile' }
      );
    }
  }

  const [mobileNav, setMobileNav] = useState(false); // Use boolean for mobile nav state

  // Function to render links
  const renderLinks = () => (
    links.map((item, i) => (
      <Link 
        key={i} 
        to={item.link} 
        className={`flex items-center text-lg px-4 py-2 rounded transition-all duration-300 ${item.title === "Profile" ? 'border border-blue-500 hover:bg-white hover:text-zinc-800' : 'hover:text-blue-500'}`}
      >
        {item.title}
      </Link>
    ))
  );

  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-4 py-4 items-center justify-between md:px-8'>
        <Link to="/" className='flex items-center'>
          <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
          <h1 className='text-2xl font-semibold'>BookStore</h1>
        </Link>
        <div className='md:hidden'>
          <button onClick={() => setMobileNav(!mobileNav)} className='text-white text-2xl hover:text-zinc-400' aria-label="Toggle navigation">
            <FaGripLines />
          </button>
        </div>
        <div className={`nav-links-heaven items-center gap-4 ${mobileNav ? 'block' : 'hidden'} md:flex`}>
          <div className='hidden md:flex gap-4'>
            {renderLinks()}
          </div>
          {!isLoggedIn && (
            <>
              <Link
                to="/LogIn"
                className='text-lg font-semibold px-6 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
              >
                LogIn
              </Link>
              <Link 
                to="/SignUp" 
                className='text-lg font-semibold px-6 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className={`${mobileNav ? 'block' : 'hidden'} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300`}>
        {renderLinks()}
        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className='text-lg font-semibold px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              LogIn
            </Link>
            <Link 
              to="/SignUp" 
              className='text-lg font-semibold px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;