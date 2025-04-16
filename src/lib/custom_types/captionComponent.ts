import { AliStyle } from "@/app/(protected)/editor/_components/_captionComponents/ali_style";
import HormoziCaption from "../../app/(protected)/editor/_components/_captionComponents/hormozi";
import GahaziCaption from "@/app/(protected)/editor/_components/_captionComponents/gahazi";
import PhoenixRise from "@/app/(protected)/editor/_components/_captionComponents/phoenixRise";

export const CAPTION_COMPONENTS = {
    HORMOZI: HormoziCaption,
    ALI_STYLE : AliStyle,
    GAHAZI : GahaziCaption,
    PHOENIXRISE:PhoenixRise,
    default : PhoenixRise,
}

export type CaptionStyleName = keyof typeof CAPTION_COMPONENTS;