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
      
      if (!accessToken) {
        console.warn('No access_token found in URL hash.')
        navigate('/')
        return
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
      
      console.log('🔗 Is LinkedIn login?', isLinkedIn)
      
      // If LinkedIn login, extract LinkedIn data and call backend upsert
      let isAdmin = false
      if (isLinkedIn) {
        // LinkedIn OIDC provides limited data in user_metadata
        // Check all possible field names
        const metadata = decoded.user_metadata || {};
        
        // Parse full name into given_name and family_name if needed
        const givenName = metadata.given_name || metadata.firstName || '';
        const familyName = metadata.family_name || metadata.lastName || '';
        
        const linkedinData = {
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
          } else {
            console.error('❌ Failed to upsert LinkedIn data:', await upsertResponse.text())
          }
        } catch (error) {
          console.error('❌ Error upserting LinkedIn data:', error)
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
        console.error('Error verifying profile completion:', error)
      }
      
      const csaUser = {
        email: decoded.email,
        id: decoded.sub,
        profileCompleted: isProfileCompleted,
        name: userName,
        isAdmin: isAdmin,
        role: isAdmin ? 'admin' : 'user'
      }

      localStorage.setItem("csaTokens", JSON.stringify(csaToken))
      localStorage.setItem("csaUser", JSON.stringify(csaUser))
      
      console.log('💾 Saved user to localStorage:', csaUser)
      
      // Redirect admin users to admin page, regular users to home
      if (isAdmin) {
        navigate('/admin')
      } else {
        navigate('/')
      }
      window.location.reload()
    }
    extractAccessToken()
  }, [navigate])

  return <p>Completing login...</p>

}