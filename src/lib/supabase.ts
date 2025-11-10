import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;
let initError: string | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  initError = 'Missing Supabase environment variables';
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    initError = 'Failed to initialize Supabase';
  }
}

export { supabase, initError };
