/**
 * Dark Easterner Collections — Seed Revert Script (Clean Edition)
 * ================================================================
 * Removes exactly what seed-products.mjs (clean edition) inserted.
 * Does NOT touch any products you added manually through the admin panel.
 *
 * Usage:
 *   node scripts/revert-seed.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// ─── Load environment ───────────────────────────────────────────────────────

const envPath = resolve(process.cwd(), '.env.local');
if (!existsSync(envPath)) {
  console.error('❌  .env.local not found. Aborting.');
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

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY']
);

// ─── Exact slugs and storage filenames inserted by seed-products.mjs ────────

const SEEDED_SLUGS = [
  'the-royal-presence',
  'emerald-statement-gown',
  'the-pink-radiance',
  'the-elegant-woman',
  'men-of-class',
  'her-crown-collection',
  'luxury-hair-vol-ii',
  'signature-fragrances',
];

const SEEDED_STORAGE_FILES = [
  'seed-luxury-couture-blue.jpg',
  'seed-emerald-statement.jpg',
  'seed-pink-tiered-dress.jpg',
  'seed-the-elegant-woman.jpg',
  'seed-men-of-class.jpg',
  'seed-her-crown-collection.jpg',
  'seed-luxury-hair-v2.jpg',
  'seed-signature-fragrances.jpg',
];

const BUCKET = 'product-images';

async function revert() {
  console.log('\n🔄  Dark Easterner — Seed Revert (Clean Edition)');
  console.log('=================================================\n');

  // 1. Delete DB rows by slug
  console.log('🗑️  Removing seeded rows from products table...');
  const { error: deleteError, count } = await supabase
    .from('products')
    .delete({ count: 'exact' })
    .in('slug', SEEDED_SLUGS);

  if (deleteError) {
    console.error('❌  DB delete failed:', deleteError.message);
  } else {
    console.log(`  ✅  Removed ${count ?? 0} row(s) from products table.`);
  }

  // 2. Remove images from Storage
  console.log('\n🗑️  Removing seeded images from Storage bucket...');
  const { error: storageError, data: removed } = await supabase.storage
    .from(BUCKET)
    .remove(SEEDED_STORAGE_FILES);

  if (storageError) {
    console.warn('  ⚠  Storage cleanup warning:', storageError.message);
  } else {
    const count = removed?.length ?? 0;
    console.log(`  ✅  Removed ${count} file(s) from ${BUCKET} bucket.`);
  }

  // 3. Confirm remaining product count
  const { count: remaining } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  console.log('\n=================================');
  console.log('🏁  Revert complete.\n');
  console.log(`  📊  Products remaining in DB: ${remaining ?? 0}`);
}

revert().catch((err) => {
  console.error('\n💥  Unexpected error:', err);
  process.exit(1);
});
