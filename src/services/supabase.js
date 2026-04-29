import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://xhhsyxjyeauffkgiwcbf.supabase.co";
const supabaseKey = "sb_publishable_xgvijVBdthDrxWFGbqImjA_yrU5WlQc";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;