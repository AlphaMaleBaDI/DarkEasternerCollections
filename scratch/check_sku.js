const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSku() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, title, sku')
      .limit(1);

    if (error) {
      if (error.message && (error.message.includes('column') || error.message.includes('sku'))) {
        console.log('STATUS: COLUMN_NOT_FOUND');
      } else {
        console.error('Database query error:', error);
        console.log('STATUS: QUERY_FAILED');
      }
    } else {
      console.log('STATUS: COLUMN_FOUND');
      console.log('Sample Data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    console.log('STATUS: FAILED');
  }
}

checkSku();
