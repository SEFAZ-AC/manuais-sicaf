const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const isProd = process.env.NODE_ENV === "production";
export const getBasePath = () => (isProd ? basePath : "");
export const getAuthBasePath = () => (isProd ? basePath + "/api/auth" : "");
