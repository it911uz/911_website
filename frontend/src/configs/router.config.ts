export const Routers = {
	home: "/",
	about: "/about",
	brands: "/brands",
	news: "/news",
	contacts: "/contacts",
	newsById: (id: number) => `/news/${id}`,
	brandById: (id: number) => `/brands/${id}`,
	offers: "/offers",
	promotion: "/promotion",
	policy: "/policy",
	forgotPassword: "/forgot-password",
	admin: {
		dashboard: "/admin/dashboard",
	}
} as const;
