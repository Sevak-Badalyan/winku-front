

import React, { useState, lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import OpenRoute from './components/OpenRoute/OpenRoute';
import Loader from './components/Loader/Loader';

const LazyHome = lazy(() => import('./pages/Home/Home'));
const LazyNewsfeed = lazy(() => import('./pages/Newsfeed/Newsfeed'));
const LazyPhotos = lazy(() => import('./components/Photos/Photos'));
const LazyMessages = lazy(() => import('./components/Messages/Messages'));

const LazyRegister = lazy(() => import('./pages/Register/Register'));
const LazyFriendspage = lazy(() => import('./components/Friendspage/Friendspage'));
const LazyTimeline = lazy(() => import('./components/Timeline/Timeline'));
const LazyLogin = lazy(() => import('./pages/Login/Login'));

function App() {
  const [count, setCount] = useState(0);

  return (
 <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>

          <Route path='/' element={<Suspense fallback={<Loader/>}> <LazyHome /></Suspense>} >


            <Route path='photos' element={<Suspense fallback={<Loader/>}> <LazyPhotos /></Suspense>}  />
            <Route path='friendspage' element={<Suspense fallback={<Loader/>}> <LazyFriendspage/></Suspense>}  />
            <Route path='' element={<Suspense fallback={<Loader/>}> <LazyTimeline/></Suspense>}  />
            <Route path='messages' element={<Suspense fallback={<Loader/>}> <LazyMessages /></Suspense>}  />

          </Route>
          <Route path='/newsfeed' element={<Suspense fallback={<Loader/>}> <LazyNewsfeed /></Suspense>}  />
        </Route>

        <Route path="/auth/" element={<OpenRoute />}>
          <Route path='login' element={<Suspense fallback={<Loader/>}> <LazyLogin /></Suspense>} />
          <Route path='register' element={<Suspense fallback={<Loader/>}> <LazyRegister /></Suspense>} />
        </Route>

      </Routes >
   </>
  );
}

export default App;
