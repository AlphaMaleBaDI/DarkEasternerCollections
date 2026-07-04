/**
 * Dark Easterner Collections — Product Seed & Recovery Script
 * ============================================================
 * Run this script any time the products table needs to be rebuilt.
 *
 * Usage:
 *   node scripts/seed-products.mjs
 *
 * Prerequisites:
 *   - .env.local must exist at the project root
 *   - Supabase project must be reachable
 *   - The products table and product-images bucket must already exist
 *
 * What this script does:
 *   1. Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local
 *   2. Verifies the connection and bucket
 *   3. Uploads each local image to the product-images bucket (skips if already there)
 *   4. Resolves the public URL for each image
 *   5. Inserts all product rows (skips if slug already exists — idempotent)
 *   6. Prints a final report
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

// ─── 1. Load environment ────────────────────────────────────────────────────

const envPath = resolve(process.cwd(), '.env.local');
if (!existsSync(envPath)) {
  console.error('❌  .env.local not found at project root. Aborting.');
  process.exit(1);
}

const envRaw = readFileSync(envPath, 'utf-8');
const env = Object.fromEntries(
  envRaw
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => {
      const [key, ...rest] = l.split('=');
      return [key.trim(), rest.join('=').trim()];
    })
);

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_KEY  = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ─── 2. Seed catalogue ──────────────────────────────────────────────────────
const PRODUCTS = [
  // ── WOMEN ────────────────────────────────────────────────────────────────
  {
    title:            'The Royal Presence',
    slug:             'the-royal-presence',
    description:      'A masterpiece of confidence and couture. Designed for individuals who love to stand out effortlessly with regal sophistication.',
    category:         'women',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         true,
    status:           'published',
    localImage:       'public/assets/images/female-fashion/luxury-couture-blue.jpg',
  },
  {
    title:            'Emerald Statement Gown',
    slug:             'emerald-statement-gown',
    description:      'Elegance woven into every thread. A high-glamour silhouette that commands attention through deep tones and intentional tailoring.',
    category:         'women',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         true,
    status:           'published',
    localImage:       'public/assets/images/female-fashion/emerald-statement.jpg',
  },
  {
    title:            'The Pink Radiance',
    slug:             'the-pink-radiance',
    description:      'Feminine, bold, and expressive. A tiered couture piece designed for the modern woman who embraces her power through vibrant elegance.',
    category:         'women',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         true,
    status:           'published',
    localImage:       'public/assets/images/female-fashion/pink-tiered-dress.jpg',
  },
  {
    title:            'The Elegant Woman',
    slug:             'the-elegant-woman',
    description:      'Grace personified. A collection piece that embodies understated luxury and timeless Afro-Luxe femininity.',
    category:         'women',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         false,
    status:           'published',
    localImage:       'public/assets/images/female-fashion/the-elegant-woman.jpg',
  },

  // ── MEN ──────────────────────────────────────────────────────────────────
  {
    title:            'Men of Class',
    slug:             'men-of-class',
    description:      'Power dressing, redefined. A sharp, commanding collection built for the man who leads with presence and precision.',
    category:         'men',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         true,
    status:           'published',
    localImage:       'public/assets/images/male-fashion/men-of-class.jpg',
  },

  // ── HAIR ─────────────────────────────────────────────────────────────────
  {
    title:            'Her Crown Collection',
    slug:             'her-crown-collection',
    description:      'Every woman deserves a crown that matches her confidence. Premium wigs curated for effortless glamour.',
    category:         'hair',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         true,
    status:           'published',
    localImage:       'public/assets/images/wigs/her-crown-collection.jpg',
  },
  {
    title:            'Luxury Hair Vol. II',
    slug:             'luxury-hair-vol-ii',
    description:      'The second chapter of our hair curation. Elevated texture, unmatched quality, made for bold presence.',
    category:         'hair',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         false,
    status:           'published',
    localImage:       'public/assets/images/wigs/luxury-hair-v2.jpg',
  },

  // ── PERFUMES ─────────────────────────────────────────────────────────────
  {
    title:            'Signature Fragrances',
    slug:             'signature-fragrances',
    description:      "Dark Easterner's olfactory identity. A curated collection of signature scents designed to linger with quiet authority.",
    category:         'perfumes',
    price:            null,
    show_price:       false,
    stock_quantity:   0,
    in_stock:         false,
    inventory_status: 'available',
    featured:         true,
    status:           'published',
    localImage:       'public/assets/images/atmosphere/signature-fragrances.jpg',
  },
];

const BUCKET = 'product-images';

// ─── 3. Helpers ─────────────────────────────────────────────────────────────

function mimeType(filePath) {
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
  if (filePath.endsWith('.png'))  return 'image/png';
  if (filePath.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

async function uploadImage(localRelPath) {
  const absPath  = resolve(process.cwd(), localRelPath);
  const fileName = `seed-${basename(absPath)}`;
  const mime     = mimeType(absPath);

  // Check if already exists in bucket (idempotency)
  const { data: existing } = await supabase.storage
    .from(BUCKET)
    .list('', { search: fileName });

  if (existing && existing.some((f) => f.name === fileName)) {
    console.log(`  ↩  Already in bucket: ${fileName}`);
  } else {
    if (!existsSync(absPath)) {
      console.warn(`  ⚠  Local file not found, skipping: ${absPath}`);
      return null;
    }
    const fileBuffer = readFileSync(absPath);
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, fileBuffer, { contentType: mime, upsert: false });

    if (error) {
      console.warn(`  ⚠  Upload failed for ${fileName}: ${error.message}`);
      return null;
    }
    console.log(`  ✅  Uploaded: ${fileName}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// ─── 4. Main ────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌿  Dark Easterner — Product Seed & Recovery (Clean Edition)');
  console.log('=============================================================\n');

  // Verify connection
  const { error: pingError } = await supabase.from('products').select('id').limit(1);
  if (pingError) {
    console.error('❌  Cannot reach Supabase products table:', pingError.message);
    process.exit(1);
  }
  console.log('✅  Supabase connection confirmed.');

  // Show current row count
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log(`📊  Current products in DB: ${count ?? 0}\n`);

  const results = { inserted: 0, skipped: 0, failed: 0 };

  for (const product of PRODUCTS) {
    console.log(`\n📦  ${product.title}  [${product.category}]`);

    // 1. Upload image to Storage
    const imageUrl = await uploadImage(product.localImage);
    if (!imageUrl) {
      results.failed++;
      continue;
    }

    // 2. Check for existing slug (idempotency guard)
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', product.slug)
      .single();

    if (existing) {
      console.log(`  ↩  Already in DB (slug: ${product.slug}). Skipping insert.`);
      results.skipped++;
      continue;
    }

    // 3. Insert row — strip localImage before sending to DB
    const { localImage, ...row } = product;
    const { error: insertError } = await supabase.from('products').insert({
      ...row,
      main_image_url: imageUrl,
    });

    if (insertError) {
      console.error(`  ❌  Insert failed: ${insertError.message}`);
      results.failed++;
    } else {
      console.log(`  ✅  Inserted into DB.`);
      results.inserted++;
    }
  }

  // ── Final report ──────────────────────────────────────────────────────────
  console.log('\n=============================================');
  console.log('🏁  Seed complete.\n');
  console.log(`  ✅  Inserted : ${results.inserted}`);
  console.log(`  ↩  Skipped  : ${results.skipped}`);
  console.log(`  ❌  Failed   : ${results.failed}`);
}

seed().catch((err) => {
  console.error('\n💥  Unexpected error:', err);
  process.exit(1);
});
