import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data: articles, error } = await supabase.from('articles').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { title, content } = await request.json()

  const { data, error } = await supabase.from('articles').insert([{ title, content }]).select()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}