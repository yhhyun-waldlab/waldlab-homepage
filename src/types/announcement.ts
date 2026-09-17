export type AnnouncementCategory = 
  | 'update' 
  | 'tech-news' 
  | 'insight' 
  | 'notice' 
  | 'ip';

export interface Announcement {
  id: string;
  date: string;
  category: AnnouncementCategory;
  tag: {
    ko: string;
    en: string;
  };
  title: {
    ko: string;
    en: string;
  };
  excerpt: {
    ko: string;
    en: string;
  };
  body: {
    ko: string;
    en: string;
  };
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const CATEGORY_LABELS: Record<AnnouncementCategory, { ko: string; en: string }> = {
  update: { ko: '업데이트', en: 'Update' },
  'tech-news': { ko: '기술소식', en: 'Tech News' },
  insight: { ko: '인사이트', en: 'Insight' },
  notice: { ko: '공지', en: 'Notice' },
  ip: { ko: '지적재산권', en: 'Intellectual Property' },
};
