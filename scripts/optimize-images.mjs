// Converts raw photos (JPG/PNG/HEIC) from ../Web porto into web-sized WebP under public/work.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const SRC = path.resolve("../Web porto");
const OUT = path.resolve("public/work");
const MAP = {
  "1. maxy academy": "maxy",
  "2. bps": "bps",
  "3. dibimbing - apo": "dibimbing-apo",
  "4. dibimbing - cm": "dibimbing-cm",
  "5. bem - head of medinkraf": "bem-head",
  "5. bem - staff of medinkraf": "bem-staff",
};

const manifest = {};
for (const [dir, slug] of Object.entries(MAP)) {
  const files = (await fs.readdir(path.join(SRC, dir))).sort();
  await fs.mkdir(path.join(OUT, slug), { recursive: true });
  manifest[slug] = [];
  let i = 1;
  for (const f of files) {
    const src = path.join(SRC, dir, f);
    let input = await fs.readFile(src);
    if (/\.heic$/i.test(f)) {
      input = Buffer.from(await heicConvert({ buffer: input, format: "JPEG", quality: 0.92 }));
    }
    const name = `${String(i++).padStart(2, "0")}.webp`;
    const out = path.join(OUT, slug, name);
    const info = await sharp(input)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    manifest[slug].push({ src: `/work/${slug}/${name}`, w: info.width, h: info.height, from: f });
    console.log(slug, name, info.width + "x" + info.height, Math.round(info.size / 1024) + "KB", "<-", f);
  }
}
await fs.writeFile("src/photos.json", JSON.stringify(manifest, null, 2));
