

import React, { useState, lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import OpenRoute from './components/OpenRoute/OpenRoute';
import Loader from './components/Loader/Loader';
import SkeletonPosts from './components/Posts/SkeletonPosts';
import LoaderMin from './components/Loader/LoaderMin';
import LoaderMax from './components/Loader/LoaderMax';
import SkeletonMes from './components/Messages/SkeletonMes';

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

          <Route path='/' element={<Suspense fallback={<LoaderMax/>}> <LazyHome /></Suspense>} >


            <Route path='photos' element={<Suspense fallback={<LoaderMin/>}> <LazyPhotos /></Suspense>}  />
            <Route path='friendspage' element={<Suspense fallback={<LoaderMin/>}> <LazyFriendspage/></Suspense>}  />
            <Route path='' element={<Suspense fallback={<SkeletonPosts/> }> <LazyTimeline/></Suspense>}  />
            <Route path='messages' element={<Suspense fallback={<SkeletonMes/>}> <LazyMessages /></Suspense>}  />

          </Route>
          <Route path='/newsfeed' element={<Suspense fallback={<LoaderMax/>}> <LazyNewsfeed /></Suspense>}  />
        </Route>

        <Route path="/auth/" element={<OpenRoute />}>
          <Route path='login' element={<Suspense fallback={<LoaderMax/>}> <LazyLogin /></Suspense>} />
          <Route path='register' element={<Suspense fallback={<LoaderMax/>}> <LazyRegister /></Suspense>} />
        </Route>

      </Routes >
   </>
  );
}

export default App;
