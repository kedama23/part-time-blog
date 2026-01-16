import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Get a single article by ID
export async function GET(request: NextRequest, context: any) {
  const supabase = await createClient()
  const { id } = context.params

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}

// Update an article
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()

  // 修正ポイント: params を await してから分割代入する
  const { id } = await context.params
  const { title, content } = await request.json()
  console.log('Updating article:', { id, title, content })

  const { data, error } = await supabase
    .from('articles')
    .update({
      title,
      content,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  console.log(data, error)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
// Delete an article
export async function DELETE(request: NextRequest, context: any) {
  const supabase = await createClient()
  const { id } = await context.params

  const { error } = await supabase.from('articles').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
