/**
 * 검정 배경만 최대한 안전하게 제거 (가장자리에서 flood fill).
 * 이전 버전처럼 "어두운 픽셀 전부 투명" 처리는 로고 본문·안티앨리어싱을 함께 망가뜨림.
 *
 * 사용: npm run logo:knockout
 * 기본: public/images/SafeWay-logo.png → public/images/SafeWay-logo.knockout.png
 * 확인 후 이름을 SafeWay-logo.png 로 바꿔 쓰면 됨.
 */
import sharp from "sharp";
import { writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const INPUT = process.env.LOGO_IN ?? resolve(ROOT, "public/images/SafeWay-logo.png");
const OUTPUT =
  process.env.LOGO_OUT ??
  resolve(ROOT, "public/images/SafeWay-logo.knockout.png");
/** RGB가 모두 이 값 이하이면 "배경 색"으로 간주 (검정 전용, 너무 크게 잡지 말 것) */
const BG_MAX = Number(process.env.BG_MAX ?? 34);

function isBg(buf, i) {
  const r = buf[i];
  const g = buf[i + 1];
  const b = buf[i + 2];
  return r <= BG_MAX && g <= BG_MAX && b <= BG_MAX;
}

const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
});
const { width, height, channels } = info;
if (channels !== 4) {
  throw new Error("expected RGBA");
}

const buf = Buffer.from(data);
const n = width * height;
const vis = new Uint8Array(n);

const idx = (x, y) => y * width + x;
const q = [];

for (let x = 0; x < width; x++) {
  const i0 = idx(x, 0) * 4;
  const i1 = idx(x, height - 1) * 4;
  if (isBg(buf, i0)) q.push([x, 0]);
  if (isBg(buf, i1)) q.push([x, height - 1]);
}
for (let y = 0; y < height; y++) {
  const i0 = idx(0, y) * 4;
  const i1 = idx(width - 1, y) * 4;
  if (isBg(buf, i0)) q.push([0, y]);
  if (isBg(buf, i1)) q.push([width - 1, y]);
}

while (q.length) {
  const [x, y] = q.pop();
  const k = idx(x, y);
  if (vis[k]) continue;
  const p = k * 4;
  if (!isBg(buf, p)) continue;
  vis[k] = 1;
  buf[p + 3] = 0;
  if (x > 0) q.push([x - 1, y]);
  if (x < width - 1) q.push([x + 1, y]);
  if (y > 0) q.push([x, y - 1]);
  if (y < height - 1) q.push([x, y + 1]);
}

const out = await sharp(buf, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9, effort: 10 })
  .toBuffer();

writeFileSync(OUTPUT, out);
console.log(`Wrote ${OUTPUT} (${width}x${height}), BG_MAX=${BG_MAX}`);
console.log(`If it looks good: rename to SafeWay-logo.png`);
