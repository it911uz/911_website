import { Header } from "./header"
import { SectionHistory } from "./history"
import { SectionMission } from "./mission"

export const AboutContent = () => {
    return <>
        <Header />
        <SectionMission />
        <SectionHistory />
    </>
}