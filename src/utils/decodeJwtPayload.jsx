function decodeJwtPayload(token) {
  if (!token) return null;

  const base64Url = token.split(".")[1];
  if (!base64Url) return null;

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  try {
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode token payload:", e);
    return null;
  }
}

export default decodeJwtPayload;
