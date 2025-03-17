import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

var date = new Date;
date = date.getFullYear();

createRoot(document.getElementById('root')).render(
  <>
  <div className="container">
    <App />
   </div>
   <div className="copyright">
    <footer className='footer'>
      <p> &copy; {date} <a href="https://vishal9821.github.io/vishal-aagwani/">Vishal Aagwani</a></p>
      </footer>
  </div>
  </>
)
