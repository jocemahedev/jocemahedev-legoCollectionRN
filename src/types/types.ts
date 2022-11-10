import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type Collector = {
  name: string | null;
  email: string | null;
  collection: Collection | undefined;
};
export type Collection = {
  id: string;
  idSets: string;
};
export type CollectionWithSets = {
  collection: Collection;
  sets: Set[];
};
export type Set = {
  idCollection: string;
  id: string;
  name: string;
  imageUrl: string;
  isCompleted: boolean;
  quantityParts: number;
  quantityCollectorParts: number;
  idParts: string;
  idLego: string;
};

export type Parts = {
  id: string;
  parts: Part[];
};
export type Part = {
  id: string;
  name: string;
  idElement: string;
  idCategory: string;
  index: number;
  color: Color;
  imageUrl: string;
  quantityPart: number;
  quantityCollectorPart: number;
  idSet: string;
};
export type SetWithParts = {
  set: Set;
  parts: Part[];
};
export type Color = {
  id: number;
  isTransparent: boolean;
  name: string;
  codeRgb: string;
};
export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  CollectionScreen: undefined;
  SetScreen: undefined;
  PartsScreen: undefined;
};
export type CollectionListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PartsScreen'
>;
