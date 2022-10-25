import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Color} from '../types/types';
import {Chip, Badge} from '@react-native-material/core';
import {useReduxDispatch} from '../redux';
import {setCurrentColors} from '../redux/set';

export default function ColorsList({colors}: ColorsListProps) {
  const dispatch = useReduxDispatch();
  const [activeColors, setActiveColors] = useState<Color[]>([]);
  const getRGBColor = (color: Color): string => {
    if (color.name === 'White' || color.name === 'Trans-Clear') {
      return '#ccf2ff';
    }
    return '#' + color.codeRgb;
  };
  useEffect(() => {
    console.log('activeColors');
    console.log(activeColors);
    dispatch(setCurrentColors(activeColors));
  }, [dispatch, activeColors]);
  const colorHandler = (color: Color): void => {
    if (activeColors.find(activeColor => activeColor.id === color.id)) {
      setActiveColors(
        activeColors.filter(activeColor => activeColor.id !== color.id),
      );
    } else {
      setActiveColors([...activeColors, color]);
    }
  };
  return (
    <ScrollView horizontal>
      {colors.map(color => (
        <TouchableOpacity key={color.id}>
          <Chip
            label={color.name}
            color={getRGBColor(color)}
            key={color.id}
            onPress={() => colorHandler(color)}>
            <Badge color={getRGBColor(color)} />
          </Chip>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
type ColorsListProps = {
  colors: Color[];
};
