import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import TalentHub from './pages/TalentHub'
import EmployerHub from './pages/EmployerHub'
import ForEngineers from './pages/ForEngineers'
import ForProduct from './pages/ForProduct'
import JobListings from './pages/JobListings'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

// Batch 1: Core Differentiators
import ProfileSetup from './pages/ProfileSetup'
import JobPostNew from './pages/JobPostNew'
import JobDetail from './pages/JobDetail'
import TalentProfile from './pages/TalentProfile'

// Batch 2: Dashboard & Browse
import TalentListings from './pages/TalentListings'
import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeApplications from './pages/EmployeeApplications'
import EmployerDashboard from './pages/EmployerDashboard'
import EmployerJobs from './pages/EmployerJobs'
import EmployerApplicants from './pages/EmployerApplicants'

// Batch 3: Employer Hiring Pages
import HireEngineers from './pages/HireEngineers'
import HireProduct from './pages/HireProduct'

// Batch 4: Support Pages
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import CompanyProfile from './pages/CompanyProfile'
import JobEdit from './pages/JobEdit'

// Batch 5: MCP Documentation
import MCPOverview from './pages/MCPOverview'
import MCPSetup from './pages/MCPSetup'
import MCPJobSeekers from './pages/MCPJobSeekers'
import MCPEmployers from './pages/MCPEmployers'

// Batch 6: MCP Token Pages
import EmployeeMCP from './pages/EmployeeMCP'
import EmployerMCP from './pages/EmployerMCP'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const navigate = (page) => setCurrentPage(page)

  const renderPage = () => {
    switch (currentPage) {
      // Original pages
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

      // Batch 1: Core Differentiators
      case 'profile-setup':
        return <ProfileSetup navigate={navigate} />
      case 'job-post-new':
        return <JobPostNew navigate={navigate} />
      case 'job-detail':
        return <JobDetail navigate={navigate} />
      case 'talent-profile':
        return <TalentProfile navigate={navigate} />

      // Batch 2: Dashboard & Browse
      case 'talent-listings':
        return <TalentListings navigate={navigate} />
      case 'dashboard':
        return <EmployeeDashboard navigate={navigate} />
      case 'applications':
        return <EmployeeApplications navigate={navigate} />
      case 'employer-dashboard':
        return <EmployerDashboard navigate={navigate} />
      case 'employer-jobs':
        return <EmployerJobs navigate={navigate} />
      case 'employer-applicants':
        return <EmployerApplicants navigate={navigate} />

      // Batch 3: Employer Hiring Pages
      case 'hire-engineers':
        return <HireEngineers navigate={navigate} />
      case 'hire-product':
        return <HireProduct navigate={navigate} />

      // Batch 4: Support Pages
      case 'about':
        return <AboutPage navigate={navigate} />
      case 'help':
        return <HelpPage navigate={navigate} />
      case 'company-profile':
        return <CompanyProfile navigate={navigate} />
      case 'job-edit':
        return <JobEdit navigate={navigate} />

      // Batch 5: MCP Documentation
      case 'mcp-overview':
        return <MCPOverview navigate={navigate} />
      case 'mcp-setup':
        return <MCPSetup navigate={navigate} />
      case 'mcp-job-seekers':
        return <MCPJobSeekers navigate={navigate} />
      case 'mcp-employers':
        return <MCPEmployers navigate={navigate} />

      // Batch 6: MCP Token Pages
      case 'employee-mcp':
        return <EmployeeMCP navigate={navigate} />
      case 'employer-mcp':
        return <EmployerMCP navigate={navigate} />

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
