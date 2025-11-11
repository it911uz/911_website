import { pageValidation } from "@/schemas/shared.schema";
import {
    createParser,
    createSearchParamsCache,
    createSerializer,
    parseAsArrayOf,
    parseAsBoolean,
    parseAsInteger,
    parseAsIsoDateTime,
    parseAsString,
} from "nuqs/server";
import { safeParse } from "zod";

const parseAsPage = createParser({
    parse(queryValue) {
        const parsed = safeParse(pageValidation, queryValue);
        return parsed.success ? parsed.data : 1;
    },
    serialize(value) {
        return String(value);
    },
});

// для клиентной части
export const searchParamsParsers = {
    page: parseAsPage.withDefault(1).withOptions({
        shallow: false,
        history: "push",
        clearOnDefault: true,
    }),
    query: parseAsString.withDefault("").withOptions({
        shallow: false,
        history: "replace",
        clearOnDefault: true,
    }),
    isActive: parseAsBoolean.withDefault(true).withOptions({
        shallow: false,
        history: "push",
    }),
    array: parseAsArrayOf(parseAsInteger).withOptions({
        shallow: false,
        history: "push",
    }),
    tab: parseAsString.withOptions({
        shallow: false,
        history: "replace",
        clearOnDefault: true,
    }),
    fromDate: parseAsIsoDateTime.withOptions({
        shallow: false,
        history: "replace",
        clearOnDefault: true,
    }),
    toDate: parseAsIsoDateTime.withOptions({
        shallow: false,
        history: "replace",
        clearOnDefault: true,
    }),
    userRole: parseAsInteger.withOptions({
        shallow: false,
        history: "replace",
        clearOnDefault: true,
    }),
    perPage: parseAsInteger.withDefault(100).withOptions({
        shallow: false,
        history: "push",
        clearOnDefault: true,
    }),
    targetId: parseAsString.withOptions({
        shallow: false,
        history: "replace",
        clearOnDefault: true,
    }),
};

export const serialize = createSerializer(searchParamsParsers);

// для серверной части
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);