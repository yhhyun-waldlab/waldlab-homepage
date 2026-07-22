import { redirect } from "next/navigation";

type Props = { searchParams?: Promise<{ lang?: string }> };

/**
 * /archive 는 /news 로 통합되었습니다.
 * 기존 링크·북마크 호환을 위해 리다이렉트만 수행합니다.
 */
export default async function ArchiveRedirect({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const lang = sp.lang === "en" ? "en" : "ko";
  redirect(`/news?lang=${lang}`);
}
