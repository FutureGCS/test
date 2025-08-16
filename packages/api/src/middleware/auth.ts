import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required for the API service.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required.' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  // The user object from Supabase has an 'id' and 'role' property.
  // The 'role' comes from the 'auth.users' table's 'role' column if it exists.
  // Or it might be in user_metadata. Let's assume it's on the user object directly for now.
  req.user = { userId: user.id, role: user.role || '' };
  next();
};
