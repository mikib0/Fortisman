import { View, Text, Image, Pressable, StyleSheet, Share } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { expand_more, share, bookmark, bookmark_fill } from '../assets';
import { Navigation, AppBar } from '../components';
import { quotesActions } from '../redux/quotes';

const Quote = ({ quote }) => {
  const { text, author } = quote;

  return (
    <View
      style={[
        styles.quoteContainer,
        // {
        //   transform: [{ translateY: '100%' }],
        // },
      ]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>— {author}</Text>
    </View>
  );
};

const shareQuote = ({ text, author }) => {
  Share.share({
    message: `${text} —${author}`,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Quotes = () => {
  const quotes = useSelector((state) => state.quotes);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  let [isBookmarked, setIsBookmarked] = useState(quotes[index].favorite);
  console.log(quotes[index]);

  // useEffect(() => {
  //   isBookmarked = quotes[index].favorite;
  // }, [index])

  // TODO: add swipe animation
  const showNext = () => {
    const nextIndex = (index + 1) % quotes.length;
    setIndex(() => {
      setIsBookmarked(() => {
        console.log(nextIndex, quotes[nextIndex].favorite);
        return quotes[nextIndex].favorite;
      });
      return nextIndex;
    });
  };

  const toggleFavorite = () => {
    setIsBookmarked(() => {
      dispatch(quotesActions.toggleFavorite(index));
      return !quotes[index].favorite;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar title='Qoutes' />
      <Quote quote={quotes[index]} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable onPress={() => shareQuote(quotes[index])}>
          <Image source={share} />
        </Pressable>
        <Pressable onPress={showNext}>
          <Image source={expand_more} />
        </Pressable>
        <Pressable onPress={toggleFavorite}>
          <Image source={isBookmarked ? bookmark_fill : bookmark} />
        </Pressable>
      </View>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Quotes;
