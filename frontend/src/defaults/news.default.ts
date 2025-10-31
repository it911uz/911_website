import NewSiteImage from "@public/images/new-website.png"
import CRMUpdateImage from "@public/images/crm-update.jpg"
import NewOfficeImage from "@public/images/new-office.jpg"
import SalonBotImage from "@public/images/salon-bot.jpg"

export const newsData = [
    {
        id: 1,
        name: {
            ru: "Новая версия сайта IT 911",
            en: "New IT 911 Website Version",
            uz: "IT 911 saytining yangi versiyasi",
        },
        created_at: new Date("2025-10-01T12:00:00.000Z"),
        category: "development",
        image: NewSiteImage,
        short_description: {
            ru: "Мы запустили обновлённую версию сайта IT 911 — теперь он быстрее, удобнее и современнее. Обновлён дизайн, добавлены новые разделы и проекты.",
            en: "We’ve launched the updated version of the IT 911 website — faster, more user-friendly, and modern. The design has been refreshed with new sections and project showcases.",
            uz: "Biz IT 911 saytining yangilangan versiyasini ishga tushirdik — endi u tezroq, qulayroq va zamonaviyroq. Dizayn yangilandi, yangi bo‘limlar va loyihalar qo‘shildi.",
        }
    },
    {
        id: 2,
        name: {
            ru: "Обновление CRM IT 911",
            en: "IT 911 CRM Update",
            uz: "IT 911 CRM yangilanishi",
        },
        created_at: new Date("2025-10-05T12:00:00.000Z"),
        category: "product",
        image: CRMUpdateImage,
        short_description: {
            ru: "Вышло обновление нашей CRM-системы: добавлена аналитика, интеграция с Telegram и улучшена производительность. Теперь управление бизнесом стало ещё проще.",
            en: "Our CRM system has been updated: new analytics, Telegram integration, and improved performance. Managing your business just got easier.",
            uz: "Bizning CRM tizimimiz yangilandi: yangi analitika, Telegram integratsiyasi va yaxshilangan unumdorlik. Endi biznesni boshqarish yanada osonlashdi.",
        }
    },
    {
        id: 3,
        name: {
            ru: "Новый офис IT 911 в Ташкенте",
            en: "New IT 911 Office in Tashkent",
            uz: "Toshkentda yangi IT 911 ofisi",
        },
        created_at: new Date("2025-10-10T12:00:00.000Z"),
        category: "company",
        image: NewOfficeImage,
        short_description: {
            ru: "IT 911 расширяет присутствие — мы открыли новый современный офис в центре Ташкента. Теперь мы ещё ближе к нашим клиентам и партнёрам.",
            en: "IT 911 is expanding — a new modern office has opened in the heart of Tashkent. We’re now even closer to our clients and partners.",
            uz: "IT 911 o‘z faoliyatini kengaytirmoqda — Toshkent markazida yangi zamonaviy ofisimiz ochildi. Endi mijozlarimiz va hamkorlarimizga yanada yaqinmiz.",
        }
    },
    {
        id: 4,
        name: {
            ru: "Telegram-бот для салонов красоты",
            en: "Telegram Bot for Beauty Salons",
            uz: "Go‘zallik salonlari uchun Telegram bot",
        },
        created_at: new Date("2025-10-15T12:00:00.000Z"),
        category: "automation",
        image: SalonBotImage,
        short_description: {
            ru: "IT 911 разработала Telegram-бот для салонов красоты: онлайн-запись, уведомления и управление клиентами в одном месте. Удобно, быстро и современно.",
            en: "IT 911 has developed a Telegram bot for beauty salons: online booking, notifications, and client management in one place. Simple, fast, and modern.",
            uz: "IT 911 go‘zallik salonlari uchun Telegram bot yaratdi: onlayn yozilish, bildirishnomalar va mijozlarni boshqarish — barchasi bitta joyda. Qulay, tez va zamonaviy.",
        }
    }
] as const;
