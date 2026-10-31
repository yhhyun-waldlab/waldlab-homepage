'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Announcement, AnnouncementCategory } from '@/types/announcement';
import { CATEGORY_LABELS } from '@/types/announcement';

type Tab = 'posts' | 'inquiries';

type Inquiry = {
  id: string;
  service: string;
  org_name: string;
  contact_name: string;
  position?: string | null;
  phone: string;
  email: string;
  inquiry: string;
  status: 'pending' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
};

const STATUS_LABELS: Record<string, { ko: string; color: string }> = {
  pending: { ko: '대기', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { ko: '진행중', color: 'bg-blue-100 text-blue-800' },
  completed: { ko: '완료', color: 'bg-green-100 text-green-800' },
  archived: { ko: '보관', color: 'bg-gray-100 text-gray-800' },
};

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [posts, setPosts] = useState<Announcement[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Announcement | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/verify');
        if (res.ok) {
          setAuthenticated(true);
          loadPosts();
          loadInquiries();
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

  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error('Failed to load inquiries:', error);
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

  const handleDeleteInquiry = async (id: string) => {
    if (
      !confirm(
        '해당 문의 내역을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.',
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        setSelectedInquiry(null);
      } else {
        alert('문의 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Inquiry delete failed:', error);
      alert('문의 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        loadInquiries();
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: status as any });
        }
      } else {
        alert('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Status update failed:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
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

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Wald Lab 관리자
            </h1>
            <p className="text-sm text-gray-600">게시판 관리 및 문의사항 확인</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              게시판 관리 ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                activeTab === 'inquiries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              문의사항 ({inquiries.length})
              {pendingCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'posts' ? (
          showEditor ? (
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
            <PostsTab
              posts={posts}
              onNewPost={handleNewPost}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
        ) : (
          <InquiriesTab
            inquiries={inquiries}
            selectedInquiry={selectedInquiry}
            onSelect={setSelectedInquiry}
            onUpdateStatus={handleUpdateInquiryStatus}
            onDelete={handleDeleteInquiry}
          />
        )}
      </main>
    </div>
  );
}

// Posts Tab Component
function PostsTab({
  posts,
  onNewPost,
  onEdit,
  onDelete,
}: {
  posts: Announcement[];
  onNewPost: () => void;
  onEdit: (post: Announcement) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          전체 게시글 ({posts.length})
        </h2>
        <button
          onClick={onNewPost}
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
                    onClick={() => onEdit(post)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
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
  );
}

// Inquiries Tab Component
function InquiriesTab({
  inquiries,
  selectedInquiry,
  onSelect,
  onUpdateStatus,
  onDelete,
}: {
  inquiries: Inquiry[];
  selectedInquiry: Inquiry | null;
  onSelect: (inquiry: Inquiry | null) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inquiry List */}
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          문의 목록 ({inquiries.length})
        </h2>
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
          {inquiries.map((inquiry) => (
            <button
              key={inquiry.id}
              onClick={() => onSelect(inquiry)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                selectedInquiry?.id === inquiry.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-gray-900 truncate flex-1">
                  {inquiry.org_name}
                </div>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                    STATUS_LABELS[inquiry.status]?.color
                  }`}
                >
                  {STATUS_LABELS[inquiry.status]?.ko}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{inquiry.contact_name}</div>
              <div className="text-xs text-gray-500">
                {new Date(inquiry.created_at).toLocaleString('ko-KR')}
              </div>
            </button>
          ))}

          {inquiries.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              문의사항이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail */}
      <div className="lg:col-span-2">
        {selectedInquiry ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">문의 상세</h2>
              <button
                onClick={() => onSelect(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Status Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  처리 상태
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => onUpdateStatus(selectedInquiry.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">대기</option>
                  <option value="in_progress">진행중</option>
                  <option value="completed">완료</option>
                  <option value="archived">보관</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">서비스</span>
                  <p className="mt-1 text-gray-900">{selectedInquiry.service}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">기관/회사명</span>
                  <p className="mt-1 text-gray-900">{selectedInquiry.org_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">담당자명</span>
                  <p className="mt-1 text-gray-900">{selectedInquiry.contact_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">직책 / 부서</span>
                  <p className="mt-1 text-gray-900">
                    {selectedInquiry.position?.trim() ? selectedInquiry.position : "—"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">연락처</span>
                  <p className="mt-1 text-gray-900">
                    <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">
                      {selectedInquiry.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">이메일</span>
                  <p className="mt-1 text-gray-900">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">상세 문의 내용</span>
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {selectedInquiry.inquiry}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">접수일시</span>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedInquiry.created_at).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">수정일시</span>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedInquiry.updated_at).toLocaleString('ko-KR')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(selectedInquiry.id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 rounded-md border border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  문의 삭제
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            문의를 선택하면 상세 내용을 확인할 수 있습니다.
          </div>
        )}
      </div>
    </div>
  );
}

// Post Editor Component (기존과 동일)
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

  const fieldClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-2';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {post ? '게시글 수정' : '새 게시글 작성'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta: category, date, ID — one row on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>카테고리</label>
            <select
              value={formData.category}
              onChange={(e) =>
                handleCategoryChange(e.target.value as AnnouncementCategory)
              }
              className={fieldClass}
              required
            >
              <option value="update">업데이트</option>
              <option value="tech-news">기술소식</option>
              <option value="insight">인사이트</option>
              <option value="notice">공지</option>
              <option value="ip">지적재산권</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>날짜</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={fieldClass}
              required
            />
          </div>

          <div>
            {post ? (
              <>
                <label className={labelClass}>ID (수정 불가)</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className={`${fieldClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
                />
              </>
            ) : (
              <>
                <label className={labelClass}>ID (선택, 비우면 자동 생성)</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="예: new-service-2026"
                  className={fieldClass}
                />
              </>
            )}
          </div>
        </div>

        {/* Split pane: KO | EN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Korean column */}
          <div className="flex flex-col gap-4 min-h-0 rounded-lg border border-gray-200 bg-gray-50/80 p-5">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-3">
              🇰🇷 한국어
            </h3>

            <div>
              <label className={labelClass}>제목</label>
              <input
                type="text"
                value={formData.title?.ko}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title!, ko: e.target.value },
                  })
                }
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>요약</label>
              <textarea
                value={formData.excerpt?.ko}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: { ...formData.excerpt!, ko: e.target.value },
                  })
                }
                rows={3}
                className={`${fieldClass} resize-y`}
                required
              />
            </div>

            <div className="flex flex-col flex-1 min-h-[280px]">
              <label className={labelClass}>본문</label>
              <textarea
                value={formData.body?.ko}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    body: { ...formData.body!, ko: e.target.value },
                  })
                }
                rows={12}
                className={`${fieldClass} flex-1 min-h-[280px] resize-y`}
                required
              />
            </div>
          </div>

          {/* English column */}
          <div className="flex flex-col gap-4 min-h-0 rounded-lg border border-gray-200 bg-gray-50/80 p-5">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-3">
              EN English
            </h3>

            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={formData.title?.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title!, en: e.target.value },
                  })
                }
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Summary</label>
              <textarea
                value={formData.excerpt?.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: { ...formData.excerpt!, en: e.target.value },
                  })
                }
                rows={3}
                className={`${fieldClass} resize-y`}
                required
              />
            </div>

            <div className="flex flex-col flex-1 min-h-[280px]">
              <label className={labelClass}>Content</label>
              <textarea
                value={formData.body?.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    body: { ...formData.body!, en: e.target.value },
                  })
                }
                rows={12}
                className={`${fieldClass} flex-1 min-h-[280px] resize-y`}
                required
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
}
