import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
// We prioritize the Service Role key for secure backend edge functions.
// If it's missing (e.g., strictly client-side), it falls back to the ANON key.
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables. Check your .env file.");
}

// Initialize the Supabase client for Cloudflare Edge
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // CRITICAL FOR CLOUDFLARE EDGE: 
    // Edge workers cannot access traditional local storage or cookies out-of-the-box.
    // Disabling persistence prevents the Edge worker from crashing on lead capture.
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});