import {getSoknadOrkestratorOboToken} from "~/utils/auth.utils.server";
import {getEnv} from "~/utils/env.utils";

export async function hentBarn(request: Request) {
    const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/barn`;
    const onBehalfOfToken = await getSoknadOrkestratorOboToken(request);

    return await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${onBehalfOfToken}`,
            connection: "keep-alive",
            "Content-Type": "application/json",
        },
    });
}
