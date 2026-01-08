import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient'; 
import { Colors } from '../themes';

interface BannerItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  actionText?: string;
  onPress?: () => void;
}

interface ImageCarouselProps {
  data: BannerItem[];
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  onBannerPress?: (item: BannerItem) => void;
  style?: any;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  data,
  height = 200,
  autoPlay = true,
  autoPlayInterval = 3000,
  showPagination = true,
  showNavigation = true,
  onBannerPress,
  style,
}) => {
  const {width: screenWidth} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || data.length <= 1) return;

    const interval = setInterval(() => {
      if (!isScrolling.value) {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, data.length, isScrolling]);

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  // Handle scroll to index
  const handleScrollToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  // Handle banner press
  const handleBannerPress = useCallback(
    (item: BannerItem) => {
      if (onBannerPress) {
        onBannerPress(item);
      } else if (item.onPress) {
        item.onPress();
      }
    },
    [onBannerPress],
  );

  // Render banner item
  const renderBannerItem = ({item}: {item: BannerItem}) => {
    return (
      <TouchableOpacity
        style={[styles.bannerItem, {height, width: screenWidth}]}
        onPress={() => handleBannerPress(item)}
        activeOpacity={0.9}> 
        <Image source={{uri: item.image_url}} style={styles.bannerImage} />
        
      </TouchableOpacity>
    );
  };

  // Render pagination dots
  const renderPaginationDots = () => {
    if (!showPagination || data.length <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const input = scrollX.value / screenWidth;
            const distance = Math.abs(input - index);

            // More sophisticated scaling and opacity animations
            const scale = interpolate(
              distance,
              [0, 1, 2],
              [1.3, 1, 0.8],
              'clamp',
            );

            const opacity = interpolate(
              distance,
              [0, 1, 2],
              [1, 0.6, 0.3],
              'clamp',
            );

            // Dynamic width for active dot
            const width = interpolate(distance, [0, 1], [24, 8], 'clamp');

            return {
              transform: [{scale: withTiming(scale, {duration: 300})}],
              opacity: withTiming(opacity, {duration: 300}),
              width: withTiming(width, {duration: 300}),
            };
          });

          const isActive = index === currentIndex;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleScrollToIndex(index)}
              style={styles.paginationDotTouchable}
              activeOpacity={0.7}>
              <Animated.View
                style={[
                  styles.paginationDot,
                  isActive && styles.paginationDotActive,
                  animatedStyle,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Render navigation buttons
  const renderNavigationButtons = () => {
    if (!showNavigation || data.length <= 1) return null;

    return (
      <>
        <Pressable
          style={[styles.navButton, styles.navButtonLeft]}
          onPress={() => {
            const prevIndex =
              currentIndex > 0 ? currentIndex - 1 : data.length - 1;
            handleScrollToIndex(prevIndex);
          }}>
          <Text style={styles.navButtonText}>‹</Text>
        </Pressable>
        <Pressable
          style={[styles.navButton, styles.navButtonRight]}
          onPress={() => {
            const nextIndex = (currentIndex + 1) % data.length;
            handleScrollToIndex(nextIndex);
          }}>
          <Text style={styles.navButtonText}>›</Text>
        </Pressable>
      </>
    );
  };

  if (!data || data.length === 0) {
    return (
      <View style={[styles.emptyContainer, {height}, style]}>
        <Text style={styles.emptyText}>No banners available</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.bannerContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderBannerItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onMomentumScrollEnd={event => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / screenWidth,
            );
            setCurrentIndex(index);
          }}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
        />
        {renderNavigationButtons()}
      </View>
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  bannerContainer: {
    position: 'relative',
  },
  bannerItem: {
    position: 'relative',
  },
  bannerImage: {
    width: '92%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.color_white,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.color_white,
    marginBottom: 12,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  actionButton: {
    backgroundColor: Colors.ui_dark_bg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: Colors.color_white,
    fontSize: 12,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.ui_dark_bg,
    height: 8,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: Colors.ui_dark_bg,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  paginationDotTouchable: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -20}],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonLeft: {
    left: 10,
  },
  navButtonRight: {
    right: 10,
  },
  navButtonText: {
    color: Colors.color_white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.color_light_gray,
    borderRadius: 8,
  },
  emptyText: {
    color: Colors.color_dark_gray,
    fontSize: 16,
  },
});

export default ImageCarousel;
