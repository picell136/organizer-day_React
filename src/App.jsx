import React from 'react';
// import { Routes, Route } from 'react-router'
import { Routes, Route } from 'react-router-dom'

import { createBrowserRouter } from 'react-router-dom'

import HomePage from './components/HomePage';
import NotFound404 from './components/NotFound404';
import Show from './components/Show';

const router = createBrowserRouter([
	{ path: '/', 
	  element: <HomePage />, 
	  errorElement: <NotFound404 />,
	  children: [
			{
				// path: '/show',
				element: <Show />,
			},
		], 
	},
])

//

export default function App() {

  return (
		<Routes router={router}>
			<Route path="/" element={<HomePage />} />
			<Route path="/show" element={<Show />} />
			<Route path="*" element={<NotFound404 />} />
		</Routes>
  )
}