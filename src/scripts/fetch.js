const BASE_URL = import.meta.env.PUBLIC_APPS_SCRIPT_URL;
const API_KEY  = import.meta.env.PUBLIC_APPS_SCRIPT_API_KEY;

export async function getData(sheet, { limit = 9999, offset = 0 } = {}) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // Aman dari CORS preflight
      body: JSON.stringify({ 
        apiKey: API_KEY, 
        action: "read", 
        sheet, 
        limit, 
        offset 
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Unknown error");
    }

    // Mengembalikan objek { rows, total } sesuai struktur .gs baru Anda
    return {
      rows: result.data?.rows ?? [],
      total: result.data?.total ?? 0
    };

  } catch (error) {
    console.error(`[api-client] getData("${sheet}") failed:`, error);
    throw error;
  }
}