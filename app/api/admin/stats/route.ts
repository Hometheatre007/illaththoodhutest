import { NextResponse, NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  // Optional: Verify admin token first
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {} // Read-only for stats
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Mock stats for dashboard (Can be replaced with actual DB queries later)
  return NextResponse.json({ 
    stats: {
      totalArticles: 142,
      totalReaders: 12400,
      pageViews: 84200,
      subscribers: 3892
    },
    activity: [
      { id: 1, action: 'Published new article', user: 'Admin', time: '2h ago' },
      { id: 2, action: 'Uploaded 5 photos to gallery', user: 'Admin', time: '5h ago' },
      { id: 3, action: 'Updated settings', user: 'Admin', time: '1d ago' },
    ]
  });
}
