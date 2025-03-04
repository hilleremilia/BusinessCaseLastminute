import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Button, Card, Snackbar } from 'react-native-paper';
import { Hotel } from '../types/hotel.ts';

interface Props {
  gallery?: Hotel['gallery'];
}

export const Gallery = ({ gallery = [] }: Props) => {
  const [error, setError] = React.useState(false);

  const onDismissSnackBar = () => setError(false);

  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Snackbar visible={error} onDismiss={onDismissSnackBar}>
        Cannot open url.
      </Snackbar>
      <Card.Content style={styles.images}>
        {gallery?.map((url, index) => (
          <Button onPress={() => handlePress(url)} key={url} mode="text">
            Image {index + 1}
          </Button>
        ))}
      </Card.Content>
    </>
  );
};

const styles = StyleSheet.create({
  images: {
    alignItems: 'flex-start',
  },
});
