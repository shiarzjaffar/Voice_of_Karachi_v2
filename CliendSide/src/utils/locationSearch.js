export const searchLocation = async (query) => {
  if (!query || query.trim().length < 3) {
    return [];
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&limit=5`
    );

    return await response.json();
  } catch (error) {
    console.error("Location search failed:", error);
    return [];
  }
};