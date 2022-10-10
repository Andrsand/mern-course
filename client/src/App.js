import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import 'materialize-css' // импорт стилей


function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token // проверка зарегистрирован пользователь или нет
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className='container'>
          {routes} {/* вставляем роуты в качестве контента*/}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
