import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useAuth'
import LoginForm from '../components/auth/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const response = await loginMutation.mutateAsync(credentials)
      navigate('/')
    } catch (error) {
      // Error is handled in the mutation
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Central Stores Inventory
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={loginMutation.isLoading} 
          />
          
          {/* Test accounts hint */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Test Accounts:</h4>
            <div className="text-xs space-y-1">
              <div><strong>Admin:</strong> admin / admin123</div>
              <div><strong>Manager:</strong> manager1 / pass123</div>
              <div><strong>Staff:</strong> staff1 / pass123</div>
              <div><strong>Dept:</strong> dept1 / pass123</div>
              <div><strong>Supplier:</strong> supplier1 / pass123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login