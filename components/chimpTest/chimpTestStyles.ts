import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const chimpTestStyles = StyleSheet.create({
    container: 
    {
        flex: 1,
        backgroundColor: "#1a1a2e",
        alignItems: "center",
        justifyContent: "center"
    },

    centered:
    {
        alignItems: "center",
        paddingHorizontal: 28
    },

    title:
    {
        fontSize: 32,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 10,
        letterSpacing: 0.5
    },

    subtitle:
    {
        fontSize: 14,
        color: "rgba(255,255,255,0.6)",
        textAlign: "center",
        lineHeight: 21,
        marginBottom: 32
    },

    modeLabel:
    {
        fontSize: 12,
        color: "rgba(255,255,255,0.4)",
        fontWeight: "700",
        letterSpacing: 1.4,
        textTransform: "uppercase",
        marginBottom: 14
    },

    modeRow:
    {
        flexDirection: "row",
        gap: 14
    },

    modeCard:
    {
        flex: 1,
        borderWidth: 2,
        borderRadius: 18,
        padding: 18,
        alignItems: "center",
        gap: 10,
        backgroundColor: "rgba(255,255,255,0.05)"
    },

    modeBadge:
    {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20
    },

    modeBadgeText:
    {
        color: "#fff",
        fontWeight: "800",
        fontSize: 15
    },

    modeDescription:
    {
        color: "rgba(255,255,255,0.5)",
        fontSize: 12,
        textAlign: "center",
        lineHeight: 17
    },

    modeLivesPreview:
    {
        flexDirection: "row",
        gap: 4,
        marginTop: 2
    },

    header:
    {
        alignItems: "center",
        marginBottom: 20,
        gap: 2
    },

    levelText:
    {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 1
    },

    phaseHint:
    {
        fontSize: 14,
        color: "rgba(255,255,255,0.55)",
        fontWeight: "500"
    },

    grid:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        width: width - 48,
        justifyContent: "flex-start"
    },

    modePill:
    {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 16
    },

    modePillText:
    {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13
    },

    label:
    {
        fontSize: 20,
        color: "rgba(255,255,255,0.7)",
        fontWeight: "500",
        marginBottom: 4
    },

    scoreNumber:
    {
        fontSize: 80,
        fontWeight: "900",
        color: "#fff",
        lineHeight: 88,
        marginBottom: 20
    },

    compareText:
    {
        fontSize: 14,
        color: "rgba(255,255,255,0.55)",
        textAlign: "center",
        marginBottom: 36
    },

    btnRow:
    {
        flexDirection: "row",
        gap: 14
    },

    btnGold:
    {
        backgroundColor: "#51bdff",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12
    },

    btnGoldText:
    {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700"
    },

    btnSecondary:
    {
        backgroundColor: "rgba(0,188,255,0.13)",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12
    },

    btnSecondaryText:
    {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600"
    },
});