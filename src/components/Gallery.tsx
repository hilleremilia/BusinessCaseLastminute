import { Hotel } from '../types/hotel.ts';
import { useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Theme } from '../config/theme.ts';
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { ImageErrorEventData, ImageLoadEventData } from 'react-native/Libraries/Image/Image';
import { ImagePlaceholder } from './ImagePlaceholder.tsx';

const width = Dimensions.get('window').width - 32;

interface Props {
  gallery?: Hotel['gallery'];
}

export const Gallery = ({ gallery = [] }: Props) => {
  const [heights, setHeights] = useState<{ [key: number]: number }>({});
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  const ref = React.useRef<ICarouselInstance>(null);
  const progressValue = useSharedValue(0);

  const handleProgressChange = (_offsetProgress: number, absoluteProgress: number) => {
    progressValue.value = absoluteProgress;
    setCurrentIndex(Math.round(absoluteProgress));
  };

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>, index: number) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    setHeights((prev) => ({
      ...prev,
      [index]: (width * imgHeight) / imgWidth,
    }));
  };

  const handleError = (_event: NativeSyntheticEvent<ImageErrorEventData>, index: number) => {
    setErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={errors[currentIndex] ? width : heights[currentIndex]}
        data={gallery}
        onProgressChange={handleProgressChange}
        renderItem={({ item, index }) =>
          errors[index] ? (
            <ImagePlaceholder size={width} />
          ) : (
            <Image
              source={{ uri: item }}
              style={[styles.image, { height: heights[index] }]}
              onLoad={(event) => handleLoad(event, index)}
              onError={(event) => handleError(event, index)}
            />
          )
        }
      />

      <View style={styles.paginationContainer}>
        {gallery.map((_, index) => {
          return (
            <Animated.View
              key={index}
              style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      width: width,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: theme.colors.background,
      width: 10,
      height: 10,
    },
    inactiveDot: {
      backgroundColor: theme.colors.primary,
    },
  });
