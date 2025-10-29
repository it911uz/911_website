import { Bots } from "./bots";
import { Site } from "./site";
import { Systems } from "./systems"

export const Clients = () => {
    return (
        <>
            <Systems />

            <Site />

            <Bots />
        </>
    );
}