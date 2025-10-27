import type { Key } from "react";
import { Routers } from "@/configs/router.config";
import type { Name } from "@/types/share.type";

export const navigation: Menu[] = [
	{
		id: 1,
		name: {
			ru: "Главная",
			en: "Home",
			uz: "Bosh sahifa",
		},
		path: Routers.home,
	},
	{
		id: 2,
		name: {
			ru: "О нас",
			en: "About",
			uz: "Biz haqimizda",
		},
		path: Routers.about,
	},
	{
		id: 3,
		name: {
			ru: "Услуги",
			en: "Services",
			uz: "Xizmatlar",
		},
		path: Routers.services,
	},
	{
		id: 4,
		name: {
			ru: "Контакты",
			en: "Contacts",
			uz: "Kontaktlar",
		},
		path: Routers.contacts,
	},
] as const;

interface Menu {
	id: Key;
	name: Name;
	path: string;
}
