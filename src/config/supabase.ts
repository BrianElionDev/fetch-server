import { createClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';
configDotenv();
const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
