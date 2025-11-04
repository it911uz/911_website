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
	auth: {
		signIn: "/auth/sign-in",
		signUp: "/auth/sign-up",
		forgotPassword: "/auth/restore",
		newPassword: "/auth/password",
	},
	admin: {
		dashboard: "/admin/dashboard",
		leads: "/admin/leads",
		tasks: "/admin/tasks",
	}
} as const;
