import React from 'react'
import Timer from 'components/Timer'
import T from 'utils/time'
import './App.css'

const App = () => (
  <div className='App'>
    <Timer time={ T(30).seconds } />
  </div>
)

export default App
