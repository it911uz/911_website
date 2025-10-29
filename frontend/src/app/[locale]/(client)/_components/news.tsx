/* src/components/sections/news.tsx */
import { Wrapper } from "@/components/ui/wrapper"
import { Container } from "@/components/widgets/container"
import { NewsCarousel, type News as NewsType } from "./news-carousel"
import Logo from "@public/logo.svg"
import { LinkButton } from "@/components/ui/link-button"
import { Routers } from "@/configs/router.config"
import { Link } from "@/i18n/navigation"

const news: NewsType[] = [
    {
        id: 1,
        image: Logo,
        name: {
            en: "We congratulate you on Teacher's and Mentor's Day!",
            ru: "Поздравляем вас с Днём учителя и наставника!",
            uz: "O‘qituvchi va murabbiylar kuni bilan tabriklaymiz!",
        },
        description: {
            en: "Today we express our deepest gratitude to all teachers and mentors for their tireless work and dedication in shaping the future generation.",
            ru: "Сегодня мы выражаем глубокую благодарность всем учителям и наставникам за их неустанный труд и вклад в воспитание будущего поколения.",
            uz: "Bugun biz barcha o‘qituvchi va murabbiylarga yosh avlodni tarbiyalashdagi fidoyiligi uchun chuqur minnatdorchilik bildiramiz.",
        }
    },
    {
        id: 2,
        image: Logo,
        name: {
            en: "New branch opening in Tashkent!",
            ru: "Открытие нового филиала в Ташкенте!",
            uz: "Toshkentda yangi filial ochildi!",
        },
        description: {
            en: "We are pleased to announce the opening of our new branch office in Tashkent. Now our services are even closer to you!",
            ru: "Мы рады сообщить об открытии нового филиала в Ташкенте. Теперь наши услуги стали ещё ближе к вам!",
            uz: "Biz Toshkentda yangi filialimiz ochilganini mamnuniyat bilan e’lon qilamiz. Endi bizning xizmatlarimiz sizga yanada yaqin!",
        }
    },
    {
        id: 3,
        image: Logo,
        name: {
            en: "Our team participated in the International IT Forum 2025",
            ru: "Наша команда приняла участие в Международном IT-форуме 2025",
            uz: "Jamoamiz 2025-yilgi Xalqaro IT-forumda ishtirok etdi",
        },
        description: {
            en: "The event brought together leading experts from around the world. Our specialists presented innovative solutions in web and mobile development.",
            ru: "Мероприятие собрало ведущих специалистов со всего мира. Наши эксперты представили инновационные решения в области веб-и мобильной разработки.",
            uz: "Tadbirda dunyoning turli mamlakatlaridan yetakchi mutaxassislar qatnashdi. Mutaxassislarimiz veb va mobil dasturlash sohasidagi innovatsion yechimlarni taqdim etdilar.",
        }
    },
    {
        id: 4,
        image: Logo,
        name: {
            en: "Internship program 2025 has started!",
            ru: "Стартовала программа стажировок 2025!",
            uz: "2025-yilgi amaliyot dasturi boshlandi!",
        },
        description: {
            en: "Young specialists can now join our team, gain experience, and grow alongside professionals in the field.",
            ru: "Молодые специалисты могут присоединиться к нашей команде, получить опыт и развиваться вместе с профессионалами.",
            uz: "Yosh mutaxassislar endi bizning jamoamizga qo‘shilib, tajriba orttirishlari va soha mutaxassislari bilan birga rivojlanishlari mumkin.",
        }
    },
    {
        id: 5,
        image: Logo,
        name: {
            en: "Website redesign — new look and better performance",
            ru: "Редизайн сайта — новый облик и улучшенная производительность",
            uz: "Saytimiz yangilandi — yangi dizayn va yuqori samaradorlik!",
        },
        description: {
            en: "We have updated our website for faster loading, improved accessibility, and a more modern visual experience.",
            ru: "Мы обновили наш сайт для более быстрой загрузки, улучшенной доступности и современного визуального стиля.",
            uz: "Saytimiz tezroq yuklanadigan, qulay va zamonaviy interfeys bilan yangilandi.",
        }
    }
]

export const News = () => {
    return (
        <section data-slot="news" className="py-12 md:py-16 bg-gray-50">
            <Container>
                <Wrapper className="py-6 md:py-9 gap-6" column={1} xl={3}>
                    <h2 className="text-gray-900 text-3xl font-extrabold tracking-tight mb-4 md:mb-0">
                        ~ Наши новости
                    </h2>

                    <NewsCarousel newsData={news} />

                    <div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                                Ещё новости
                            </h3>

                            <LinkButton
                                rounded
                                variant="black"
                                size="sm"
                                href={Routers.news}
                                className="px-4 py-1.5 text-xs md:px-6 md:py-2 md:text-sm font-medium"
                            >
                                Все новости
                            </LinkButton>
                        </div>

                        <ul className="space-y-3">
                            <li className="border-b border-gray-100 pb-3 last:border-0">
                                <Link
                                    href={Routers.news}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between hover:text-red-600 transition-colors duration-200"
                                >
                                    <span className="text-sm text-gray-400 mr-5">01.04.2023</span>
                                    <span className="text-gray-700 font-medium sm:text-right mt-1 sm:mt-0">
                                        Новая версия сайта
                                    </span>
                                </Link>
                            </li>

                            <li className="border-b border-gray-100 pb-3 last:border-0">
                                <Link
                                    href={Routers.news}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between hover:text-red-600 transition-colors duration-200"
                                >
                                    <span className="text-sm text-gray-400">15.03.2023</span>
                                    <span className="text-gray-700 font-medium sm:text-right mt-1 sm:mt-0">
                                        Новый офис в Самарканде
                                    </span>
                                </Link>
                            </li>

                            <li className="border-b border-gray-100 pb-3 last:border-0">
                                <Link
                                    href={Routers.news}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between hover:text-red-600 transition-colors duration-200"
                                >
                                    <span className="text-sm text-gray-400">10.02.2023</span>
                                    <span className="text-gray-700 font-medium sm:text-right mt-1 sm:mt-0">
                                        Обновление клиентского
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}