import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isDemoMode = !supabaseUrl || !supabaseAnonKey;

export const supabase = !isDemoMode
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (isDemoMode) {
  console.info('AvtoQism is running in DEMO MODE (Local storage mock data enabled)');
}
