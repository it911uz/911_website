import { getUser } from "@/api/users/get-user.api";
import { ProfileForm } from "./profile-form";
import { ChangePasswordForm } from "./change-password-form";
import { auth } from "@/auth";

export const ProfileContent = async () => {
    const session = await auth();

    const { data } = await getUser({
        token: session?.user.accessToken,
        id: Number(session?.user.userId),
    });

    return (
        <section className="px-4 py-10 lg:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-8">
                <ProfileForm user={data} />
                <ChangePasswordForm />
            </div>
        </section>
    );
};
