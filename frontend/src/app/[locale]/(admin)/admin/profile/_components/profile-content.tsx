import { getUser } from "@/api/users/get-user.api";
import { ProfileForm } from "./profile-form";
import { auth } from "@/auth";

export const ProfileContent = async () => {
    const session = await auth();

    const { data } = await getUser({
        token: session?.user.accessToken,
        id: Number(session?.user.userId)
    });

    return <section className="px-4 py-10 lg:px-8">
        <ProfileForm user={data} />
    </section>
};