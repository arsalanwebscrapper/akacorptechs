// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iqzcpzbixjobipomeild.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxemNwemJpeGpvYmlwb21laWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDYwNzYsImV4cCI6MjA2NzYyMjA3Nn0.3KjeodiFTu_e5bbpMtRfyD1K-EDwMTuGaxKEg7tzulk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});