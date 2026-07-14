export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    const data = await response.json();

    return {
      address: data.display_name || "",
      area:
        data.address?.suburb ||
        data.address?.neighbourhood ||
        data.address?.city_district ||
        data.address?.town ||
        data.address?.city ||
        "",
    };
  } catch (error) {
    console.error(error);

    return {
      address: "",
      area: "",
    };
  }
};