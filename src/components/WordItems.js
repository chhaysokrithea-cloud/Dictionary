import { Text, StyleSheet, Pressable } from 'react-native';
function WordItems({ model, onPress }){
    const item = model || {};

    return(
        <Pressable onPress={() => onPress?.(item)} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <Text style={styles.titles} numberOfLines={1}>{item.title ?? 'Untitled'}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:12,
        paddingHorizontal:14,
        borderWidth:1,
        borderColor:"rgba(0,0,0,0.08)",
        borderRadius:10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    pressed:{
        opacity: 0.7,
    },
    titles:{
        fontFamily:"Siemreap"
    }

})
export {WordItems}

