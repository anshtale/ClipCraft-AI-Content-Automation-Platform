import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

loadFont({
    family: "Coolvetica",
    url: staticFile("/fonts/coolvetica.ttf"),
    weight: "500",
});

loadFont({
    family: "EuropaGroteskSH",
    url: staticFile("/fonts/EuropaGroteskSH.ttf"),
  });
  
  loadFont({
    family: "KeplerStd-BoldScnItDisp",
    url: staticFile("/fonts/KeplerStd-BoldScnItDisp.ttf"),
  });
