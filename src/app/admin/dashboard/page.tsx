'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Announcement, AnnouncementCategory } from '@/types/announcement';
import { CATEGORY_LABELS } from '@/types/announcement';

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Announcement[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Announcement | null>(null);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/verify');
        if (res.ok) {
          setAuthenticated(true);
          loadPosts();
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadPosts();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (post: Announcement) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Wald Lab 관리자
            </h1>
            <p className="text-sm text-gray-600">게시판 관리</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showEditor ? (
          <PostEditor
            post={editingPost}
            onSave={() => {
              setShowEditor(false);
              setEditingPost(null);
              loadPosts();
            }}
            onCancel={() => {
              setShowEditor(false);
              setEditingPost(null);
            }}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                전체 게시글 ({posts.length})
              </h2>
              <button
                onClick={handleNewPost}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              >
                + 새 게시글
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      날짜
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {post.title.ko}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {post.excerpt.ko}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {CATEGORY_LABELS[post.category]?.ko || post.tag.ko}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {posts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  게시글이 없습니다. 새 게시글을 작성해보세요.
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Post Editor Component
function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: Announcement | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Announcement>>(
    post || {
      id: '',
      date: new Date().toISOString().split('T')[0],
      category: 'notice',
      tag: { ko: '공지', en: 'Notice' },
      title: { ko: '', en: '' },
      excerpt: { ko: '', en: '' },
      body: { ko: '', en: '' },
    }
  );
  const [saving, setSaving] = useState(false);

  const handleCategoryChange = (category: AnnouncementCategory) => {
    const labels = CATEGORY_LABELS[category];
    setFormData({
      ...formData,
      category,
      tag: labels,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = post ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('저장되었습니다.');
        onSave();
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {post ? '게시글 수정' : '새 게시글 작성'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as AnnouncementCategory)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="update">업데이트</option>
            <option value="tech-news">기술소식</option>
            <option value="insight">인사이트</option>
            <option value="notice">공지</option>
            <option value="ip">지적재산권</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            날짜
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Title KO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 (한국어)
          </label>
          <input
            type="text"
            value={formData.title?.ko}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: { ...formData.title!, ko: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Title EN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 (English)
          </label>
          <input
            type="text"
            value={formData.title?.en}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: { ...formData.title!, en: e.target.value },
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Excerpt KO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            요약 (한국어)
          </label>
          <textarea
            value={formData.excerpt?.ko}
            onChange={(e) =>
              setFormData({
                ...formData,
                excerpt: { ...formData.excerpt!, ko: e.target.value },
              })
            }
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Excerpt EN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            요약 (English)
          </label>
          <textarea
            value={formData.excerpt?.en}
            onChange={(e) =>
              setFormData({
                ...formData,
                excerpt: { ...formData.excerpt!, en: e.target.value },
              })
            }
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Body KO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            본문 (한국어)
          </label>
          <textarea
            value={formData.body?.ko}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: { ...formData.body!, ko: e.target.value },
              })
            }
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Body EN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            본문 (English)
          </label>
          <textarea
            value={formData.body?.en}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: { ...formData.body!, en: e.target.value },
              })
            }
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ID (for edit only) */}
        {post && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID (수정 불가)
            </label>
            <input
              type="text"
              value={formData.id}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
            />
          </div>
        )}

        {/* New ID (for new post only) */}
        {!post && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID (선택사항, 비워두면 자동 생성)
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder="예: new-service-2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
