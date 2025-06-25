
export interface IGårdsbruk {
    organisasjonummer?: string;
    typeGårdsbruk?: string[];
    eierAvGårdsbruk?: string[];
    prosentAvInntektTilDeg?: string;
    arbeidstimerILøpetAvÅret?: string;
    arbeidsTimer?: string;
    forklaringPåBeregning?: string;
}

export interface IEgenNæring {
    driverEgenNæringsvirksomhet?: boolean;
    driverEgetGårdsbruk?: boolean;
    egneNæringsvirksomheter: INæringsvirksomhet[];
    egneGårdsbruk: IGårdsbruk[];
}

export interface INæringsvirksomhet {
    organisasjonummer?: string
    antallTimerJobbetPerUkeFør?: string
    antallTimerJobbetPerUkeNå?: string
}