import { LoginForm } from "./login-form";

export const FormContent = () => {

    return <section data-slot="form">
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm />
            </div>
        </div>
    </section>
};