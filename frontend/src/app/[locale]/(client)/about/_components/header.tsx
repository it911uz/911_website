import { Wrapper } from "@/components/ui/wrapper";
import { Container } from "@/components/widgets/container";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export const Header = async () => {

    const t = await getTranslations("AboutPage")

    return (
        <header className="relative py-48 md:py-64 bg-[#e6e6e6] overflow-hidden">
            <Container>
                <p className="text-right text-gray-500 text-xl md:text-2xl font-medium tracking-wide mb-4">
                    {
                        t.rich("theme", {
                            dot: (dot) => <> &bull; {dot}</>
                        })
                    }
                </p>

                <h1 className="text-5xl md:text-7xl xl:text-[170px] leading-none text-center font-black tracking-wider text-[#c81e1e] uppercase">
                    {
                        t("title")
                    }
                </h1>

                <Wrapper className="gap-10 grid-cols-1 md:grid-cols-2 mt-16 md:mt-24">
                    <div className="space-y-10 md:space-y-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {
                                t("content.title")
                            }
                        </h2>

                        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                            {
                                t.rich("content.description.1", {
                                    bold: (bold) => <strong>{bold}</strong>
                                })
                            }
                        </p>

                        <div className="pt-6">
                            <Link
                                href={Routers.contacts}
                                className="inline-block bg-[#c81e1e] text-white font-semibold text-lg px-10 py-4 rounded-full shadow-md transition-all hover:bg-[#a31818] hover:shadow-lg"
                                aria-label={t("content.link")}
                            >
                                {
                                    t("content.link")
                                }
                            </Link>
                        </div>
                    </div>

                    <div className="text-lg md:text-xl leading-relaxed text-gray-700 space-y-6">
                        <p>
                            {
                                t.rich("content.description.2", {
                                    bold: (bold) => <strong>{bold}</strong>
                                })
                            }
                        </p>
                        <p>
                            {
                                t.rich("content.description.3")
                            }
                        </p>
                        <p>
                            {
                                t.rich("content.description.4")
                            }
                        </p>
                    </div>
                </Wrapper>
            </Container>

            <div
                className="absolute inset-x-0 bottom-0 h-[120px] bg-linear-to-t from-[#e6e6e6] to-transparent pointer-events-none"
                aria-hidden="true"
            />
        </header>
    );
};
