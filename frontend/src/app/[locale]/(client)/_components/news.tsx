
import { Wrapper } from "@/components/ui/wrapper"
import { Container } from "@/components/widgets/container"
import { NewsCarousel, type News as NewsType } from "./news-carousel"
import Image1 from "@public/images/1.jpg"
import Image2 from "@public/images/2.jpg"
import Image3 from "@public/images/3.jpg"
import { LinkButton } from "@/components/ui/link-button"
import { Routers } from "@/configs/router.config"
import { Link } from "@/i18n/navigation"

const news: NewsType[] = [
    {
        id: 2,
        image: Image1,
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
        image: Image2,
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
        image: Image3,
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
]

export const News = () => {
    return (
        <section data-slot="news" className="py-12 md:py-16 bg-gray-50 overflow-x-hidden">
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
                                    <span className="text-sm text-gray-400 mr-5">01.10.2025</span>
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
                                    <span className="text-sm text-gray-400">15.10.2025</span>
                                    <span className="text-gray-700 font-medium sm:text-right mt-1 sm:mt-0">
                                        Новый офис в Ташкенте
                                    </span>
                                </Link>
                            </li>

                            <li className="border-b border-gray-100 pb-3 last:border-0">
                                <Link
                                    href={Routers.news}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between hover:text-red-600 transition-colors duration-200"
                                >
                                    <span className="text-sm text-gray-400">15.10.2025</span>
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