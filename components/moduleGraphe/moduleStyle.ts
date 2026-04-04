import { StyleSheet } from "react-native";
import { sw, sf } from "./responsive";

export const s = StyleSheet.create(
{
    scroll:
    {
        alignItems: "center",
        paddingVertical: sw(32),
        paddingHorizontal: sw(20),
    },

    scoreLabel:
    {
        fontSize: sf(20),
        color: "rgba(255,255,255,0.7)",
        fontWeight: "500",
        marginBottom: sw(4),
    },

    scoreNumber:
    {
        fontSize: sf(80),
        fontWeight: "900",
        color: "#fff",
        lineHeight: sf(88),
        marginBottom: sw(20),
    },

    btnRow:
    {
        flexDirection: "row",
        gap: sw(10),
        marginBottom: sw(16),
        flexWrap: "wrap",
        justifyContent: "center",
    },

    btnGold:
    {
        backgroundColor: "#51bdff",
        paddingVertical: sw(14),
        paddingHorizontal: sw(22),
        borderRadius: sw(12),
    },

    btnGoldText:
    {
        color: "#fff",
        fontSize: sf(14),
        fontWeight: "700",
    },

    btnSecondary:
    {
        backgroundColor: "rgba(0,188,255,0.13)",
        paddingVertical: sw(14),
        paddingHorizontal: sw(22),
        borderRadius: sw(12),
    },

    btnSecondaryText:
    {
        color: "#fff",
        fontSize: sf(14),
        fontWeight: "600",
    },

    hint:
    {
        fontSize: sf(13),
        color: "rgba(255,255,255,0.4)",
        textAlign: "center",
        marginBottom: sw(8),
    },

    switchRow:
    {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: sw(10),
        padding: sw(3),
        marginBottom: sw(14),
        gap: sw(4),
        width: "100%",
    },

    switchBtn:
    {
        flex: 1,
        paddingVertical: sw(7),
        borderRadius: sw(8),
        alignItems: "center",
    },

    switchBtnActive:
    {
        backgroundColor: "rgba(81,189,255,0.2)",
    },

    switchText:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: sf(13),
        fontWeight: "600",
    },

    switchTextActive:
    {
        color: "#51bdff",
    },

    graphCard:
    {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: sw(16),
        padding: sw(16),
        marginTop: sw(8),
    },

    graphTitle:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: sf(11),
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: sw(12),
    },

    statsRow:
    {
        flexDirection: "row",
        marginTop: sw(16),
        justifyContent: "space-around",
        alignItems: "center",
    },

    statBox:
    {
        flex: 1,
        alignItems: "center",
        gap: sw(2),
    },

    statDivider:
    {
        width: 1,
        height: sw(32),
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    statValue:
    {
        color: "#fff",
        fontSize: sf(20),
        fontWeight: "800",
    },

    statLabel:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: sf(11),
        fontWeight: "500",
    },

    podiumContainer:
    {
        width: "100%",
        marginTop: sw(24),
    },

    podiumRow:
    {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: sw(8),
        marginBottom: sw(24),
    },

    podiumCol:
    {
        flex: 1,
        alignItems: "center",
        gap: sw(4),
    },

    medal:
    {
        fontSize: sf(22),
    },

    podiumName:
    {
        color: "rgba(255,255,255,0.7)",
        fontSize: sf(11),
        fontWeight: "600",
        maxWidth: sw(90),
        textAlign: "center",
    },

    podiumScore:
    {
        color: "#fff",
        fontSize: sf(16),
        fontWeight: "800",
    },

    meText:
    {
        color: "#51bdff",
    },

    podiumBlock:
    {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderTopLeftRadius: sw(8),
        borderTopRightRadius: sw(8),
        alignItems: "center",
        justifyContent: "center",
    },

    meBlock:
    {
        backgroundColor: "rgba(81,189,255,0.2)",
    },

    rankText:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: sf(12),
        fontWeight: "700",
    },

    myRankRow:
    {
        backgroundColor: "rgba(81,189,255,0.1)",
        borderRadius: sw(10),
        padding: sw(12),
        marginBottom: sw(16),
        alignItems: "center",
    },

    myRankText:
    {
        color: "#51bdff",
        fontWeight: "700",
        fontSize: sf(14),
    },

    list:
    {
        gap: sw(6),
    },

    listRow:
    {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: sw(10),
        paddingHorizontal: sw(12),
        borderRadius: sw(10),
        backgroundColor: "rgba(255,255,255,0.04)",
    },

    meListRow:
    {
        backgroundColor: "rgba(81,189,255,0.1)",
    },

    listRank:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: sf(13),
        fontWeight: "700",
        width: sw(36),
    },

    listName:
    {
        flex: 1,
        color: "rgba(255,255,255,0.8)",
        fontSize: sf(14),
        fontWeight: "600",
    },

    listScore:
    {
        color: "#fff",
        fontSize: sf(14),
        fontWeight: "800",
    },

    meListText:
    {
        color: "#51bdff",
    },
});