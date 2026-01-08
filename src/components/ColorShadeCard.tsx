import React, { memo, useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../themes";
import { I_BRANDS_LIST } from "../Interfaces/product.interface"; 
import ColorShadeLoader from "./ScreensComponent/loader/colorShadeLoader";

interface I_ShadeCard {
  loadedColorShadeList: I_BRANDS_LIST.ColorShade[];
  ReachEndFlag: any;
  onRefresh?: any;
  showLoader?: boolean;
  nestedScrollEnabled?: boolean;
}

const ColorShadeCard = ({
  loadedColorShadeList,
  ReachEndFlag,
  onRefresh,
  showLoader,
  nestedScrollEnabled,
}: I_ShadeCard) => {
  const [refreshing, setRefreshing] = useState(false);
  let ReachEnd: any = false;

  const getBrightness = (r: any, g: any, b: any) => {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const isColorDark = (r: any, g: any, b: any) => {
    if (r !== undefined && g !== undefined && b !== undefined) {
      const brightness = getBrightness(r, g, b);
      // If brightness is less than 128, the color is considered dark
      return brightness < 120;
    }

    // Default to false if color cannot be determined
    return false;
  };

  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1 /*display: 'flex', flexDirection: "column", height: '100%'*/,
      }}
      data={loadedColorShadeList}
      numColumns={3}
      renderItem={({ item, index }: any) => (
        <View
          style={{
            margin: 5,
            width: "30%",
          }}
        >
          {/* {index === 0 || item.shade_card_desc && (item.shade_card_desc ?? '') != '' && loadedColorShadeList[Number(index) - 1].shade_card_desc !== item.shade_card_desc ? (

                                                    <>
                                                        <Text style={{ color: Colors.color_black, fontSize: 10, fontFamily: Fonts.OpenSans600SemiBold, }}>{item.shade_card_desc}</Text>
                                                    </>
                                                ) : null} */}
          <Pressable
            style={{
              ...styles.brdrBox,
              borderRadius: 10,
              minHeight: 70,
              padding: 5,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: item.backgroundColor,
            }}
          >
            <View>
              <Text
                style={{
                  ...styles.clrCode,
                  color: isColorDark(
                    item.shade_color_r,
                    item.shade_color_g,
                    item.shade_color_b
                  )
                    ? "white"
                    : "black",
                }}
              >
                {item.shade_code}
              </Text>
              <Text
                style={{
                  ...styles.clrCode,
                  color: isColorDark(
                    item.shade_color_r,
                    item.shade_color_g,
                    item.shade_color_b
                  )
                    ? "white"
                    : "black",
                }}
              >
                {item.shade_name}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
      keyExtractor={(item) => item.key}
      onEndReached={() => {
        ReachEndFlag(!ReachEnd);
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        showLoader ? (
          <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 5 }}>
            {/* <DynamicShimmerPlaceholder
              borderRadius={5}
              height={100}
              width={"100%"}
              count={5}
            /> */}
            <ColorShadeLoader />
          </View>
        ) : null
      }
      refreshing={refreshing}
      onRefresh={() => {
        onRefresh();
      }}
      nestedScrollEnabled={nestedScrollEnabled} // Enable nested scrolling
    />
  );
};

export default memo(ColorShadeCard);

const styles = StyleSheet.create({
  flexBoxWrap: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageBox: {
    width: "31%",
    borderRadius: 10,
  },
  boxImgStyle: {
    height: "100%",
    position: "relative",
  },
  clrCode: {
    fontSize: 10,
    fontFamily: Fonts.OpenSans400Regular,
  },
  brdrBox: {
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    elevation: 4,
  },
});
