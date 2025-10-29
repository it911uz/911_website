/* src/components/sections/news-carousel.tsx */
"use client";

import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Name } from "@/types/share.type";
import { MoveRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";

export const NewsCarousel = ({ newsData = [] }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainApi, setMainApi] = useState<CarouselApi>();
    const locale = useLocale();

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return;
        const index = emblaMainApi.selectedScrollSnap();
        setSelectedIndex(index);
    }, [emblaMainApi]);

    useEffect(() => {
        if (!emblaMainApi) return;

        onSelect();
        emblaMainApi.on("select", onSelect);
        emblaMainApi.on("reInit", onSelect);

        return () => {
            emblaMainApi.off("select", onSelect);
            emblaMainApi.off("reInit", onSelect);
        };
    }, [emblaMainApi, onSelect]);

    const currentSlide = newsData[selectedIndex] ?? newsData[0];

    return (
        <div className="overflow-hidden rounded-2xl flex flex-col md:flex-row shadow-xl">
            <div className="w-full md:w-[35%] h-auto md:h-[450px] flex flex-col justify-center md:justify-end py-6 px-4 md:pb-10 md:px-6 bg-gray-900 text-white order-2 md:order-1">
                <h4 className="text-xl md:text-3xl font-semibold tracking-wide mb-3">
                    {currentSlide?.name?.[locale] ?? "Без названия"}
                </h4>

                {currentSlide?.description && (
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                        {currentSlide.description[locale] ?? ""}
                    </p>
                )}

                <Link
                    href={Routers.newsById(currentSlide?.id ?? 0)}
                    className="mt-6 md:mt-10 inline-flex items-center gap-2 group text-red-500 hover:text-red-400 transition-colors"
                >
                    <span className="text-sm font-semibold duration-300 transition-all ease-in-out">
                        Узнать больше
                    </span>

                    <MoveRight className="size-4 group-hover:translate-x-1 duration-300 transition-all ease-in-out" />
                </Link>
            </div>

            <Carousel
                setApi={setMainApi}
                className={cn("relative flex-1 bg-white order-1 md:order-2")}
            >
                <CarouselContent>
                    {newsData.map((item) => (
                        <CarouselItem key={item.id}>
                            <div className="flex justify-center items-center h-[200px] md:h-[450px] bg-gray-100 overflow-hidden">
                                <Image
                                    priority
                                    src={item.image}
                                    alt={item.name?.[locale] ?? ""}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselDots className="absolute bottom-4 right-4 md:right-10" />
            </Carousel>
        </div>
    );
};

interface Props {
    newsData: News[];
}

export interface News {
    image: string | StaticImageData;
    name: Name;
    id: number;
    description?: Name;
}