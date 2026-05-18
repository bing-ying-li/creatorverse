import { createClient } from "@supabase/supabase-js";

const URL = "https://tptitqyqhlivmlxhguzt.supabase.co";
const API_KEY = "sb_publishable_-r81nr75PJKaDYlepr91SA_IUb1isok";

export const supabase = createClient(URL, API_KEY);
