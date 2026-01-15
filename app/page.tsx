"use client"

import { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const res = await fetch('/api/articles')
    const data = await res.json()
    setArticles(Array.isArray(data) ? data : [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingArticleId) {
      // Update article
      const res = await fetch(`/api/articles/${editingArticleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })
      const updatedArticle = await res.json()
      setArticles(articles.map((article) => (article.id === editingArticleId ? updatedArticle : article)))
      setEditingArticleId(null)
    } else {
      // Create new article
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })
      const newArticle = await res.json()
      setArticles([...articles, newArticle])
    }
    setTitle('')
    setContent('')
  }

  const handleEdit = (article: Article) => {
    setTitle(article.title)
    setContent(article.content)
    setEditingArticleId(article.id)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    })
    setArticles(articles.filter((article) => article.id !== id))
  }

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setEditingArticleId(null);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">アルバイト体験談記事</h1>

      {/* Article Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingArticleId ? '記事を編集' : '新しい記事を作成'}
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            タイトル:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            内容:
          </label>
          <textarea
            id="content"
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingArticleId ? '更新' : '作成'}
          </button>
          {editingArticleId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              キャンセル
            </button>
          )}
        </div>
      </form>

      {/* Article List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">記事一覧</h2>
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">記事がありません。新しい記事を作成してください。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-4">{article.content}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}