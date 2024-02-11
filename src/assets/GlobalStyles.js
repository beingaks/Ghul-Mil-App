import { StyleSheet } from "react-native";
import Colors from "./Colors";
import TypoGraphy from "./TypoGraphy";

export default StyleSheet.create({
    ScreenContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.MainBgColor
    },
    MainHeading: {
        fontSize: TypoGraphy.fontSize.Font24,
        fontWeight:TypoGraphy.fontWeight.FontWeight800,
        color: Colors.Grey
    }
})