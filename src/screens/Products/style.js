import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';  

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    headerText: {
        color: Colors.ui_dark_bg,
        fontSize: 18,
        fontFamily: Fonts.poppins500Medium,
        textTransform: 'capitalize',
    },
    paraText: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans400Regular,
        textAlign: 'justify'
    },
    bookletStyle: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    bookletContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10, 
    },
    bookletText: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        lineHeight: 17,
        color: '#141B34',
        paddingRight: 10,
        flex: 1,
        flexWrap: 'wrap'
    },
    bdrBtm:{
        borderColor:'#D4D4D4',
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    filterBox:{
        borderRadius:30,
        borderColor:'#000',
        borderWidth:1,
        borderStyle:'solid',
        paddingHorizontal:10,
        paddingVertical:3
    },
    sortBox:{
        borderRadius:10,
        borderColor:'#000',
        borderWidth:1,
        borderStyle:'solid',
        paddingHorizontal: 15,
        paddingVertical: 8,
        elevation:5,
        backgroundColor:Colors.color_white
    },
    sheenBox:{
        borderRadius:30,
        borderColor:'#000',
        borderWidth:1,
        borderStyle:'solid',
        paddingHorizontal:20,
        paddingVertical:6
    },
    filterParaTitle:{
        fontSize: 17,
        fontFamily: Fonts.poppins600SemiBold,
        marginBottom:5,
        paddingHorizontal:5
    },
    checkMark:{
        position:'absolute',
        top:-7,
        right:2,
        backgroundColor:'#ffffff',
        zIndex:1,
        borderRadius:30,
    },
    sheenText:{
        fontSize: 13,
        fontFamily: Fonts.poppins500Medium,
    },
    fourGrid:{
        display: 'flex',
        flexDirection:'row',
        gap:8,
        flexWrap:'wrap',
        justifyContent:'flex-start',
    },
    imageBox:{
        width: '23%',
        height: 65,
        borderRadius:10,
        borderColor:'#fff',
        borderWidth:1,
        borderStyle:'solid',
        elevation:3
    },
    boxImgStyle:{
        height:'100%',
        position:'relative',
    },
    clrCode:{
        fontSize:10,
        fontFamily: Fonts.OpenSans400Regular,
    },
    head: { 
        backgroundColor: '#D9D9D940', 
        paddingLeft: 9,
        width:'100%',
        paddingRight: 0
    },
    title: {
        color: Colors.color_black,
        fontSize: 12,
        paddingTop: 0,
        paddingRight: 10,
        width:'100%',
        fontFamily: Fonts.OpenSans700Bold,
    }, 
    colTitle: {
        color: Colors.color_dark_gray,
        justifyContent: 'center',
        fontSize: 11,
        width:'100%',
        paddingRight: 10,
        fontFamily: Fonts.OpenSans700Bold, 
    },
    colTitleSecond: {
        color: Colors.color_dark_gray,
        justifyContent: 'center',
        fontSize: 11,
        width:'100%',
        paddingRight: 10,
        fontFamily: Fonts.OpenSans500Medium, 
    },
    row: {    
        paddingLeft: 9, 
        paddingRight: 0,  
        borderColor:'#DDDDDD60',
        borderWidth:1,
    },
    TableHeader: {
        padding: 10,
        backgroundColor: Colors.ui_dark_bg,
        color: Colors.color_white,   
        fontFamily: Fonts.poppins600SemiBold,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    resetStyle:{
        position:'absolute',
        top:0,
        right:10,
    },
    flexRowDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '90%'
    },
    inputStylesProductDetails: {
        borderRadius: 100,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#BBBBBB',
    },
    searchIcon: {
        // position: 'absolute',
        // zIndex: 1,
        // top: 10,
        // left: 11,
        color: '#686868',
    },
    colorDesc: {
        color: Colors.color_black,
        fontFamily: Fonts.OpenSans500Medium,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'justify'
    },
    centerContent: {
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        width: '100%'
    },
});

export default styles;