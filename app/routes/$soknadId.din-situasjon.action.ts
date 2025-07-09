import { ActionFunctionArgs } from "react-router";
import {lagreSeksjon} from "~/models/lagreSeksjon.server";

export const action = async ({request, params}: ActionFunctionArgs) => {
    const form = await request.formData()
    console.log("Form data received:", form);
    const response = await lagreSeksjon(
        request,
        params.soknadId as string,
        "din-situasjon",
        JSON.stringify(form)
    )
    console.log("Response from lagreSeksjon:", response);
    return response.message;
}
