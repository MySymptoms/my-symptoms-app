import React, {useState, useEffect} from 'react';
import {BoxInput} from './BoxInput';
import {SegmentedControl} from './SegmentedControl';
import {Icons} from '../lib/icons';
import {TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectPreExistingAilment,
  setPreExistingAilments,
} from '../reducers/userReducer';
import _ from 'lodash';

export const PreExistingAilmentsInput = () => {
  const dispatch = useDispatch();
  const storedPreExistingAilments = useSelector(selectPreExistingAilment);

  const [hasCondition, setHasCondition] = useState(!!storedPreExistingAilments);
  const [conditions, setConditions] = useState(storedPreExistingAilments);

  useEffect(() => {
    const debounced = _.debounce(
      () => dispatch(setPreExistingAilments(conditions)),
      1000,
    );
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [conditions]);

  return (
    <BoxInput
      icon={Icons.Pill}
      text="Do you have any pre-existing medical conditions?"
      rightComponent={
        <SegmentedControl
          firstOption="YES"
          secondOption="NO"
          selectedIndex={hasCondition ? 0 : 1}
          onTabPress={index => {
            if (index === 1) {
              setConditions(null);
            }
            setHasCondition(index === 0);
          }}
        />
      }
      showExpandingBottomComponent={hasCondition}
      expandingBottomComponent={
        <TextInput
          style={styles.conditionsText}
          placeholder="List them here"
          placeholderTextColor="#C4C4C4"
          value={conditions || ''}
          onChangeText={setConditions}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  conditionsText: {
    color: 'white',
  },
});
