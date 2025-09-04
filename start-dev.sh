#!/bin/bash

# This script passes system environment variables to Vite
source ~/.zshrc

# Pass the environment variables to the Vite dev server
VITE_CSA_SUPABASE_URL=$CSA_SUPABASE_URL \
VITE_CSA_SUPABASE_SERVICE_KEY=$CSA_SUPABASE_SERVICE_KEY \
VITE_CSA_SUPABASE_KEY=$CSA_SUPABASE_KEY \
VITE_CSA_JWT_SECRET_KEY=$CSA_JWT_SECRET_KEY \
VITE_API_BASE_URL_PROD=$API_BASE_URL_PROD \
npm run dev