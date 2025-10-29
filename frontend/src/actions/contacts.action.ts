"use server";

interface Props {
    body: {
        company_name: string;
        email: string;
        full_name: string;
        phone: string;
        company_info: string;
    };
}

export const contactsAction = async ({ body }: Props) => {

    try {
        const response = await fetch(`https://api.it911.uz/leads/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            ok: response.ok,
            status: response.status,
            data: await response.json().catch(() => null),
        };
    } catch (error) {
        console.error("Callback action error:", error);
        return {
            ok: false,
            status: 500,
            data: null,
            res: error
        };
    }
};