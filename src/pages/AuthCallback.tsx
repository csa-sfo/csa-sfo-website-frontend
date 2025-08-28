import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from '@/config/api';

interface JwtPayload {
  sub?: string
  email?: string
  exp?: number
  iat?: number
  [key: string]: any
}

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const extractAccessToken = async (): Promise<void> => {
      const hash = window.location.hash.substring(1) // Remove the '#'
      const params = new URLSearchParams(hash)
      const accessToken = params.get('access_token')
      const csaToken = {"accessToken": accessToken}
      const decoded = jwtDecode<JwtPayload>(accessToken)
      let isProfileCompleted = false
      const response = await fetch(API_ENDPOINTS.VERIFY_PROFILE_COMPLETION, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        isProfileCompleted = data.profile_completed
      }
      const csaUser = {
        email: decoded.email,
        id: decoded.sub,
        profileCompleted: isProfileCompleted,
        name: decoded.user_metadata.full_name
      }

      if (accessToken) {
        localStorage.setItem("csaTokens", JSON.stringify(csaToken))
        localStorage.setItem("csaUser", JSON.stringify(csaUser))
      } else {
        console.warn('No access_token found in URL hash.')
      }
      navigate('/')
      window.location.reload()
    }
    extractAccessToken()
  }, [navigate])

  return <p>Completing login...</p>

}