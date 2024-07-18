import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
    headingTextWrapper: { flexDirection: 'column', gap: 5, paddingVertical: 10 },
    headingText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    subHeadingText: { fontSize: 16, color: 'white', textAlign: 'center' },
    buttonWrapper: { flexDirection: 'row', gap: 10 },
    button: { borderRadius: 20, overflow: 'hidden' },
    buttonImage: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center' },
    buttonBlackText: { fontSize: 16, color: 'black', fontWeight: 'bold' },
    buttonWhiteText: { fontSize: 16, color: '#f7f7f7', fontWeight: 'bold' },
})