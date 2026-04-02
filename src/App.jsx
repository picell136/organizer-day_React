import React from 'react';
// import { Routes, Route } from 'react-router'
import { Routes, Route, HashRouter } from 'react-router-dom'

import { createBrowserRouter } from 'react-router-dom'

import HomePage from './components/HomePage';
import NotFound404 from './components/NotFound404';

const router = createBrowserRouter([
	{ path: '/', 
	  element: <HomePage />, 
	  errorElement: <NotFound404 />,
	  // children: [
		// 	{
		// 		path: '/show',
		// 		element: <Show />,
		// 	},
		// ], 
	},
])

//

export default function App() {

  return (
	<HashRouter>
		<Routes router={router}>
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<NotFound404 />} />
		</Routes>
	</HashRouter>
  )
}