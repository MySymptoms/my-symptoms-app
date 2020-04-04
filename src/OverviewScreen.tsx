import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {HalfSpace, Space} from './components/Block';
import {fontName} from './lib/vars';
import {HorizontalStatusCalendar} from './HorizontalStatusCalendar';
import {Icon, Icons} from './lib/icons';
import {Colors} from './lib/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../App';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationHeader} from './NavigationHeader';
import {SummaryViewIcon} from './components/SummaryViewIcon';
import {formatDate} from './lib/util';
import {OverviewSymptomButton} from './components/OverviewSymptomButton';
import {RootState} from './reducers/rootReducer';
import {
  requestUpdateSymptomInReport,
  selectReport,
} from './reducers/reportsReducer';
import {useGeoLocation} from './hooks/useGeoLocation';
import {getColorForReportAndSymptom} from './lib/symptomToColor';
import {HeartBeatIcon} from './components/HeartBeatIcon';
import Dialog, {
  DialogButton,
  DialogContent,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {selectableButtonStyles} from './components/SelectableButton';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const OverviewScreen: FC<Props> = ({navigation}) => {
  const {getLatestLocation, requestPermission} = useGeoLocation();

  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const emoji = useSelector((state: RootState) => state.user.user_emoji);
  const report = useSelector(selectReport(currentDate));

  useEffect(() => {
    requestPermission().then(() => {
      getLatestLocation();
    });
  }, [requestPermission]);

  const {t} = useTranslation();

  return (
    <Background
      header={
        <NavigationHeader
          left={<SummaryViewIcon />}
          onPressLeft={() => navigation.navigate('Summary')}
          title={t('TRACK MY SYMPTOMS')}
          right={<UserEmojiContainer>{emoji}</UserEmojiContainer>}
          onPressRight={() => navigation.navigate('AdditionalData')}
        />
      }>
      <HorizontalStatusCalendar
        style={{marginBottom: 30}}
        onChange={setCurrentDate}
        value={currentDate}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'fever')}
            onPress={() =>
              navigation.navigate('Fever', {currentReportDate: currentDate})
            }
            text={t('Fever')}
            icon={Icons.FaceWithThermometer}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'dry_cough')}
            onPress={() =>
              navigation.navigate('DryCough', {currentReportDate: currentDate})
            }
            text={t('Dry Cough')}
            icon={Icons.Mask}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'tiredness')}
            onPress={() =>
              navigation.navigate('Tiredness', {currentReportDate: currentDate})
            }
            text={t('Tiredness')}
            icon={Icons.Bed}
          />
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'shortness_of_breath')}
            onPress={() =>
              navigation.navigate('ShortnessOfBreath', {
                currentReportDate: currentDate,
              })
            }
            text={t('Shortness of breath')}
            icon={Icons.Yawn}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'aches_and_pain')}
            onPress={() =>
              navigation.navigate('AchesAndPain', {
                currentReportDate: currentDate,
              })
            }
            text={t('Aches & Pains')}
            icon={Icons.Sweat}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'sore_throat')}
            onPress={() =>
              navigation.navigate('SoreThroat', {
                currentReportDate: currentDate,
              })
            }
            text={t('Sore Throat')}
            icon={Icons.Weary}
          />
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'diarrhoea')}
            onPress={() =>
              navigation.navigate('Diarrhoea', {currentReportDate: currentDate})
            }
            text={t('Diarrhoea')}
            icon={Icons.Toilet}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'nausea')}
            onPress={() =>
              navigation.navigate('Nausea', {currentReportDate: currentDate})
            }
            text={t('Nausea')}
            icon={Icons.Nauseated}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'runny_nose')}
            onPress={() =>
              navigation.navigate('RunnyNose', {currentReportDate: currentDate})
            }
            text={t('Runny Nose')}
            icon={Icons.Sneezing}
          />
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'sense_of_taste')}
            onPress={() =>
              navigation.navigate('SenseOfTaste', {
                currentReportDate: currentDate,
              })
            }
            text={t('Sense of taste')}
            icon={Icons.Food}
          />
          <Space />
          <OverviewSymptomButton
            color={getColorForReportAndSymptom(report, 'sense_of_smell')}
            onPress={() =>
              navigation.navigate('SenseOfSmell', {
                currentReportDate: currentDate,
              })
            }
            text={t('Sense of smell')}
            icon={Icons.Nose}
          />
          <Space />
          <View style={{width: 100, height: 100}} />
        </View>
        <Space />
        <NoSymptomsTodayButton currentDate={currentDate} />
      </View>
    </Background>
  );
};

interface NoSymptomsTodayButtonProps {
  currentDate: string;
}

const NoSymptomsTodayButton: FC<NoSymptomsTodayButtonProps> = ({
  currentDate,
}) => {
  const dipatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const report = useSelector(selectReport(currentDate));

  const noSymptoms = !!report?.symptoms.no_symptoms?.values.checked;

  const {t} = useTranslation()

  return (
    <>
      <Dialog
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        dialogStyle={styles.dialogStyle}
        dialogTitle={
          <Text style={styles.dialogTitleStyle}>Remove symptoms?</Text>
        }
        visible={dialogVisible}
        onTouchOutside={() => {
          setDialogVisible(false);
        }}>
        <DialogContent>
          <Text style={styles.dialogContent}>
            This will clear your reported symptoms for this day. Are you sure?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <DialogButton
              style={selectableButtonStyles.buttonContainer}
              textStyle={{color: 'white'}}
              text="CANCEL"
              onPress={() => {
                setDialogVisible(false);
              }}
            />
            <HalfSpace />
            <DialogButton
              style={selectableButtonStyles.buttonContainer}
              text="OK"
              textStyle={{color: 'white'}}
              onPress={() => {
                dipatch(
                  requestUpdateSymptomInReport({
                    date: currentDate,
                    now: new Date(),
                    symptomKey: 'no_symptoms',
                    symptom: {checked: true},
                  }),
                );
                setDialogVisible(false);
              }}
            />
          </View>
        </DialogContent>
      </Dialog>
      <TouchableOpacity
        onPress={() => {
          if (!noSymptoms) {
            setDialogVisible(true);
          } else {
            dipatch(
              requestUpdateSymptomInReport({
                date: currentDate,
                now: new Date(),
                symptomKey: 'no_symptoms',
                symptom: {checked: false},
              }),
            );
          }
        }}>
        <NoSymtoms selected={noSymptoms}>
          {noSymptoms && (
            <HeartBeatIcon
              stroke={Colors.stepOneColor}
              style={{position: 'absolute', top: 5, right: 14}}
            />
          )}
          <Icon source={Icons.Flex} />
          <Space />
          <Text style={styles.emojiButtonText}>{t("No symptoms today")}</Text>
        </NoSymtoms>
      </TouchableOpacity>
    </>
  );
};

interface NoSymptomsProps {
  selected: boolean;
}

const NoSymtoms = styled.View<NoSymptomsProps>`
  flex-direction: row;
  width: 245px;
  height: 62px;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  background-color: ${Colors.buttonBackground};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border: 3px
    ${props => (props.selected ? Colors.stepOneColor : 'rgba(0, 0, 0, 0.6)')};
  elevation: 100;
`;

const UserEmojiContainer = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const styles = StyleSheet.create({
  buttonEmoji: {
    fontSize: 30,
  },
  emojiButtonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: fontName,
  },
  linearGradient: {
    backgroundColor: '#2E2E2E',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  dialogStyle: {
    color: 'white',
    backgroundColor: Colors.buttonBackground,
    padding: 20,
    margin: 20,
  },
  dialogTitleStyle: {
    color: '#ffffff',
    fontFamily: fontName,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogContent: {
    color: '#ffffff',
  },
  dialogButton: {
    borderWidth: 3,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    elevation: 2,
  },
  dialogButtonText: {
    color: Colors.sectionHeader,
  },
  dialogFooter: {},
});
