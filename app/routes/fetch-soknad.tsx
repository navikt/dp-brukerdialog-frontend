import {getEnv} from "~/utils/env.utils";

export async function loader() {

    console.log("Fetching land data from API...");
    const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad`;


    const response = await fetch(url, {
        method: "POST"
    });

    if (!response.ok) {
        console.log("Failed to fetch land data from API:", response.status, response.statusText);
        return "Failed to fetch land data";
    }

    return response
}
