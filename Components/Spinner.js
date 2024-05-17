import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import myColors from '../utils/myColors';

const Buttons = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);

  return (
    <>

        <View style={styles.contentView}>
          <View style={styles.buttonsContainer}>
            <Button
              title="SIGN UP"
              loading={true}
              loadingProps={{
                size: 'large',
                color: myColors.blue,
              }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
                paddingVertical: 10,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
          </View>
        </View>
      
    </>
  );
};


const styles = StyleSheet.create({
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10
  }
});

export default withTheme(Buttons, '');
