import { Routers } from "@/configs/router.config"
import { TargetLinks } from "@/configs/target-links.config"
import { Link } from "@/i18n/navigation"

export const Address = () => {
    return (
        <div className="space-y-4 lg:space-y-6 px-6 xl:px-24">
            <Link scroll={false} href={Routers.contacts + "#!"} className="block text-xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                Ташкент
            </Link>

            <div className="px-0 lg:px-4 space-y-6">

                <div>
                    <a
                        href={`tel:${TargetLinks.phone}`}
                        className="text-3xl md:text-5xl hover:text-red-600 font-extrabold text-gray-900 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +998 (95) 955-39-33
                    </a>
                </div>

                <div>
                    <a
                        href={`mailto:${TargetLinks.email}`}
                        className="text-xl md:text-4xl hover:text-red-600 font-extrabold text-gray-900 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {TargetLinks.email}
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-gray-700">
                    <div>
                        <p className="text-sm md:text-base font-semibold mb-1">Адрес:</p>
                        <p className="text-xs md:text-sm">
                            Chorsu MFY, 4 дом, 135 квартира
                        </p>
                    </div>
                    <div>
                        <p className="text-sm md:text-base font-semibold mb-1">Часы работы:</p>
                        <p className="text-xs md:text-sm">
                            Пн-Вс: 10:00–19:00
                        </p>
                        <p className="text-xs md:text-sm">
                            Без выходних
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};