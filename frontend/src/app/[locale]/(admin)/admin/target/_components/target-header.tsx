import { auth } from "@/auth";
import { CreateTarget } from "./create-target";
import { PERMISSIONS } from "@/const/permissions.const";

export const TargetHeader = async () => {
    const session = await auth();

    const canCreateTarget = session?.user.permissions.includes(PERMISSIONS.create_target_companies);

    return (
        <section
            data-slot="targets"
            className="px-4 pt-6 sm:pt-8 lg:px-8"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        Таргет
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Управляйте своим таргетом, конвертируйте и отслеживайте эффективность.
                    </p>
                </div>

                {
                    canCreateTarget && <div className="w-full sm:w-auto">
                        <CreateTarget />
                    </div>
                }
            </div>
        </section>
    );
};
