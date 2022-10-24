import {Collection, Collector} from '../../types/types';
import reducer, {initialState, setCurrentCollector} from '../collector';

test('should return the initial state', () => {
  const previousState = initialState;
  const expectedState = initialState;
  const action = {type: undefined};
  expect(reducer(previousState, action)).toEqual(expectedState);
});

test('should update current Collector with empty collection', () => {
  const previousState = initialState;
  const newCollection = undefined;
  const newCollector: Collector = {
    name: 'Toto',
    collection: newCollection,
  };
  const expectedState = {
    currentCollector: newCollector,
  };
  const action = setCurrentCollector(newCollector);
  expect(reducer(previousState, action)).toEqual(expectedState);
});

test('should update current Collector with not empty collection', () => {
  const previousState = initialState;
  const newCollection: Collection = {
    id: '12345',
    idSets: '',
  };
  const newCollector: Collector = {
    name: 'Boby',
    collection: newCollection,
  };
  const expectedState = {
    currentCollector: newCollector,
  };
  const action = setCurrentCollector(newCollector);
  expect(reducer(previousState, action)).toEqual(expectedState);
});
