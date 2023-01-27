import { useState } from 'react';
import { useTheme } from 'react-native-paper';

export default (Comp) => {
  return function ({ ...props }) {
    const theme = useTheme();
    const [elevated, setElevated] = useState(false);

    const handleScroll = (event) => {
      if (event.nativeEvent.contentOffset.y > 0) {
        setElevated(true);
      } else {
        setElevated(false);
      }
    };

    return <Comp elevated={elevated} onScroll={handleScroll} {...props} />;
  };
};
