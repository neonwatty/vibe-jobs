import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Auth pages
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import AuthCallback from './pages/auth/AuthCallback'

// Public pages
import JobListings from './pages/public/JobListings'
import JobDetailPage from './pages/public/JobDetailPage'

// Employee pages
import EmployeeDashboard from './pages/employee/Dashboard'
import ProfileSetup from './pages/employee/ProfileSetup'
import Applications from './pages/employee/Applications'

// Placeholder components for pages we haven't built yet
function Placeholder({ title }) {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display text-2xl mb-2">{title}</h1>
        <p className="text-[var(--color-text-muted)]">Coming soon...</p>
      </div>
    </div>
  )
}

// Public page placeholders
const LandingPage = () => <Placeholder title="Landing Page" />
const TalentHub = () => <Placeholder title="For Talent" />
const EmployerHub = () => <Placeholder title="For Employers" />
const ForEngineers = () => <Placeholder title="For Engineers" />
const ForProduct = () => <Placeholder title="For Product" />
const HireEngineers = () => <Placeholder title="Hire Engineers" />
const HireProduct = () => <Placeholder title="Hire Product" />
const TalentListings = () => <Placeholder title="Talent Directory" />
const TalentProfilePage = () => <Placeholder title="Talent Profile" />
const AboutPage = () => <Placeholder title="About" />
const HelpPage = () => <Placeholder title="Help" />

// Employee dashboard placeholders
const ProfileEdit = () => <Placeholder title="Edit Profile" />
const EmployeeMCPSettings = () => <Placeholder title="MCP Settings" />

// Employer dashboard placeholders
const EmployerDashboard = () => <Placeholder title="Employer Dashboard" />
const CompanyProfile = () => <Placeholder title="Company Profile" />
const JobsManager = () => <Placeholder title="Manage Jobs" />
const JobPostNew = () => <Placeholder title="Post New Job" />
const JobEdit = () => <Placeholder title="Edit Job" />
const Applicants = () => <Placeholder title="Applicants" />
const EmployerMCPSettings = () => <Placeholder title="Employer MCP Settings" />

// MCP docs placeholders
const MCPOverview = () => <Placeholder title="MCP Overview" />
const MCPSetup = () => <Placeholder title="MCP Setup" />
const MCPJobSeekers = () => <Placeholder title="MCP for Job Seekers" />
const MCPEmployers = () => <Placeholder title="MCP for Employers" />

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/for/talent" element={<TalentHub />} />
          <Route path="/for/employers" element={<EmployerHub />} />
          <Route path="/for/engineers" element={<ForEngineers />} />
          <Route path="/for/product" element={<ForProduct />} />
          <Route path="/hire/engineers" element={<HireEngineers />} />
          <Route path="/hire/product" element={<HireProduct />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/talent" element={<TalentListings />} />
          <Route path="/talent/:id" element={<TalentProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Auth Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Employee Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute allowedRole="employee">
                <ProfileSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile/edit"
            element={
              <ProtectedRoute allowedRole="employee">
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <ProtectedRoute allowedRole="employee">
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/mcp"
            element={
              <ProtectedRoute allowedRole="employee">
                <EmployeeMCPSettings />
              </ProtectedRoute>
            }
          />

          {/* Employer Protected Routes */}
          <Route
            path="/company"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/profile"
            element={
              <ProtectedRoute allowedRole="employer">
                <CompanyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs/new"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobPostNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs/:id/edit"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/jobs/:id/applicants"
            element={
              <ProtectedRoute allowedRole="employer">
                <Applicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/mcp"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerMCPSettings />
              </ProtectedRoute>
            }
          />

          {/* MCP Docs (public) */}
          <Route path="/docs/mcp" element={<MCPOverview />} />
          <Route path="/docs/mcp/setup" element={<MCPSetup />} />
          <Route path="/docs/mcp/job-seekers" element={<MCPJobSeekers />} />
          <Route path="/docs/mcp/employers" element={<MCPEmployers />} />

          {/* Catch-all redirect to landing */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
