
import { Wrapper } from "@/components/ui/wrapper"
import { Container } from "@/components/widgets/container"
import { NewsCarousel } from "./news-carousel"
import { LinkButton } from "@/components/ui/link-button"
import { Routers } from "@/configs/router.config"
import { Link } from "@/i18n/navigation"
import { newsData } from "@/defaults/news.default"
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { getLocale, getTranslations } from "next-intl/server"


export const News = async () => {
    const locale = await getLocale();
    const t = await getTranslations("HomePage.News")

    return (
        <section data-slot="news" className="py-12 md:py-16 bg-gray-50 overflow-x-hidden">
            <Container>
                <Wrapper className="py-6 md:py-9 gap-6" column={1} xl={3}>
                    <h2 className="text-gray-900 text-3xl font-extrabold tracking-tight mb-4 md:mb-0">
                        {t("title")}
                    </h2>

                    <NewsCarousel newsData={newsData.map(item => ({
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        short_description: item.short_description
                    }))} />

                    <div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                                {t("more")}
                            </h3>

                            <LinkButton
                                rounded
                                variant="black"
                                size="sm"
                                href={Routers.news}
                                className="px-4 py-1.5 text-xs md:px-6 md:py-2 md:text-sm font-medium"
                            >
                                {t("all")}
                            </LinkButton>
                        </div>

                        <ul className="space-y-3">
                            {
                                newsData.map(item => <li key={item.id} className="border-b border-gray-100 pb-3 last:border-0">
                                    <Link
                                        href={Routers.news}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between hover:text-red-600 transition-colors duration-200"
                                    >
                                        <time
                                            dateTime={item.created_at.toISOString()}
                                            className="text-sm text-gray-400 mr-5"
                                        >
                                            {dayjs(item.created_at)
                                                .locale("ru")
                                                .format("DD.MM.YYYY")}
                                        </time>
                                        <span className="text-gray-700 font-medium sm:text-right mt-1 sm:mt-0">
                                            {item.name[locale]}
                                        </span>
                                    </Link>
                                </li>)
                            }
                        </ul>
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}