import { ContactsForm } from "./contacts-form";
import { Address } from "./address";

export const ContactsContent = () => {
    return <section data-slot="contacts">
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="flex-1 py-16 lg:pb-24 lg:pt-64">
                <Address />
            </div>

            <div className="flex-1 bg-[#282728] text-white py-16 lg:py-24">
                <ContactsForm />
            </div>
        </div>
    </section>
};