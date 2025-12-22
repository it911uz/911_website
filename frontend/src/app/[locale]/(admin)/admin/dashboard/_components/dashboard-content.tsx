import { Cards } from "./cards"
import { Charts } from "./charts"

export const DashboardContent = async () => {
    return (
        <div className="flex flex-col gap-10 pt-10">
            <Cards />
            <Charts />
        </div>
    )
}
