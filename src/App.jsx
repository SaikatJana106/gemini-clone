import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import MainCom from './components/Main/MainCom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <MainCom/>
    </>
  )
}

export default App
