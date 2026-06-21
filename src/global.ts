//vercel:
// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2009" : "https://server-maintenance.vercel.app"
//render:
export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2009" : "https://server-maintenance-ssu7.onrender.com"
export const baseUrlV2 = process.env.NODE_ENV == "development" ? "http://localhost:2009/v2" : "https://server-maintenance-ssu7.onrender.com/v2"

export const maxAvaliableHoursUsage = 750
