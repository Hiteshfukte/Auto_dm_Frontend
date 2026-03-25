import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Redirect to login page
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  });
}
