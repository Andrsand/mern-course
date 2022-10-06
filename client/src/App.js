import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import 'materialize-css' // импорт стилей

function App() {
  const routes = useRoutes(false) //! добавление роутов. Если не будет работать перед (false) должно быть (isAuthenticated: false) - video 01.03.00
  return (
    <Router>
      <div className='container'>
        {routes} {/* вставляем роуты в качестве контента*/}
      </div>
    </Router>

  )
}

export default App;
