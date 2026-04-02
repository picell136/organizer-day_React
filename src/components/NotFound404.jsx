import React from 'react'
import { Link } from 'react-router'
import img404 from '../images/404.png'

const NotFound = () => {
  return (
    <div className='container'>
      <div className='content'>
        <div>
            <img src={img404} alt='дед пожимает плечами'/>
        </div>
        <h2>Такой страницы нет</h2>
        <div className='buttonToMain'>
            <Link to="/">
                <button>На главную</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound