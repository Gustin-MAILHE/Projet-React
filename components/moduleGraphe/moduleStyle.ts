import { StyleSheet } from "react-native";

export const s = StyleSheet.create(
{
    scroll:
    { 
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 20
    },

    scoreLabel:
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

    btnRow:
    {
        flexDirection: "row",
        gap: 14,
        marginBottom: 16
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

    hint:
    {
        fontSize: 14,
        color: "rgba(255,255,255,0.4)",
        textAlign: "center",
        marginBottom: 8
    },

    switchRow:
    {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: 3,
        marginBottom: 14,
        gap: 4,
        width: "100%"
    },

    switchBtn:
    {
        flex: 1,
        paddingVertical: 7,
        borderRadius: 8,
        alignItems: "center"
    },

    switchBtnActive:
    {
        backgroundColor: "rgba(81,189,255,0.2)"
    },

    switchText:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: 13,
        fontWeight: "600"
    },

    switchTextActive:
    {
        color: "#51bdff"
    },

    graphCard:
    {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 16,
        padding: 16,
        marginTop: 8
    },

    graphTitle:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 12
    },

    statsRow:
    {
        flexDirection: "row",
        marginTop: 16,
        justifyContent: "space-around",
        alignItems: "center"
    },

    statBox:
    {
        flex: 1,
        alignItems: "center",
        gap: 2
    },

    statDivider:
    {
        width: 1,
        height: 32,
        backgroundColor: "rgba(255,255,255,0.1)"
    },

    statValue:
    {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800"
    },

    statLabel:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: 11,
        fontWeight: "500"
    },

    podiumContainer:
    {
        width: "100%",
        marginTop: 24
    },

    podiumRow:
    {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 8,
        marginBottom: 24
    },

    podiumCol:
    {
        flex: 1,
        alignItems: "center",
        gap: 4
    },

    medal:
    {
        fontSize: 22
    },

    podiumName:
    {
        color: "rgba(255,255,255,0.7)",
        fontSize: 11,
        fontWeight: "600",
        maxWidth: 80
    },

    podiumScore:
    {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800"
    },

    meText:
    {
        color: "#51bdff"
    },

    podiumBlock:
    {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    meBlock:
    {
        backgroundColor: "rgba(81,189,255,0.2)"
    },

    rankText:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: 12,
        fontWeight: "700"
    },

    myRankRow:
    {
        backgroundColor: "rgba(81,189,255,0.1)",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        alignItems: "center"
    },

    myRankText:
    {
        color: "#51bdff",
        fontWeight: "700",
        fontSize: 14
    },

    list:
    {
        gap: 6
    },

    listRow:
    {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.04)"
    },

    meListRow:
    {
        backgroundColor: "rgba(81,189,255,0.1)"
    },

    listRank:
    {
        color: "rgba(255,255,255,0.4)",
        fontSize: 13,
        fontWeight: "700",
        width: 32
    },

    listName:
    {
        flex: 1,
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
        fontWeight: "600"
    },

    listScore:
    {
        color: "#fff",
        fontSize: 14,
        fontWeight: "800"
    },

    meListText:
    {
        color: "#51bdff"
    },
});