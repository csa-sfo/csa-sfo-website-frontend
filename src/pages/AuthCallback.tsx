import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from '@/config/api';
import { supabase } from '@/lib/supabase';

interface JwtPayload {
  sub?: string
  email?: string
  exp?: number
  iat?: number
  [key: string]: any
}

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Processing login...')

  useEffect(() => {
    const extractAccessToken = async (): Promise<void> => {
      // First, try to get the session from Supabase (handles OAuth callback automatically)
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      let accessToken = null
      
      if (session?.access_token) {
        accessToken = session.access_token
      } else {
        // Fallback: try to get from URL hash (for direct hash-based OAuth)
        const hash = window.location.hash.substring(1) // Remove the '#'
        const params = new URLSearchParams(hash)
        accessToken = params.get('access_token')
        
        if (!accessToken) {
          setStatus('Login failed. Redirecting...')
          setTimeout(() => navigate('/'), 2000)
          return
        }
      }

      const csaToken = {"accessToken": accessToken}
      const decoded = jwtDecode<JwtPayload>(accessToken)
      
      // Extract name from user_metadata (LinkedIn uses 'name', Google might use 'full_name')
      const userName = decoded.user_metadata?.name || decoded.user_metadata?.full_name || decoded.email?.split('@')[0] || 'User';
      
      // Check if this is a LinkedIn login (provider is linkedin or linkedin_oidc)
      const isLinkedIn = decoded.app_metadata?.provider === 'linkedin' || 
                         decoded.app_metadata?.provider === 'linkedin_oidc' ||
                         decoded.app_metadata?.providers?.includes('linkedin') ||
                         decoded.app_metadata?.providers?.includes('linkedin_oidc')
      
      // If LinkedIn login, extract LinkedIn data and call backend upsert
      let isAdmin = false
      let adminToken = null
      if (isLinkedIn) {
        // LinkedIn OIDC provides limited data in user_metadata
        // Check all possible field names
        const metadata = decoded.user_metadata || {};
        
        // Parse full name into given_name and family_name if needed
        const givenName = metadata.given_name || metadata.firstName || '';
        const familyName = metadata.family_name || metadata.lastName || '';
        
        const linkedinData = {
          id: decoded.sub,  // Include Supabase user ID
          email: decoded.email,
          name: userName,
          linkedin_id: metadata.provider_id || metadata.sub || metadata.id || '',
          // LinkedIn OIDC doesn't provide headline by default - would need additional API call
          headline: metadata.headline || metadata.tagline || metadata.position || '',
          avatar_url: metadata.picture || metadata.avatar_url || metadata.profile_picture || '',
          // Company name might be in different fields
          company_name: metadata.company_name || metadata.organization || metadata.company || '',
          // Additional fields from LinkedIn
          given_name: givenName,
          family_name: familyName,
          locale: metadata.locale || '',
        }
        try {
          // Call backend upsert endpoint
          const upsertResponse = await fetch(API_ENDPOINTS.LINKEDIN_UPSERT || `${API_ENDPOINTS.LINKEDIN_LOGIN.replace('/linkedin-login', '/upsert')}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(linkedinData),
          })
          
          if (upsertResponse.ok) {
            const upsertData = await upsertResponse.json();
            
            // Get admin status from backend response
            isAdmin = upsertData.is_admin || false
            
            // If admin, get admin token from backend
            if (isAdmin) {
              try {
                const adminCheckResponse = await fetch(API_ENDPOINTS.ADMIN_CHECK, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email: decoded.email }),
                });
                
                if (adminCheckResponse.ok) {
                  const adminResult = await adminCheckResponse.json();
                  if (adminResult.is_admin && adminResult.admin_token) {
                    adminToken = adminResult.admin_token;
                  }
                }
              } catch (adminError) {
                // Silent error handling
              }
            }
          }
        } catch (error) {
          // Silent error handling
        }
      }
      
      // Verify profile completion
      let isProfileCompleted = false
      try {
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
      } catch (error) {
        // Silent error handling
      }
      
      const csaUser = {
        email: decoded.email,
        id: decoded.sub,
        profileCompleted: isProfileCompleted,
        name: userName,
        isAdmin: isAdmin,
        role: isAdmin ? 'admin' : 'user'
      }

      // If admin token was obtained, use it instead of the Supabase token
      const tokenToStore = adminToken ? { accessToken: adminToken } : csaToken
      
      localStorage.setItem("csaTokens", JSON.stringify(tokenToStore))
      localStorage.setItem("csaUser", JSON.stringify(csaUser))
      
      setStatus('Login successful! Redirecting...')
      
      // Redirect admin users to admin page, regular users to home
      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin')
        } else {
          navigate('/')
        }
        window.location.reload()
      }, 500)
    }
    extractAccessToken()
  }, [navigate])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <p>{status}</p>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  )

}