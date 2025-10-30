import { Routers } from "@/configs/router.config"
import { TargetLinks } from "@/configs/target-links.config"
import { Link } from "@/i18n/navigation"

export const Address = () => {
    return (
        <div className="space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-24">
            <Link
                scroll={false}
                href={Routers.contacts + "#!"}
                className="block text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3"
            >
                Ташкент
            </Link>

            <div className="px-0 lg:px-4 space-y-8 md:space-y-10">

                <div className="grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <a
                        href={`tel:${TargetLinks.phone}`}
                        className="text-3xl min-[450px]:text-4xl min-[520px]:text-5xl sm:text-3xl md:text-5xl lg:text-4xl 2xl:text-5xl hover:text-orange-600 font-extrabold text-gray-900 transition-colors duration-300 block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +998 (77) 443-33-35
                    </a>

                    <a
                        href={`tel:${TargetLinks.phone2}`}
                        className="text-3xl min-[450px]:text-4xl min-[520px]:text-5xl sm:text-3xl md:text-5xl lg:text-4xl 2xl:text-5xl hover:text-orange-600 font-extrabold text-gray-900 transition-colors duration-300 block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +998 (77) 443-33-36
                    </a>

                    <a
                        href={`tel:+998959553933`}
                        className="text-3xl min-[450px]:text-4xl min-[520px]:text-5xl sm:text-3xl md:text-5xl lg:text-4xl 2xl:text-5xl hover:text-orange-600 font-extrabold text-gray-900 transition-colors duration-300 block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +998 (95) 955-39-33
                    </a>

                    <a
                        href={`tel:+998903297700`}
                        className="text-3xl min-[450px]:text-4xl min-[520px]:text-5xl sm:text-3xl md:text-5xl lg:text-4xl 2xl:text-5xl hover:text-orange-600 font-extrabold text-gray-900 transition-colors duration-300 block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +998 (90) 329-77-00
                    </a>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <a
                        href={`mailto:${TargetLinks.email}`}
                        className="text-xl md:text-4xl hover:text-orange-600 font-extrabold text-gray-900 transition-colors duration-300 block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {TargetLinks.email}
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 text-gray-700">
                    <div>
                        <p className="text-sm md:text-base font-semibold mb-1 text-gray-900">Адрес:</p>
                        <p className="text-sm md:text-base">
                            Chorsu MFY, 4 дом, 135 квартира
                        </p>
                    </div>
                    <div>
                        <p className="text-sm md:text-base font-semibold mb-1 text-gray-900">Часы работы:</p>
                        <p className="text-sm md:text-base">
                            Пн-Вс: 10:00–19:00
                        </p>
                        <p className="text-sm md:text-base">
                            Без выходных
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}