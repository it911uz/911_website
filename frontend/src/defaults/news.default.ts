import CyberSecurityImage from "@public/images/cyber-security.jpg"
import AiIntegrationImage from "@public/images/ai-integration.jpg"
import DataCenterImage from "@public/images/data-center.jpg"
import TechConferenceImage from "@public/images/tech-conference.jpg"

export const newsData = [
    {
        id: 1,
        name: {
            ru: "Интеграция AI в систему мониторинга IT 911",
            en: "AI Integration into IT 911 Monitoring System",
            uz: "IT 911 monitoring tizimiga AI integratsiyasi",
        },
        created_at: new Date("2025-10-25T10:00:00.000Z"),
        category: "ai",
        image: AiIntegrationImage,
        short_description: {
            ru: "IT 911 внедрила искусственный интеллект в систему мониторинга. Теперь система способна предсказывать сбои и автоматически реагировать на критические ситуации.",
            en: "IT 911 has integrated AI into its monitoring system. It can now predict failures and respond automatically to critical events.",
            uz: "IT 911 monitoring tizimiga sun’iy intellekt qo‘shildi. Endi tizim nosozliklarni oldindan aniqlab, avtomatik javob bera oladi.",
        }
    },
    {
        id: 2,
        name: {
            ru: "Открытие нового дата-центра в Ташкенте",
            en: "New Data Center Opened in Tashkent",
            uz: "Toshkentda yangi ma’lumotlar markazi ochildi",
        },
        created_at: new Date("2025-11-01T15:00:00.000Z"),
        category: "infrastructure",
        image: DataCenterImage,
        short_description: {
            ru: "Мы открыли новый высокотехнологичный дата-центр, который обеспечивает более высокую скорость и надежность всех наших сервисов.",
            en: "We’ve opened a new high-tech data center providing higher speed and reliability for all IT 911 services.",
            uz: "Biz barcha IT 911 xizmatlari uchun yuqori tezlik va ishonchlilikni ta’minlovchi yangi texnologik ma’lumotlar markazini ochdik.",
        }
    },
    {
        id: 3,
        name: {
            ru: "Кибербезопасность 2025: новые протоколы защиты",
            en: "Cybersecurity 2025: New Protection Protocols",
            uz: "Kiberxavfsizlik 2025: yangi himoya protokollari",
        },
        created_at: new Date("2025-11-10T11:00:00.000Z"),
        category: "security",
        image: CyberSecurityImage,
        short_description: {
            ru: "IT 911 внедрила обновлённые протоколы безопасности, включая поведенческий анализ и систему предотвращения атак нулевого дня.",
            en: "IT 911 implemented updated security protocols, including behavioral analytics and zero-day attack prevention systems.",
            uz: "IT 911 yangilangan xavfsizlik protokollarini joriy etdi, ular orasida xulq-atvor tahlili va nol kunlik hujumlarni oldini olish tizimi mavjud.",
        }
    },
    {
        id: 4,
        name: {
            ru: "IT 911 на международной конференции TechFuture 2025",
            en: "IT 911 at TechFuture 2025 Conference",
            uz: "IT 911 TechFuture 2025 konferensiyasida",
        },
        created_at: new Date("2025-11-25T09:00:00.000Z"),
        category: "events",
        image: TechConferenceImage,
        short_description: {
            ru: "Наша команда представила инновационные решения в области кибербезопасности и AI-автоматизации на международной конференции TechFuture 2025.",
            en: "Our team presented innovative cybersecurity and AI automation solutions at the TechFuture 2025 international conference.",
            uz: "Jamoamiz TechFuture 2025 xalqaro konferensiyasida kiberxavfsizlik va AI avtomatlashtirish bo‘yicha innovatsion yechimlarni taqdim etdi.",
        }
    }
] as const;
