import type { Key } from "react";
import { Routers } from "@/configs/router.config";
import type { Name } from "@/types/share.type";

export const navigation: Menu[] = [
	{
		id: 2,
		name: {
			ru: "О компании",
			en: "About",
			uz: "Biz haqimizda",
		},
		children: [
			{
				id: 2,
				name: {
					ru: "Наша команда",
					en: "Our team",
					uz: "Bizning komanda",
				},
				path: Routers.about,
			}
		]
	},
	{
		id: 3,
		name: {
			ru: "Акция",
			en: "Promotion",
			uz: "Aksiyalar",
		},
		path: Routers.promotion,
	},
	{
		id: 4,
		name: {
			ru: "Новости",
			en: "News",
			uz: "Yangiliklar",
		},
		path: Routers.news,
	},
	{
		id: 5,
		name: {
			ru: "Контакты",
			en: "Contacts",
			uz: "Kontaktlar",
		},
		path: Routers.contacts,
	}
] as const;

export interface Menu {
	id: Key;
	name: Name;
	path?: string;
	children?: Menu[];
}
