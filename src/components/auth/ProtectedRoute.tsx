import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  fallbackPath = '/' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-csa-blue"></div>
              <p className="text-gray-600">Checking authentication...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, redirect to home with state to open auth modal
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ 
          from: location.pathname,
          openAuth: true,
          message: requireAdmin 
            ? 'Admin access required. Please sign in with administrator credentials.' 
            : 'Please sign in to access this page.'
        }} 
        replace 
      />
    );
  }

  // If admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-gray-600">
                You don't have permission to access this page.
              </p>
              <p className="text-sm text-gray-500">
                Administrator privileges are required to view this content.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 text-blue-800">
                <Shield className="h-4 w-4" />
                <span className="font-medium text-sm">Current Access Level</span>
              </div>
              <p className="text-blue-700 mt-1">
                Signed in as: <span className="font-medium">{user?.name}</span>
              </p>
              <p className="text-blue-600 text-sm">
                Role: <span className="font-medium capitalize">{user?.role}</span>
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button asChild className="w-full bg-csa-blue hover:bg-csa-blue/90">
                <a href="/">Return to Home</a>
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Need admin access? Contact your administrator.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
}

// Convenience component specifically for admin routes
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAdmin={true}>
      {children}
    </ProtectedRoute>
  );
}