import { View, Image, Pressable, StyleSheet, Share } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TopAppbar } from '../components';
import { quotesActions } from '../redux/quotes';
import Quote from '../components/Quote';
import { IconButton, useTheme, Appbar } from 'react-native-paper';

const shareQuote = ({ text, author }) => {
  Share.share({
    message: `${text} —${author}`,
  })
    .then((result) => {
      //TODO: toast success message
    })
    .catch((error) => {
      //TODO: toast error message
    });
};

const Quotes = () => {
  const quotes = useSelector((state) => state.quotes);
  const [favoritesShown, setFavoritesShown] = useState(false);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  console.log(index, useSelector((state) => state.quotes)[index]);

  let quotesShown = favoritesShown
  ? quotes.filter(({ favorite }) => favorite)
  : quotes.concat();

  if (favoritesShown && quotesShown.length == 0) {
    setFavoritesShown(false)
    return
  }
  else if (favoritesShown && index == quotesShown.length) {
    setIndex(index % quotesShown.length);
    return
  }

  // TODO: add swipe animation
  const showNext = () => {
    const nextIndex = (index + 1) % quotesShown.length;
    setIndex(nextIndex);
  };

  const showPrev = () => {
    const nextIndex =
      (index - 1 < 0 ? quotesShown.length - 1 : index - 1) % quotesShown.length;
    setIndex(nextIndex);
  };

  const toggleFavorite = () => {
    dispatch(
      quotesActions.toggleFavorite(
        quotes.map(({ text }) => text).indexOf(quotesShown[index].text)
      )
    );
  };

  const toggleFavorites = () => {
    setIndex(0);
    setFavoritesShown(!favoritesShown);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TopAppbar
        title='Qoutes'
        right={
          <Appbar.Action
            icon={
              favoritesShown ? 'bookmark-multiple' : 'bookmark-multiple-outline'
            }
            onPress={toggleFavorites}
          />
        }
      />
      <Quote quote={quotesShown[index]} />

      <View
        style={{
          position: 'absolute',
          bottom: 56,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}>
        <IconButton
          icon='chevron-double-left'
          iconColor={theme.colors.onBackground}
          size={24}
          onPress={showPrev}
        />
        <IconButton
          icon='share-variant-outline'
          iconColor={theme.colors.onBackground}
          size={24}
          onPress={() => shareQuote(quotesShown[index])}
        />
        <IconButton
          icon={(()=>{
            console.log(
              quotes[index]
            );
            return quotesShown[index].favorite
              ? 'bookmark'
              : 'bookmark-outline';
          })()}
          iconColor={theme.colors.onBackground}
          size={24}
          onPress={toggleFavorite}
        />
        <IconButton
          icon='chevron-double-right'
          iconColor={theme.colors.onBackground}
          size={24}
          onPress={showNext}
        />
      </View>
    </View>
  );
};

export default Quotes;
