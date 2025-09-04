# Supabase OTP Authentication Setup Guide

## ✅ Implementation Complete

The authentication system has been successfully migrated from password-based to OTP-based authentication using Supabase.

## 🔧 Required Configuration

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Get Supabase Credentials

1. Visit [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**

### 3. Supabase Project Configuration

#### Enable Email Authentication:
- Go to **Authentication** → **Settings** → **Auth Providers**
- Enable **Email** provider
- Configure SMTP settings (or use Supabase default)

#### Optional - Customize Email Templates:
- Go to **Authentication** → **Settings** → **Email Templates**
- Customize the "Magic Link" template for OTP emails

## 📱 User Flows Implemented

### Sign Up Flow:
1. User enters: Full Name + Organization + Email
2. Clicks "Send OTP" 
3. Form transitions to OTP verification (6-digit input)
4. User receives email with OTP code
5. Enters OTP with 5-minute timer
6. Account created and logged in automatically

### Login Flow:
1. User enters: Email only
2. Clicks "Send OTP"
3. Form transitions to OTP verification
4. User receives email with OTP code
5. Enters OTP with timer
6. Logged in automatically

## 🎨 UI Features

- ✅ Smooth animated transitions between forms
- ✅ 6-digit OTP input with auto-focus progression
- ✅ 5-minute countdown timer with visual feedback
- ✅ Resend OTP functionality
- ✅ Back navigation to edit email
- ✅ Loading states and error handling
- ✅ Responsive design maintained

## 🔄 Technical Implementation

### Files Modified:
- `src/components/auth/AuthModal.tsx` - Complete UI overhaul
- `src/contexts/AuthContext.tsx` - Added OTP authentication methods  
- `src/lib/supabase.ts` - Supabase client configuration
- `src/components/ui/otp-input.tsx` - OTP input component

### New Dependencies:
- `@supabase/supabase-js` - Supabase client library
- `input-otp` - Already available for OTP input UI

### Key Functions Added:
- `sendOTP()` - Sends OTP via Supabase with user_metadata
- `verifyOTP()` - Verifies OTP code and retrieves user_metadata  
- `updateUserMetadata()` - Updates user data in Supabase auth.users
- `loginWithOtp()` - Handles OTP-based login using user_metadata
- `signupWithOtp()` - Handles OTP-based signup using user_metadata

### User Metadata Structure:
```json
{
  "name": "John Doe",
  "full_name": "John Doe",
  "display_name": "John Doe",
  "organization": "Acme Corporation"
}
```

### Database Storage:
- **Table**: `auth.users`
- **Primary Column**: `user_metadata` (JSONB) - Stores all custom user data
- **Display Column**: `display_name` (TEXT) - Also populated with user's name
- **Email Column**: `email` (TEXT) - User's email address

### Data Flow:
1. **Signup**: User data sent via `sendOTP()` → Stored in `user_metadata`
2. **Login**: User data retrieved from `user_metadata` → Displayed in UI
3. **Profile**: Shows `name` and `organization` from `user_metadata`

## 🔒 Security & Supabase Authentication

- Supabase handles OTP generation and verification
- **User data stored in Supabase user_metadata** - Standard practice
- Name and organization stored in `auth.users.user_metadata` JSONB column
- All UI features (profiles, navigation, etc.) work seamlessly
- Session management through Supabase auth + user metadata
- No reliance on session storage or local storage for user data

## 🧪 Production Setup Requirements

**Important**: This implementation requires a properly configured Supabase project.

### Required Configuration:
- ✅ Valid Supabase project URL and anon key
- ✅ Email authentication enabled in Supabase
- ✅ SMTP settings configured (for OTP emails)
- ✅ Environment variables properly set

## 🚀 Production Setup

1. Set up Supabase project and get credentials
2. Add environment variables to `.env` file
3. Test with real email addresses
4. Customize email templates if needed
5. Deploy and monitor

## 🐛 Debugging

The system includes comprehensive logging:
- Check browser console for detailed flow information
- OTP verification steps are logged
- User metadata storage and retrieval is logged
- Supabase authentication flow is tracked

### Common Issues:
- **OTP not received**: Check SMTP configuration in Supabase
- **User metadata not saved**: Verify data permissions in Supabase
- **Authentication fails**: Check environment variables and project settings

The authentication system is now password-free and provides a modern, secure OTP-based experience!
