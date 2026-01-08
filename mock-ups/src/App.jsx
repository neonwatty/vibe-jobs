import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import TalentHub from './pages/TalentHub'
import EmployerHub from './pages/EmployerHub'
import ForEngineers from './pages/ForEngineers'
import ForProduct from './pages/ForProduct'
import JobListings from './pages/JobListings'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const navigate = (page) => setCurrentPage(page)

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage navigate={navigate} />
      case 'talent':
        return <TalentHub navigate={navigate} />
      case 'employers':
        return <EmployerHub navigate={navigate} />
      case 'engineers':
        return <ForEngineers navigate={navigate} />
      case 'product':
        return <ForProduct navigate={navigate} />
      case 'jobs':
        return <JobListings navigate={navigate} />
      case 'signup':
        return <SignupPage navigate={navigate} />
      case 'login':
        return <LoginPage navigate={navigate} />
      default:
        return <LandingPage navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {renderPage()}
    </div>
  )
}

export default App
