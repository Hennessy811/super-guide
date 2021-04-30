import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlyrqdjprxpqpvnkxcvz.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTc5MTY4OCwiZXhwIjoxOTM1MzY3Njg4fQ.B1AoChWk8Y-lHdI8F1dOxylRmdrUTbpfZHQSt8GfOiQ';
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

export default supabase;
