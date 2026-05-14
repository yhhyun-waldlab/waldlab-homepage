"use client";

/**
 * HeritageSection
 *
 * 발트랩 대표 현영호의 25년+ 전문성을 시각화한 섹션.
 * — 핵심 수치에 useCountUp 카운터 애니메이션 적용
 * — 섹션 헤더·콘텐츠 블록에 FadeIn 전환 효과 적용
 * — 다국어(ko / en) 완전 지원: t() 함수로 모든 텍스트 처리
 *
 * ⚠ 중요 : 이 섹션의 모든 이력·수치는 법인(주식회사 발트랩)의 실적이 아니라
 *   대표자 및 핵심 인력의 개인 전문성(Expertise)에 기반합니다.
 */

import { useState } from "react";
import {
  Globe,
  Award,
  Layers,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  ClipboardList,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import FadeIn from "@/components/ui/FadeIn";

const LIME = "#82C91E";

interface HeritageTimelineItem {
  year: string;
  title: string;
  org: string;
  desc: string;
  side: "top" | "bottom";
  highlight?: boolean;
  /** Softer than `highlight` — anchor tenure without stealing focus from the latest milestone */
  tenureAccent?: boolean;
  logoSrc?: string;
  logoAlt?: string;
}

function timelineYearColorDesktop(item: HeritageTimelineItem): string {
  if (item.highlight) return LIME;
  if (item.tenureAccent) return "rgba(184, 223, 138, 0.95)";
  return "rgba(116,198,157,0.7)";
}

function timelineYearColorMobile(item: HeritageTimelineItem): string {
  if (item.highlight) return LIME;
  if (item.tenureAccent) return "rgba(184, 223, 138, 0.95)";
  return "rgba(116,198,157,0.6)";
}

function timelineDotDesktop(item: HeritageTimelineItem): { background: string; boxShadow: string } {
  if (item.highlight) {
    return {
      background: LIME,
      boxShadow: `0 0 12px ${LIME}, 0 0 24px rgba(130,201,30,0.4)`,
    };
  }
  if (item.tenureAccent) {
    return {
      background: "rgba(130,201,30,0.72)",
      boxShadow: "0 0 10px rgba(130,201,30,0.22)",
    };
  }
  return {
    background: "rgba(130,201,30,0.5)",
    boxShadow: "none",
  };
}

function timelineDotMobile(item: HeritageTimelineItem): { background: string; boxShadow: string } {
  if (item.highlight) {
    return {
      background: LIME,
      boxShadow: `0 0 8px ${LIME}`,
    };
  }
  if (item.tenureAccent) {
    return {
      background: "rgba(130,201,30,0.72)",
      boxShadow: "0 0 7px rgba(130,201,30,0.35)",
    };
  }
  return {
    background: "rgba(130,201,30,0.5)",
    boxShadow: "none",
  };
}

function timelineTextBlockMinHeight(item: HeritageTimelineItem): string {
  return item.logoSrc ? "126px" : "90px";
}

/** Shared copy block for horizontal / vertical career timeline nodes */
function HeritageTimelineLabels({
  item,
  layout,
}: {
  item: HeritageTimelineItem;
  layout: "desktop" | "mobile";
}) {
  const yearColor = layout === "desktop" ? timelineYearColorDesktop(item) : timelineYearColorMobile(item);

  return (
    <>
      <div className="text-[11px] font-semibold mb-0.5" style={{ color: yearColor }}>
        {item.year}
      </div>
      <div
        className={
          layout === "desktop"
            ? "text-white text-[12px] font-bold leading-tight mb-1"
            : "text-white text-sm font-bold mb-0.5"
        }
      >
        {item.title}
      </div>
      <div
        className={layout === "desktop" ? "text-[10px] leading-snug" : "text-[11px] mb-1"}
        style={{
          color: layout === "desktop" ? "rgba(116,198,157,0.5)" : "rgba(116,198,157,0.55)",
        }}
      >
        {item.org}
      </div>
      {item.logoSrc ? (
        <span
          className={
            layout === "desktop"
              ? "mx-auto mt-1.5 inline-flex rounded-md px-1 py-0.5"
              : "mb-1.5 inline-flex rounded-md px-1 py-0.5"
          }
          style={{
            background: "rgba(0,0,0,0.28)",
            border: "1px solid rgba(116,198,157,0.16)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.logoSrc}
            alt={item.logoAlt ?? ""}
            className={
              layout === "desktop"
                ? "h-[22px] w-auto max-w-[92px] object-contain opacity-[0.82] hover:opacity-95 transition-opacity duration-300"
                : "block h-[22px] w-auto max-w-[100px] object-contain opacity-[0.82] hover:opacity-95 transition-opacity duration-300"
            }
          />
        </span>
      ) : null}
    </>
  );
}

/* ── 서브 컴포넌트: 카운터 애니메이션 통계 카드 ─────────────────────── */
function StatCard({
  target, suffix, label, sub, duration,
}: { target: number; suffix: string; label: string; sub: string; duration: number }) {
  const [hovered, setHovered] = useState(false);
  const { count, triggerRef } = useCountUp(target, duration);

  return (
    <div
      ref={triggerRef}
      className="rounded-2xl p-6 text-center transition-all duration-300"
      style={{
        background: hovered ? "rgba(130,201,30,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(130,201,30,0.4)" : "rgba(116,198,157,0.12)"}`,
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(130,201,30,0.1)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="text-4xl sm:text-5xl font-black mb-1"
        style={{
          background: "linear-gradient(130deg, #82C91E 0%, #52b788 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white font-semibold text-sm mb-1">{label}</div>
      <div className="text-[11px]" style={{ color: "rgba(116,198,157,0.5)" }}>{sub}</div>
    </div>
  );
}

/* ── 수행 프로젝트 데이터 (KO) ───────────────────────────────────────── */
const DOMESTIC_PROJECTS_KO = [
  {
    period: "2023 ~ 2020",
    role: "PM / 설계",
    slogan: "공공·민간 협력과 최신 트렌드 반영",
    items: [
      { name: "비대면 기반 협진 플랫폼 구축·개발", client: "㈜창헬스케어" },
      { name: "범부처전주기의료기기 연구개발사업", client: "범부처전주기의료기기사업단" },
      { name: "2021년 몽골사후관리센터 운영 사업", client: "한국보건산업진흥원" },
      { name: "부산EDC 웰니스센터 구축", client: "한국수자원공사" },
      { name: "2021년 근로자건강센터 앱 및 전산시스템 고도화", client: "한국산업안전보건공단" },
      { name: "스마트병원 선도모델 개발지원 사업", client: "보건복지부" },
      { name: "2020년 근로자건강센터 앱 개발 및 전산시스템 고도화", client: "한국산업안전보건공단" },
      { name: "2020년 몽골 사후관리시스템 운영", client: "한국보건산업진흥원" },
      { name: "ICT기반 의료시스템 해외진출 시범사업 (태국)", client: "한국보건산업진흥원" },
    ],
  },
  {
    period: "2019 ~ 2015",
    role: "PM / 설계",
    slogan: "공공성과 글로벌 확장성 동시 실현",
    items: [
      { name: "2019년 몽골 사후관리시스템 운영", client: "한국보건산업진흥원" },
      { name: "SK건설 건강관리솔루션 구축 (출입·통제시스템 연계)", client: "㈜ADT캡스 (現 SK쉴더스)" },
      { name: "2019년 근로자건강센터 앱 개발 및 전산시스템 고도화", client: "한국산업안전보건공단" },
      { name: "PHR기반 개인맞춤형 건강관리 시스템", client: "산업통상자원부" },
      { name: "캄보디아 노인 만성질환 대처 연구 (자문)", client: "UN ESCAP" },
      { name: "2018년 근로자건강센터 통합 전산시스템 고도화", client: "한국산업안전보건공단" },
      { name: "2018년 몽골 사후관리센터 운영", client: "한국보건산업진흥원" },
      { name: "2018 디지털헬스케어 동남아 로드쇼 (베트남·인도네시아)", client: "보건복지부" },
      { name: "2017년 몽골 사후관리센터 운영", client: "한국보건산업진흥원" },
      { name: "스마트 After-Care 서비스 구축 및 실증 (태국·캄보디아)", client: "한국정보화진흥원" },
      { name: "2017년 근로자건강센터 분소 설치·운영 장비 구매 및 인프라", client: "한국산업안전보건공단" },
      { name: "몽골 EDCF National Diagnostic and Treatment Center", client: "수출입은행 (대한전선㈜)" },
      { name: "브라질 아마존 현지 수출형 스마트 의료선 개발", client: "산업통상자원부" },
      { name: "2016년 몽골 사후관리 센터 구축", client: "한국보건산업진흥원" },
      { name: "2016년 근로자건강센터 헬스존 설치·운영", client: "한국산업안전보건공단" },
      { name: "조선대병원-청산도 마을회관 원격 화상상담 시스템 구축", client: "농림축산부" },
      { name: "글로벌 CSR사업 — 기술학교 (캄보디아)", client: "KOTRA" },
      { name: "원양선박 원격의료지원 시범사업", client: "해양수산부" },
      { name: "군 ICT 융합 원격진료시스템 구축사업", client: "국방부 국군의무사령부" },
      { name: "스마트 After-Care 서비스 테스트베드 구축 및 실증 (UAE)", client: "가톨릭대학교 산학협력단" },
      { name: "원격의료 활성화 모델 개발 및 실증", client: "한국보건산업진흥원" },
      { name: "서울시민 건강포탈시스템 구축", client: "서울특별시 서울의료원" },
    ],
  },
  {
    period: "2014 ~ 2010",
    role: "PM / 설계 / 구현",
    slogan: "신뢰 기반 국가기관 인프라 구축",
    items: [
      { name: "육군훈련소 교육대 의무대 진료접수 자동화 시스템", client: "육군본부" },
      { name: "캄보디아 의과대학 교육시스템 구축 (KOICA)", client: "순천향대 산학협력단" },
      { name: "보건기관 원격건강관리 인프라 구축 (강원도)", client: "강원도" },
      { name: "ODA대상 국가 u-Health 서비스 모델 개발 (캄보디아)", client: "산업자원부" },
      { name: "원주 U-City 웰니스 센터 구축", client: "㈜한화 S&C" },
      { name: "국방부 원격진료 시스템 (백두)", client: "국방부 1266부대" },
      { name: "USN기반 원격건강 모니터링 시스템 구축 (충남 서산·병원선)", client: "한국정보화진흥원" },
      { name: "원격진료시스템 구축 (통영)", client: "통영시" },
      { name: "원격진료 시스템 구축 (독도경비대·경찰병원·경찰교육원)", client: "경찰청" },
      { name: "통합의료정보시스템 구축 (교정기관 원격진료)", client: "법무부" },
      { name: "서울시 u-헬스케어시스템 구축", client: "서울특별시" },
      { name: "해상 원격진료시스템 구축", client: "한국해양대학교" },
      { name: "복지정보통신 인프라구축 시범사업", client: "한국정보화진흥원" },
      { name: "복지시설·의료기관 연계 u-Health 확산 서비스", client: "부산광역시" },
      { name: "충남 USN기반 원격건강 모니터링 시스템 구축 (보령)", client: "충청남도" },
      { name: "강남구 보건소 원격진료시범사업", client: "강남구 보건소" },
      { name: "원격진료 통합서버 구축 및 장비구입 (강릉교도소)", client: "강릉교도소" },
      { name: "경북 USN기반 원격 모니터링 시스템 구축", client: "경북 영양군" },
      { name: "해양경찰청 응급 원격 진료 시범사업", client: "해양경찰청" },
      { name: "도서지역 원격진료 시스템 구축 (신안군)", client: "전라남도" },
    ],
  },
  {
    period: "2009 ~ 2005",
    role: "PM / 설계 / 구현",
    slogan: "공공 신뢰 확보 — 초기 원격의료 기반 구축",
    items: [
      { name: "SW 프로세스 품질 인증 절차·척도 (K-모델) 적용", client: "한국정보사회진흥원" },
      { name: "대한간호협회 간협신보 구축", client: "(사)대한간호협회" },
      { name: "우크라이나 원격진료 시스템 구축", client: "한국국제협력단 (KOICA)" },
      { name: "법무부 안양교도소-병원 원격진료 시스템", client: "법무부" },
      { name: "국방부 국군의무사령부 원격진료 시스템", client: "국방부" },
      { name: "대한적십자사 혈액 정보공유시스템 (BISS)", client: "대한적십자사 혈액관리본부" },
      { name: "안산보건소 원격진료 시스템 구축", client: "안산시" },
      { name: "질병관리본부 펄스넷 (PulseNet) 운영전산 시스템", client: "질병관리본부" },
      { name: "안양시 정신보건센터 화상상담시스템", client: "안양시" },
      { name: "연세대 의과대학 의료기관 감염인 상담 시스템", client: "연세대 의료원 산학협력단" },
      { name: "보건복지부 검체검사 적정성 평가시스템", client: "보건복지부" },
      { name: "의료-IT 융합산업육성 인프라 구축 (원격진료)", client: "순창군" },
    ],
  },
  {
    period: "2004 ~ 1998",
    role: "설계 / 구현",
    slogan: "기술 커리어의 토대 — 초기 시스템 개발",
    items: [
      { name: "드러그인포 (의약품 정보 시스템)", client: "㈜비트컴퓨터" },
      { name: "CRM과 연계한 DM 자동화·발송 시스템", client: "㈜디엠플러스" },
      { name: "경기 남부지역 자동차 부품 산학 협력 네트워크", client: "오산대학교" },
      { name: "다기준 의사분석에 의한 E-Sourcing One-Stop Process", client: "BSPM" },
      { name: "Parking & Hospitality Management System", client: "컴스" },
    ],
  },
] as const;

/* ── 수행 프로젝트 데이터 (EN) ───────────────────────────────────────── */
const DOMESTIC_PROJECTS_EN = [
  {
    period: "2023 ~ 2020",
    role: "PM / Design",
    slogan: "Public-private collaboration & latest trends",
    items: [
      { name: "Non-face-to-face Collaborative Care Platform", client: "Chang Healthcare" },
      { name: "Multi-ministry Medical Device R&D Program", client: "Multi-ministry Medical Device Agency" },
      { name: "2021 Mongolia Post-Care Center Operation", client: "KHIDI" },
      { name: "Busan EDC Wellness Center Construction", client: "K-Water" },
      { name: "2021 Worker Health Center App & IT System Enhancement", client: "KOSHA" },
      { name: "Smart Hospital Leading Model Development", client: "Ministry of Health & Welfare" },
      { name: "2020 Worker Health Center App & IT System Enhancement", client: "KOSHA" },
      { name: "2020 Mongolia Post-Care System Operation", client: "KHIDI" },
      { name: "ICT-based Healthcare Overseas Expansion Pilot (Thailand)", client: "KHIDI" },
    ],
  },
  {
    period: "2019 ~ 2015",
    role: "PM / Design",
    slogan: "Public integrity meets global scalability",
    items: [
      { name: "2019 Mongolia Post-Care System Operation", client: "KHIDI" },
      { name: "SK Construction Health Management Solution (Access Control Integration)", client: "ADT Caps (now SK Shieldus)" },
      { name: "2019 Worker Health Center App & IT System Enhancement", client: "KOSHA" },
      { name: "PHR-based Personalized Health Management System", client: "Ministry of Trade, Industry & Energy" },
      { name: "ICT Solutions for Elderly Chronic Disease in Cambodia (Advisory)", client: "UN ESCAP" },
      { name: "2018 Worker Health Center IT System Enhancement", client: "KOSHA" },
      { name: "2018 Mongolia Post-Care Center Operation", client: "KHIDI" },
      { name: "2018 Digital Healthcare Southeast Asia Roadshow (Vietnam · Indonesia)", client: "Ministry of Health & Welfare" },
      { name: "2017 Mongolia Post-Care Center Operation", client: "KHIDI" },
      { name: "Smart After-Care Service Pilot (Thailand · Cambodia)", client: "NIA" },
      { name: "2017 Worker Health Center Branch Setup & Infrastructure", client: "KOSHA" },
      { name: "Mongolia EDCF National Diagnostic and Treatment Center", client: "Korea Eximbank / Daihan Electric Wire" },
      { name: "Brazil Amazon Export Smart Medical Vessel Development", client: "Ministry of Trade, Industry & Energy" },
      { name: "2016 Mongolia Post-Care Center Construction", client: "KHIDI" },
      { name: "2016 Worker Health Center Health Zone Setup", client: "KOSHA" },
      { name: "Remote Video Consultation System — Chosun Univ. Hospital to Cheongsando", client: "Ministry of Agriculture" },
      { name: "Global CSR — Technical School (Cambodia)", client: "KOTRA" },
      { name: "Deep-sea Vessel Telemedicine Support Pilot", client: "Ministry of Oceans & Fisheries" },
      { name: "Military ICT-integrated Telemedicine System", client: "MND / AFMC" },
      { name: "Smart After-Care Testbed (UAE)", client: "The Catholic Univ. Industry-Academic Cooperation" },
      { name: "Telemedicine Activation Model Development & Pilot", client: "KHIDI" },
      { name: "Seoul Citizen Health Portal System", client: "Seoul Metropolitan Govt. / Seoul Medical Center" },
    ],
  },
  {
    period: "2014 ~ 2010",
    role: "PM / Design / Build",
    slogan: "Trust-based national infrastructure",
    items: [
      { name: "Army Training Center Medical Clinic Automation System", client: "Army HQ" },
      { name: "Cambodia Medical University Education System (KOICA)", client: "Soonchunhyang Univ. IAC" },
      { name: "Regional Health Center Remote Health Infrastructure (Gangwon)", client: "Gangwon Province" },
      { name: "u-Health Service Model for ODA Countries (Cambodia)", client: "Ministry of Commerce & Energy" },
      { name: "Wonju U-City Wellness Center", client: "Hanwha S&C" },
      { name: "MND Telemedicine System (Baekdu)", client: "MND 1266 Unit" },
      { name: "USN-based Remote Health Monitoring System (Chungnam Seosan · Hospital Ship)", client: "NIA" },
      { name: "Telemedicine System (Tongyeong)", client: "Tongyeong City" },
      { name: "Telemedicine System (Dokdo Security Force · Police Hospital · Academy)", client: "National Police Agency" },
      { name: "Integrated Medical Information System (Corrections Telemedicine)", client: "Ministry of Justice" },
      { name: "Seoul u-Healthcare System", client: "Seoul Metropolitan Government" },
      { name: "Maritime Telemedicine System", client: "Korea Maritime & Ocean University" },
      { name: "Welfare IT Infrastructure Pilot", client: "NIA" },
      { name: "u-Health Service Linking Welfare Facilities & Hospitals", client: "Busan Metropolitan City" },
      { name: "Chungnam USN-based Remote Health Monitoring (Boryeong)", client: "Chungcheongnam-do" },
      { name: "Gangnam-gu Health Center Telemedicine Pilot", client: "Gangnam-gu Health Center" },
      { name: "Integrated Telemedicine Server (Gangneung Prison)", client: "Gangneung Prison" },
      { name: "Gyeongbuk USN-based Remote Monitoring System", client: "Gyeongbuk Yeongyang County" },
      { name: "Korea Coast Guard Emergency Telemedicine Pilot", client: "Korea Coast Guard" },
      { name: "Remote Islands Telemedicine System (Sinan County)", client: "Jeollanam-do" },
    ],
  },
  {
    period: "2009 ~ 2005",
    role: "PM / Design / Build",
    slogan: "Building public trust — early telemedicine foundation",
    items: [
      { name: "SW Process Quality Certification (K-Model)", client: "NIA" },
      { name: "Korean Nurses Association Newspaper System", client: "Korean Nurses Association" },
      { name: "Ukraine Telemedicine System", client: "KOICA" },
      { name: "Anyangso Prison-Hospital Telemedicine System", client: "Ministry of Justice" },
      { name: "AFMC Telemedicine System", client: "Ministry of National Defense" },
      { name: "Korean Red Cross Blood Information Sharing System (BISS)", client: "Korean Red Cross Blood Services" },
      { name: "Ansan Public Health Center Telemedicine System", client: "Ansan City" },
      { name: "Korea CDC PulseNet Operations System", client: "Korea CDC" },
      { name: "Anyang Mental Health Center Video Counseling System", client: "Anyang City" },
      { name: "Yonsei Univ. Medical School HIV Counseling System", client: "Yonsei University Medical Center" },
      { name: "MOHW Specimen Inspection Adequacy Evaluation System", client: "Ministry of Health & Welfare" },
      { name: "Medical-IT Convergence Infrastructure (Telemedicine)", client: "Sunchang County" },
    ],
  },
  {
    period: "2004 ~ 1998",
    role: "Design / Build",
    slogan: "Foundation of a technical career",
    items: [
      { name: "DrugInfo (Pharmaceutical Information System)", client: "BIT Computer" },
      { name: "CRM-linked DM Automation & Dispatch System", client: "DM Plus" },
      { name: "Gyeonggi Southern Auto Parts Industry-Academia Network", client: "Osan University" },
      { name: "E-Sourcing One-Stop Process via Multi-Criteria Decision Analysis", client: "BSPM" },
      { name: "Parking & Hospitality Management System", client: "COMS" },
    ],
  },
] as const;

type ProjectGroup = { period: string; role: string; slogan: string; items: readonly { name: string; client: string }[] };

/* ── 수행실적 아코디언 아이템 ────────────────────────────────────────── */
function ProjectAccordion({ groups, t }: { groups: readonly ProjectGroup[]; t: (k: string) => string }) {
  const [open, setOpen] = useState<number | null>(0);
  const [expandAll, setExpandAll] = useState(false);

  const toggle = (i: number) => {
    if (expandAll) {
      setExpandAll(false);
      setOpen(i);
    } else {
      setOpen(open === i ? null : i);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 전체 펼치기 토글 */}
      <div className="flex justify-end mb-1">
        <button
          type="button"
          onClick={() => { setExpandAll(!expandAll); setOpen(null); }}
          className="text-[11px] font-semibold px-3 py-1 rounded-full transition-all"
          style={{
            color: LIME,
            background: "rgba(130,201,30,0.08)",
            border: "1px solid rgba(130,201,30,0.2)",
          }}
        >
          {expandAll ? t("heritage.projectsCollapse") : t("heritage.projectsAll")}
        </button>
      </div>

      {groups.map((group, i) => {
        const isOpen = expandAll || open === i;
        return (
          <div
            key={group.period}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: isOpen ? "rgba(130,201,30,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${isOpen ? "rgba(130,201,30,0.25)" : "rgba(116,198,157,0.1)"}`,
            }}
          >
            {/* 헤더 */}
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="text-sm font-bold tabular-nums flex-shrink-0"
                  style={{ color: isOpen ? LIME : "rgba(116,198,157,0.8)" }}
                >
                  {group.period}
                </span>
                <span
                  className="hidden sm:block text-[11px] px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: "rgba(116,198,157,0.07)",
                    color: "rgba(116,198,157,0.55)",
                    border: "1px solid rgba(116,198,157,0.12)",
                  }}
                >
                  {group.role}
                </span>
                <span className="text-[11px] truncate" style={{ color: "rgba(116,198,157,0.4)" }}>
                  {group.slogan}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <span className="text-[10px] font-bold" style={{ color: "rgba(116,198,157,0.5)" }}>
                  {group.items.length}건
                </span>
                <ChevronDown
                  size={14}
                  style={{
                    color: isOpen ? LIME : "rgba(116,198,157,0.4)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s",
                  }}
                />
              </div>
            </button>

            {/* 목록 */}
            {isOpen && (
              <div className="px-5 pb-4">
                <div className="border-t pt-3" style={{ borderColor: "rgba(116,198,157,0.1)" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {group.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span
                          className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "rgba(130,201,30,0.5)" }}
                        />
                        <div className="min-w-0">
                          <span className="text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
                            {item.name}
                          </span>
                          <span className="ml-1.5 text-[10px]" style={{ color: "rgba(116,198,157,0.45)" }}>
                            {item.client}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Props ──────────────────────────────────────────────────────────── */
interface HeritageSectionProps {
  t: (key: string) => string;
}

export default function HeritageSection({ t }: HeritageSectionProps) {

  /* ── 핵심 수치 ─────────────────────────────────────────────────── */
  const KEY_STATS = [
    { target: 25,  suffix: t("heritage.stat0Suffix"), label: t("heritage.stat0Label"), sub: t("heritage.stat0Sub"), duration: 1800 },
    { target: 62,  suffix: t("heritage.stat1Suffix"), label: t("heritage.stat1Label"), sub: t("heritage.stat1Sub"), duration: 1600 },
    { target: 673, suffix: t("heritage.stat2Suffix"), label: t("heritage.stat2Label"), sub: t("heritage.stat2Sub"), duration: 2200 },
    { target: 7,   suffix: t("heritage.stat3Suffix"), label: t("heritage.stat3Label"), sub: t("heritage.stat3Sub"), duration: 1200 },
  ];

  /* ── 커리어 타임라인 ────────────────────────────────────────────── */
  const TIMELINE: HeritageTimelineItem[] = [
    { year: "1998~2002", title: t("heritage.tl0Title"), org: t("heritage.tl0Org"), desc: t("heritage.tl0Desc"), side: "top"    },
    {
      year: "2003~2022",
      title: t("heritage.tl1Title"),
      org: t("heritage.tl1Org"),
      desc: t("heritage.tl1Desc"),
      side: "bottom",
      tenureAccent: true,
      logoSrc: "/brand/bitcomputer-logo.png",
      logoAlt: t("heritage.tl1LogoAlt"),
    },
    { year: "2005", title: t("heritage.tl2Title"), org: t("heritage.tl2Org"), desc: t("heritage.tl2Desc"), side: "top"    },
    { year: "2010", title: t("heritage.tl3Title"), org: t("heritage.tl3Org"), desc: t("heritage.tl3Desc"), side: "bottom" },
    { year: "2015", title: t("heritage.tl4Title"), org: t("heritage.tl4Org"), desc: t("heritage.tl4Desc"), side: "top"    },
    { year: "2017~", title: t("heritage.tl5Title"), org: t("heritage.tl5Org"), desc: t("heritage.tl5Desc"), side: "bottom" },
    { year: "2022", title: t("heritage.tl6Title"), org: t("heritage.tl6Org"), desc: t("heritage.tl6Desc"), side: "top"    },
    { year: "2024~", title: t("heritage.tl7Title"), org: t("heritage.tl7Org"), desc: t("heritage.tl7Desc"), side: "bottom", highlight: true },
  ];

  /* ── 글로벌 프로젝트 ─────────────────────────────────────────────── */
  const GLOBAL_PROJECTS = [
    { country: t("heritage.gp0Country"), cc: "ua", org: "KOICA",                           project: t("heritage.gp0Project"), year: "2005~" },
    { country: t("heritage.gp1Country"), cc: "mn", org: "EDCF · KHIDI",                    project: t("heritage.gp1Project"), year: "2015~2021" },
    { country: t("heritage.gp2Country"), cc: "kh", org: "ODA · KOICA · UN ESCAP · KOTRA", project: t("heritage.gp2Project"), year: "2010~" },
    { country: t("heritage.gp3Country"), cc: "th", org: "KHIDI",                           project: t("heritage.gp3Project"), year: "2017~2020" },
    { country: t("heritage.gp4Country"), cc: "ae", org: t("heritage.gp4Org"),               project: t("heritage.gp4Project"), year: "2017" },
    { country: t("heritage.gp5Country"), cc: "br", org: t("heritage.gp5Org"),               project: t("heritage.gp5Project"), year: "2015" },
  ];

  /* ── 철학의 계승 ─────────────────────────────────────────────────── */
  const EVOLUTION = [
    {
      phase: "Phase 1", period: "2003 – 2022",
      title: t("heritage.ev0Title"), subtitle: t("heritage.ev0Subtitle"),
      points: [t("heritage.ev0P0"), t("heritage.ev0P1"), t("heritage.ev0P2")],
    },
    {
      phase: "Phase 2", period: "2005 – 2023",
      title: t("heritage.ev1Title"), subtitle: t("heritage.ev1Subtitle"),
      points: [t("heritage.ev1P0"), t("heritage.ev1P1"), t("heritage.ev1P2")],
    },
    {
      phase: "Phase 3", period: "2024 –",
      title: t("heritage.ev2Title"), subtitle: t("heritage.ev2Subtitle"),
      points: [t("heritage.ev2P0"), t("heritage.ev2P1"), t("heritage.ev2P2")],
      highlight: true,
    },
  ];

  return (
    <section
      id="heritage"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#071710" }}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(130,201,30,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(130,201,30,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ 섹션 헤더 ════════════════════════════════════════════════ */}
        <FadeIn direction="up" className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 text-[11px] font-bold rounded-full
              tracking-[0.2em] uppercase mb-5"
            style={{
              background: "rgba(130,201,30,0.08)",
              border: "1px solid rgba(130,201,30,0.25)",
              color: LIME,
            }}
          >
            {t("heritage.badge")}
          </span>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t("heritage.titleLine1")}
            <span
              style={{
                background: "linear-gradient(130deg, #82C91E 0%, #52b788 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("heritage.titleHighlight")}
            </span>
          </h2>

          <p className="text-base max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ color: "rgba(116,198,157,0.65)" }}>
            {t("heritage.desc")}
          </p>

          {/* 면책 고지 칩 */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px]"
            style={{
              background: "rgba(234,179,8,0.07)",
              border: "1px solid rgba(234,179,8,0.25)",
              color: "rgba(234,179,8,0.8)",
            }}
          >
            <AlertCircle size={13} />
            {t("heritage.chipPrefix")}
            <strong>{t("heritage.chipBold")}</strong>
            {t("heritage.chipSuffix")}
          </div>
        </FadeIn>

        {/* ══ 핵심 수치 4개 ════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {KEY_STATS.map((s, i) => (
            <FadeIn key={s.target} delay={i * 100} direction="up">
              <StatCard {...s} />
            </FadeIn>
          ))}
        </div>

        {/* ══ 커리어 타임라인 ══════════════════════════════════════════ */}
        <FadeIn direction="up" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.timelineTitle")}</h3>
          </div>

          {/* 데스크탑: 수평 타임라인 */}
          <div className="hidden lg:block relative">
            {/* 중앙 선 */}
            <div
              className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: "linear-gradient(to right, transparent, rgba(130,201,30,0.3), rgba(130,201,30,0.6), rgba(130,201,30,0.3), transparent)" }}
            />

            <div className="flex items-center justify-between relative">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / TIMELINE.length}%` }}
                >
                  {/* 상단 텍스트 */}
                  {item.side === "top" && (
                    <div className="pb-4 text-center px-1" style={{ minHeight: timelineTextBlockMinHeight(item) }}>
                      <HeritageTimelineLabels item={item} layout="desktop" />
                    </div>
                  )}
                  {item.side === "bottom" && <div style={{ minHeight: timelineTextBlockMinHeight(item) }} />}

                  {/* 도트 */}
                  <div
                    className="w-3 h-3 rounded-full relative z-10 flex-shrink-0"
                    style={timelineDotDesktop(item)}
                  />

                  {/* 하단 텍스트 */}
                  {item.side === "bottom" && (
                    <div className="pt-4 text-center px-1" style={{ minHeight: timelineTextBlockMinHeight(item) }}>
                      <HeritageTimelineLabels item={item} layout="desktop" />
                    </div>
                  )}
                  {item.side === "top" && <div style={{ minHeight: timelineTextBlockMinHeight(item) }} />}
                </div>
              ))}
            </div>
          </div>

          {/* 모바일: 수직 타임라인 */}
          <div className="lg:hidden flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-4">
                {/* 라인 + 도트 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                    style={timelineDotMobile(item)}
                  />
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{ background: "rgba(116,198,157,0.2)", minHeight: "32px" }}
                    />
                  )}
                </div>
                {/* 텍스트 */}
                <div className="pb-6">
                  <HeritageTimelineLabels item={item} layout="mobile" />
                  <div className="text-[11px] leading-relaxed mt-1"
                    style={{ color: "rgba(116,198,157,0.4)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ══ 주요 수행 프로젝트 연보 ══════════════════════════════════ */}
        <FadeIn direction="up" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardList size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.projectsTitle")}</h3>
            <span
              className="text-[11px] px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(130,201,30,0.1)", color: LIME, border: "1px solid rgba(130,201,30,0.25)" }}
            >
              {t("heritage.projectsBadge")}
            </span>
          </div>
          <ProjectAccordion
            groups={t("heritage.lang") === "en" ? DOMESTIC_PROJECTS_EN : DOMESTIC_PROJECTS_KO}
            t={t}
          />
        </FadeIn>

        {/* ══ 글로벌 프로젝트 ══════════════════════════════════════════ */}
        <FadeIn direction="up" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Globe size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.globalTitle")}</h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(130,201,30,0.1)", color: LIME, border: "1px solid rgba(130,201,30,0.25)" }}>
              {t("heritage.globalBadge")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOBAL_PROJECTS.map((proj) => (
              <div
                key={proj.country}
                className="rounded-xl p-5 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(116,198,157,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(130,201,30,0.3)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(130,201,30,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(116,198,157,0.1)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/32x24/${proj.cc}.png`}
                    width={32}
                    height={24}
                    alt={proj.country}
                    className="rounded-sm flex-shrink-0"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div className="text-white font-bold text-sm">{proj.country}</div>
                    <div className="text-[10px] font-semibold"
                      style={{ color: LIME }}>{proj.org}</div>
                  </div>
                  <div className="ml-auto text-[10px]"
                    style={{ color: "rgba(116,198,157,0.4)" }}>{proj.year}</div>
                </div>
                <p className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(116,198,157,0.6)" }}>
                  {proj.project}
                </p>
              </div>
            ))}
          </div>

          {/* 협력 기관 태그 */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["KOICA", "EDCF (수출입은행)", "ODA", "KOTRA", "KHIDI", "UN ESCAP", t("heritage.gp5Org"), "보건복지부"].map((org) => (
              <span
                key={org}
                className="px-3 py-1 rounded-full text-[10px] font-medium"
                style={{
                  background: "rgba(116,198,157,0.06)",
                  border: "1px solid rgba(116,198,157,0.15)",
                  color: "rgba(116,198,157,0.6)",
                }}
              >
                {org}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* ══ 철학의 계승: 비트케어 → SafeWay ══════════════════════════ */}
        <FadeIn direction="up" className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <Layers size={18} style={{ color: LIME }} />
            <h3 className="text-lg font-bold text-white">{t("heritage.evolutionTitle")}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 relative">
            {/* 연결 화살표 (데스크탑) */}
            <div className="hidden lg:flex absolute top-10 left-[calc(33.333%-12px)] items-center z-10">
              <div className="w-6 h-px" style={{ background: "rgba(130,201,30,0.4)" }} />
              <ChevronRight size={16} style={{ color: "rgba(130,201,30,0.4)" }} />
            </div>
            <div className="hidden lg:flex absolute top-10 left-[calc(66.666%-12px)] items-center z-10">
              <div className="w-6 h-px" style={{ background: LIME }} />
              <ChevronRight size={16} style={{ color: LIME }} />
            </div>

            {EVOLUTION.map((phase, i) => (
              <div
                key={phase.phase}
                className="p-6 lg:p-7 rounded-2xl lg:rounded-none first:lg:rounded-l-2xl last:lg:rounded-r-2xl
                  mb-3 lg:mb-0 transition-all duration-300"
                style={{
                  background: phase.highlight
                    ? "rgba(130,201,30,0.08)"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${phase.highlight ? "rgba(130,201,30,0.35)" : "rgba(116,198,157,0.1)"}`,
                  borderRight: i < 2 ? "none" : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: phase.highlight ? "rgba(130,201,30,0.2)" : "rgba(116,198,157,0.08)",
                      color: phase.highlight ? LIME : "rgba(116,198,157,0.6)",
                    }}
                  >
                    {phase.phase}
                  </span>
                  <span className="text-[11px]"
                    style={{ color: "rgba(116,198,157,0.45)" }}>{phase.period}</span>
                </div>

                <h4
                  className="text-base font-bold mb-1"
                  style={{ color: phase.highlight ? LIME : "white" }}
                >
                  {phase.title}
                </h4>
                <p
                  className="text-[12px] font-medium mb-4"
                  style={{ color: phase.highlight ? "rgba(130,201,30,0.7)" : "rgba(116,198,157,0.5)" }}
                >
                  {phase.subtitle}
                </p>

                <ul className="flex flex-col gap-2">
                  {phase.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: phase.highlight ? LIME : "rgba(116,198,157,0.4)" }}
                      />
                      <span className="text-[12px] leading-relaxed"
                        style={{ color: phase.highlight ? "rgba(255,255,255,0.8)" : "rgba(116,198,157,0.55)" }}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ══ 최하단 면책 고지 박스 ════════════════════════════════════ */}
        <div
          className="rounded-xl px-6 py-4 flex items-start gap-3"
          style={{
            background: "rgba(234,179,8,0.04)",
            border: "1px solid rgba(234,179,8,0.2)",
          }}
        >
          <Award size={16} className="flex-shrink-0 mt-0.5"
            style={{ color: "rgba(234,179,8,0.7)" }} />
          <p className="text-[12px] leading-relaxed"
            style={{ color: "rgba(234,179,8,0.7)" }}>
            <strong className="font-bold">{t("heritage.disclosureTitle")}</strong> —
            {" "}{t("heritage.disclosureText")}{" "}
            <strong>{t("heritage.disclosureName")}</strong>{" "}
            {t("heritage.disclosureText2")}
          </p>
        </div>
      </div>
    </section>
  );
}
