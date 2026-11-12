/**
 * Sahm API Adapter
 * Reads from Supabase REST when SUPABASE_URL + SUPABASE_ANON_KEY are provided,
 * and falls back seamlessly to local seed data for zero-setup demos & previews.
 */

function createDataClient(config = {}) {
  const url = config.supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
  const anonKey = config.supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
  const isLiveSupabase = Boolean(url && anonKey);

  async function selectTable(table, fallbackRows) {
    if (!isLiveSupabase) {
      return { data: fallbackRows, source: 'mock' };
    }
    try {
      const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}?select=*`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });
      if (!res.ok) return { data: fallbackRows, source: 'mock' };
      const rows = await res.json();
      return Array.isArray(rows) && rows.length > 0 ? { data: rows, source: 'supabase' } : { data: fallbackRows, source: 'mock' };
    } catch {
      return { data: fallbackRows, source: 'mock' };
    }
  }

  return { isLiveSupabase, selectTable };
}

module.exports = { createDataClient };

