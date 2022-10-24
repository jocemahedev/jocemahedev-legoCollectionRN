import {RootState} from '..';
import {fetchParts} from '../../services/FakeApi';
import reducer, {
  initialState,
  setCurrentSet,
  checkCurrentSetIsCompleted,
  selectAllCompletedParts,
  selectPartsByColor,
  incrementCollectorPart,
  decrementCollectorPart,
} from '../set';

const SET_NOT_COMPLETED_COLLECTION_1 = {
  set: {
    idCollection: '1',
    id: '31120-1-0',
    imageUrl: 'https://cdn.rebrickable.com/media/sets/31120-1/87267.jpg',
    name: 'Medieval Castle',
    isCompleted: false,
    quantityParts: 399,
    quantityCollectorParts: 0,
    idParts: '6',
    idLego: '31120-1',
  },
};
const OTHER_SET_NOT_COMPLETED_COLLECTION_1 = {
  set: {
    idCollection: '1',
    id: '31120-1-1',
    imageUrl: 'https://cdn.rebrickable.com/media/sets/31120-1/87267.jpg',
    name: 'Medieval Castle',
    isCompleted: false,
    quantityParts: 399,
    quantityCollectorParts: 0,
    idParts: '7',
    idLego: '31120-1',
  },
};
const SET_ALMOST_COMPLETED = {
  set: {
    idCollection: '1',
    id: '31120-1',
    imageUrl: 'https://cdn.rebrickable.com/media/sets/31120-1/87267.jpg',
    name: 'Medieval Castle',
    isCompleted: false,
    quantityParts: 399,
    quantityCollectorParts: 398,
    idParts: 'almostCompleted',
    idLego: '31120-1',
  },
};
const SET_COMPLETED = {
  set: {
    idCollection: '1',
    id: '31120-1',
    imageUrl: 'https://cdn.rebrickable.com/media/sets/31120-1/87267.jpg',
    name: 'Medieval Castle',
    isCompleted: true,
    quantityParts: 399,
    quantityCollectorParts: 399,
    idParts: 'completed',
    idLego: '31120-1',
  },
};
const BLACK_COLOR = {
  id: 0,
  isTransparent: false,
  name: 'Black',
  codeRgb: '05131D',
};
const WHITE_COLOR = {
  id: 15,
  isTransparent: false,
  name: 'White',
  codeRgb: 'FFFFFF',
};
test('should return the initial state', () => {
  const previousState = {set: initialState};
  const expectedState = {set: initialState};
  const action = {type: undefined};
  expect(reducer(previousState.set, action)).toEqual(expectedState.set);
});

test('Given has not current set When update current Set Then currentSet is assigned', () => {
  const previousState = {set: initialState};
  const set = SET_NOT_COMPLETED_COLLECTION_1.set;
  const newParts = fetchParts(set);

  const expectedState = {
    set: {
      currentSet: set,
      allParts: newParts,
    },
  };
  const action = setCurrentSet(set);
  expect(reducer(previousState.set, action)).toEqual(expectedState.set);
});
test('Given has current set When update current Set Then new set is assigned', () => {
  const set = SET_NOT_COMPLETED_COLLECTION_1.set;
  const otherSet = OTHER_SET_NOT_COMPLETED_COLLECTION_1.set;
  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };

  const expectedParts = fetchParts(otherSet);
  const expectedState = {
    currentSet: otherSet,
    allParts: expectedParts,
  };
  const action = setCurrentSet(otherSet);
  expect(reducer(previousState, action)).toEqual(expectedState);
  expect(reducer(previousState, action)).not.toEqual(previousState);
});

test('Given empty currentSet When check if completed Then nothing change', () => {
  const previousState = initialState;

  const action = checkCurrentSetIsCompleted();

  expect(reducer(previousState, action)).toEqual(previousState);
});

test('Given almost complete currentSet  When check if completed Then currentSet is not completed', () => {
  const set = SET_ALMOST_COMPLETED.set;
  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };
  const action = checkCurrentSetIsCompleted();

  expect(reducer(previousState, action).currentSet?.isCompleted).toBeFalsy();
});
test('Given complete currentSet  When check if completed Then currentSet is completed', () => {
  const set = SET_COMPLETED.set;
  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };
  const action = checkCurrentSetIsCompleted();

  expect(reducer(previousState, action).currentSet?.isCompleted).toBeTruthy();
});
test('Given complete currentSet  When check if completed Then allCompletedParts parts are completed', () => {
  const set = SET_COMPLETED.set;
  const previousParts = fetchParts(set);
  const previousState = {
    set: {
      currentSet: set,
      allParts: previousParts,
    },
  };
  const allCompletedParts = selectAllCompletedParts(<RootState>previousState);
  allCompletedParts.forEach(part => {
    expect(part.quantityCollectorPart >= part.quantityPart).toBeTruthy();
  });
});

test('Given no currentSet  When check if completed Then allCompletedParts is []', () => {
  const previousState = {set: initialState};
  const allCompletedParts = selectAllCompletedParts(previousState);
  expect(allCompletedParts).toEqual([]);
});
test('Given no currentSet  When select by Black color Then allBlackParts is []', () => {
  const previousState = {set: initialState};
  const allBlackParts = selectPartsByColor(previousState, [BLACK_COLOR]);
  expect(allBlackParts).toEqual([]);
});
test('Given currentSet  When select by color Black Then all parts are Black', () => {
  const set = SET_NOT_COMPLETED_COLLECTION_1.set;
  const previousParts = fetchParts(set);
  const previousState = {
    set: {
      currentSet: set,
      allParts: previousParts,
    },
  };

  const allBlackParts = selectPartsByColor(<RootState>previousState, [
    BLACK_COLOR,
  ]);

  allBlackParts.forEach(part => {
    expect(part.color.name === 'Black').toBeTruthy();
  });
});
test("Given currentSet  When select by color Black and White Then all parts are Black or White et aucune part n'est Bleu", () => {
  const set = SET_NOT_COMPLETED_COLLECTION_1.set;
  const previousParts = fetchParts(set);
  const previousState = {
    set: {
      currentSet: set,
      allParts: previousParts,
    },
  };

  const allBlackOrWhiteParts = selectPartsByColor(<RootState>previousState, [
    BLACK_COLOR,
    WHITE_COLOR,
  ]);

  allBlackOrWhiteParts.forEach(part => {
    expect(
      part.color.name === 'Black' || part.color.name === 'White',
    ).toBeTruthy();
  });
  allBlackOrWhiteParts.forEach(part => {
    expect(part.color.name === 'Blue').toBeFalsy();
  });
});
test('Given complete currentSet  When increment part Then nothing change for currentSet', () => {
  const set = SET_COMPLETED.set;
  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };
  const action = incrementCollectorPart({part: previousParts[0], set: set});
  expect(reducer(previousState, action).allParts[0].quantityPart).toEqual(
    previousState.allParts[0].quantityCollectorPart,
  );
});
test('Given almost complete currentSet  When increment part Then  currentPart is complete And Then decrement the current part is not complete', () => {
  const set = SET_ALMOST_COMPLETED.set;

  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };
  const action = checkCurrentSetIsCompleted();
  expect(reducer(previousState, action).currentSet?.isCompleted).toBeFalsy();
  const actionInc = incrementCollectorPart({
    part: previousState.allParts[0],
    set: set,
  });
  const actionDec = decrementCollectorPart({
    part: previousState.allParts[0],
    set: set,
  });
  const incrementState = reducer(previousState, actionInc);
  expect(incrementState.currentSet?.isCompleted).toBeTruthy();
  expect(
    reducer(incrementState, actionInc).currentSet?.isCompleted,
  ).toBeTruthy();
  expect(
    reducer(incrementState, actionInc).currentSet?.isCompleted,
  ).toBeTruthy();
  const decrementState = reducer(incrementState, actionDec);
  expect(decrementState.currentSet?.isCompleted).toBeFalsy();
});

test('Given complete currentPart  When increment part Then  currentPart is complete and quantityCollectorPart never > quantityPart', () => {
  const set = SET_COMPLETED.set;

  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };
  const actionInc = incrementCollectorPart({
    part: previousState.allParts[0],
    set: set,
  });
  const incrementState = reducer(previousState, actionInc);
  expect(incrementState.currentSet?.isCompleted).toBeTruthy();
  expect(
    reducer(incrementState, actionInc).currentSet?.isCompleted,
  ).toBeTruthy();
  const otherIncrementState = reducer(incrementState, actionInc);
  expect(otherIncrementState.currentSet?.isCompleted).toBeTruthy();
  expect(otherIncrementState.allParts[0].quantityCollectorPart).toEqual(
    previousState.allParts[0].quantityPart,
  );
});

test('Given almost currentPart  When decrement part many time Then  currentPart is not complete and quantityCollectorPart never < 0', () => {
  const set = SET_ALMOST_COMPLETED.set;

  const previousParts = fetchParts(set);
  const previousState = {
    currentSet: set,
    allParts: previousParts,
  };
  expect(previousState.allParts[0]?.quantityCollectorPart).toEqual(1);
  const actionDec = decrementCollectorPart({
    part: previousState.allParts[0],
    set: set,
  });
  const decrementState = reducer(previousState, actionDec);
  expect(decrementState.currentSet?.isCompleted).toBeFalsy();
  expect(decrementState.currentSet?.isCompleted).toBeFalsy();
  expect(previousState.allParts[0].quantityCollectorPart).toEqual(1);
  const otherDecrementState = reducer(decrementState, actionDec);
  expect(otherDecrementState.currentSet?.isCompleted).toBeFalsy();
  expect(otherDecrementState.allParts[0].quantityCollectorPart).toEqual(0);
});
