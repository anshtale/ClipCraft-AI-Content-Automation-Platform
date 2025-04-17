import { AliStyle } from "@/app/(protected)/create/_components/_previewCaptionComponents/ali_style";
import GahaziCaption from "@/app/(protected)/create/_components/_previewCaptionComponents/gahazi";
import HormoziCaption from "@/app/(protected)/create/_components/_previewCaptionComponents/hormozi";
import PhoenixRise from "@/app/(protected)/create/_components/_previewCaptionComponents/phoenixRise";

export const PREVIEW_CAPTION_COMPONENTS = {
    HORMOZI: HormoziCaption,
    ALI_STYLE : AliStyle,
    GAHAZI : GahaziCaption,
    PHOENIXRISE:PhoenixRise,
    default : PhoenixRise,
}

export type PreviewCaptionStyleName = keyof typeof PREVIEW_CAPTION_COMPONENTS;