import { useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetIcon } from '../assets';
import { SvgXml } from 'react-native-svg';

import {
  FAB,
  TopAppbar,
  ProgressCount,
  DTPicker,
  DetoxesList,
  FortisDialog,
} from '../components';
import {
  setSelectedDetox,
  createDetox,
  newRelapse,
  deleteDetox,
  setCurrentStreakStartDate,
} from '../redux/actions';
import { formattedDate } from '../utils';

const Home = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [detoxes, selectedDetox, currentStreakStartDate] = useSelector(
    (state) => {
      const currentStreakStartDate =
        state.selectedDetox === null
          ? formattedDate() // set startdate as now if it is first time user
          : state.detoxes[state.selectedDetox].currentStreakStartDate;

      return [
        Object.keys(state.detoxes),
        state.selectedDetox,
        currentStreakStartDate,
      ];
    }
  );

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showDetoxPrompt, setShowDetoxPrompt] = useState(false);

  const detoxesListEmpty = selectedDetox == null

  const handleResetStreak = () => {
    navigate('Reason', {
      relapse: {
        startDate: currentStreakStartDate,
        endDate: formattedDate(),
        title: '',
        text: '',
      },
      onSave: (relapse) => {
        dispatch(
          newRelapse({ detox: selectedDetox, relapse, resetStreak: true })
        );
      },
    });
  };

  const changeSelectedDetox = (name) => {
    dispatch(setSelectedDetox(name));
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TopAppbar title='Fortisman' isHome={true} />
      <View
        style={{
          marginVertical: 16,
          marginLeft: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <ProgressCount
          startDate={currentStreakStartDate}
          onClick={() => setShowDateTimePicker(true)}
        />
        <Pressable onPress={handleResetStreak}>
          <SvgXml
            width={50}
            height={50}
            xml={resetIcon(theme.colors.tertiary)}
          />
        </Pressable>
      </View>
      <DetoxesList
        changeSelectedDetox={changeSelectedDetox}
        selectedDetox={selectedDetox}
        onDelete={(detox) => {
          let nsd;
          if (detoxes.length > 1)
            nsd = detoxes.concat().filter((item) => item != detox)[0];
          else nsd = null;
          dispatch(setSelectedDetox(nsd));
          dispatch(deleteDetox(detox));
        }}
      />
      {showDateTimePicker ? (
        <DTPicker
          date={currentStreakStartDate}
          onCancel={() => setShowDateTimePicker(false)}
          onChange={(date) => {
            setShowDateTimePicker(false);
            dispatch(setCurrentStreakStartDate({ detox: selectedDetox, date }));
          }}
        />
      ) : null}
      {showDetoxPrompt || detoxesListEmpty ? (
        <FortisDialog
          type='prompt'
          title={
            {
              true: 'Create Your First Detox',
              false: 'What would you like to quit?',
            }[detoxesListEmpty]
          }
          message={
            {
              true: 'Enter the first thing you want to detox from to continue...',
              false: undefined,
            }[detoxesListEmpty]
          }
          cancelable={{ true: false, false: true }[detoxesListEmpty]}
          onCancel={
            { true: undefined, false: () => setShowDetoxPrompt(false) }[
              detoxesListEmpty
            ]
          }
          onOk={(detox) => {
            if (detox.length == 0) return;
            showDetoxPrompt && setShowDetoxPrompt(false);
            dispatch(createDetox(detox));
            dispatch(setSelectedDetox(detox));
          }}
        />
      ) : null}

      <FAB icon='plus' onPress={() => setShowDetoxPrompt(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
});

export default Home;
