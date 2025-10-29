export const Routers = {
	home: "/",
	about: "/about",
	brands: "/brands",
	news: "/news",
	contacts: "/contacts",
	newsById: (id: number) => `/news/${id}`,
	brandById: (id: number) => `/brands/${id}`,
	offers: "/offers",
} as const;
