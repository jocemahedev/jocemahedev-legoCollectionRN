import {Set} from '../../types/types';
import {fetchSets} from '../../services/FakeApi';
import reducer, {
  initialState,
  setCurrentCollection,
  addSetToCollection,
  deleteSetToCollection,
  selectCompletedSets,
  selectAllSets,
} from '../collection';
import {RootState} from '..';

const NO_CURRENT_COLLECTION_STATE = {collection: initialState};
const COLLECTION_ALL_SETS_COMPLETED_STATE = {
  collection: {
    currentCollection: {
      id: '3',
      idSets: 'azerty',
    },
    allSets: [
      {
        idCollection: '3',
        id: '31122-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Fish Tank',
        isCompleted: true,
        quantityParts: 99,
        quantityCollectorParts: 99,
        idParts: '4',
      },
      {
        idCollection: '3',
        id: '31123-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Crocodile',
        isCompleted: true,
        quantityParts: 199,
        quantityCollectorParts: 199,
        idParts: '5',
      },
    ],
  },
};
const COLLECTION_ALL_SETS_NOT_COMPLETED_STATE = {
  collection: {
    currentCollection: {
      id: '3',
      idSets: 'azerty',
    },
    allSets: [
      {
        idCollection: '3',
        id: '31122-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Fish Tank',
        isCompleted: false,
        quantityParts: 99,
        quantityCollectorParts: 80,
        idParts: '4',
      },
      {
        idCollection: '3',
        id: '31123-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Crocodile',
        isCompleted: false,
        quantityParts: 199,
        quantityCollectorParts: 0,
        idParts: '5',
      },
    ],
  },
};
const COLLECTION_HALF_SETS_COMPLETED_STATE = {
  collection: {
    currentCollection: {
      id: '3',
      idSets: 'azerty',
    },
    allSets: [
      {
        idCollection: '3',
        id: '31122-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Fish Tank',
        isCompleted: true,
        quantityParts: 99,
        quantityCollectorParts: 99,
        idParts: '4',
      },
      {
        idCollection: '3',
        id: '31123-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Crocodile',
        isCompleted: false,
        quantityParts: 199,
        quantityCollectorParts: 0,
        idParts: '5',
      },
    ],
  },
};
test('should return the initial state', () => {
  const previousState = NO_CURRENT_COLLECTION_STATE;
  const expectedState = NO_CURRENT_COLLECTION_STATE;
  const action = {type: undefined};
  expect(reducer(previousState.collection, action)).toEqual(
    expectedState.collection,
  );
});

test('should update current Collection with sets Collection', () => {
  const previousState = NO_CURRENT_COLLECTION_STATE;
  const newCollection = {
    id: '1',
    idSets: '12345',
  };
  const newSets = fetchSets(newCollection);

  const expectedState = {
    currentCollection: newCollection,
    allSets: newSets,
  };
  const action = setCurrentCollection(newCollection);
  expect(reducer(previousState.collection, action)).toEqual(expectedState);
});

test('Given Collection not empty When add set Then Collection has 1 more set', () => {
  const currentCollection = {
    id: '1',
    idSets: '12345',
  };
  const allSets = fetchSets(currentCollection);

  const previousState = {
    currentCollection: currentCollection,
    allSets: allSets,
  };

  const addedSet: Set = {
    idCollection: '1',
    id: '31120-1',
    imageUrl: 'https://cdn.rebrickable.com/media/sets/31120-1/87267.jpg',
    name: 'Medieval Castle',
    isCompleted: true,
    quantityParts: 399,
    quantityCollectorParts: 0,
    idParts: '789789',
  };

  const newSets: Set[] = [...allSets, addedSet];

  const expectedState = {
    currentCollection: currentCollection,
    allSets: newSets,
  };
  const notExpectedState = {
    currentCollection: currentCollection,
    allSets: allSets,
  };

  const action = addSetToCollection(addedSet);
  expect(reducer(previousState, action)).toEqual(expectedState);
  expect(reducer(previousState, action)).not.toEqual(notExpectedState);
});

test('Given Collection empty When delete set Then do nothing', () => {
  const currentCollection = {
    id: '1',
    idSets: '12345',
  };
  const previousState = {
    currentCollection: currentCollection,
    allSets: [],
  };

  const expectedState = {
    currentCollection: currentCollection,
    allSets: [],
  };
  const action = deleteSetToCollection('1');
  expect(reducer(previousState, action)).toEqual(expectedState);
});

test('Given Collection has one set When delete set Then Collection is empty', () => {
  const currentCollection = {
    id: '3',
    idSets: 'azerty',
  };
  const previousState = {
    currentCollection: currentCollection,
    allSets: [
      {
        idCollection: '3',
        id: '31122-1',
        imageUrl: 'https://cdn.rebrickable.com/media/sets/31122-1/86958.jpg',
        name: 'Fish Tank',
        isCompleted: true,
        quantityParts: 99,
        quantityCollectorParts: 99,
        idParts: '4',
      },
    ],
  };

  const expectedState = {
    currentCollection: currentCollection,
    allSets: [],
  };
  const action = deleteSetToCollection('4');
  expect(reducer(previousState, action)).toEqual(expectedState);
});
test('Given no currentCollection  When select all completed set Then completedSets is empty', () => {
  const previousState = NO_CURRENT_COLLECTION_STATE;

  const allCompletedSets = selectCompletedSets(<RootState>previousState);
  expect(allCompletedSets).toEqual([]);
});

test('Given currentCollection with 2 sets not completed  When select all completed set Then selectCompletedSets return []', () => {
  const previousState = COLLECTION_ALL_SETS_NOT_COMPLETED_STATE;
  const allCompletedSets = selectCompletedSets(<RootState>previousState);
  expect(allCompletedSets).toEqual([]);
});

test('Given currentCollection with 1 set completed and 1 set not completed  When select all completed set Then selectCompletedSets return completedSet', () => {
  const previousState = COLLECTION_HALF_SETS_COMPLETED_STATE;
  const allCompletedSets = selectCompletedSets(<RootState>previousState);
  const allSets = selectAllSets(<RootState>previousState);
  allCompletedSets.forEach(set => {
    expect(set.isCompleted).toBeTruthy();
  });
  expect(allCompletedSets).not.toEqual(allSets);
});
test('Given currentCollection with 2 sets completed  When select all completed sets And select all sets Then selectCompletedSets return same result that selectAllSets', () => {
  const previousState = COLLECTION_ALL_SETS_COMPLETED_STATE;
  const allCompletedSets = selectCompletedSets(<RootState>previousState);
  const allSets = selectAllSets(<RootState>previousState);
  expect(allCompletedSets).toEqual(allSets);
});
