import {
  PayloadAction,
  createSlice,
  createSelector,
  createAsyncThunk,
  nanoid,
} from '@reduxjs/toolkit';
import {Set, Collection} from '../../types/types';
import {db} from './../services/firebase/firebaseConfig';
import {
  ref,
  set,
  remove,
  get,
  query,
  push,
  DatabaseReference,
  update,
} from 'firebase/database';
import {RootState} from '..';
import {RebrickableSet} from '../services/rebrickable/type';

export type CollectionState = {
  currentCollection: Collection | undefined;
  allSets: Set[];
  currentSetIndex: number | undefined;
  addSetStatus: 'none' | 'pending' | 'fulfilled' | 'rejected';
};
export const initialState: CollectionState = {
  currentCollection: {
    id: '1',
    idSets: '12345',
  },
  allSets: [],
  currentSetIndex: undefined,
  addSetStatus: 'none',
};

export const fetchSets = createAsyncThunk<void, void>(
  'collection/fetchSets',
  async (_, {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const idSets = rootState.collection.currentCollection?.idSets;
    const dbRef = ref(db, '/collections/' + idSets);
    const dataSnapshot = await get(query(dbRef));
    const values: Set[] = dataSnapshot.val();
    let datas: Set[] = [];
    for (const data in values) {
      datas.push(values[data]);
    }
    dispatch(setCurrentSets(datas));
  },
);
export const updateQuantitySet = createAsyncThunk<void, number>(
  'collection/updateQuantitySet',
  async (quantity, {getState}) => {
    const rootState = getState() as RootState;
    const idSets = rootState.collection.currentCollection?.idSets;
    const currentSet = selectCurrentSet(rootState);
    const idSet = currentSet?.id;
    const dbRef = ref(db, '/collections/' + idSets + '/' + idSet);
    await updateSet(dbRef, quantity);
  },
);
const updateSet = async (dbRef: DatabaseReference, quantity: number) => {
  await update(dbRef, {quantityCollectorParts: quantity});
};
const collectionSlice = createSlice({
  name: 'collection',
  initialState: initialState,
  reducers: {
    setCurrentCollection(state, action: PayloadAction<Collection>) {
      state.currentCollection = action.payload;
    },
    setCurrentSets(state, action: PayloadAction<Set[]>) {
      state.allSets = action.payload;
      state.addSetStatus = 'none';
    },
    setAddSetStatus(
      state,
      action: PayloadAction<'none' | 'pending' | 'fulfilled' | 'rejected'>,
    ) {
      state.addSetStatus = action.payload;
    },
    setCurrentIndexSet(state, action: PayloadAction<Set>) {
      const payloadSet = action.payload;
      console.log('on passe dans current Index avec ');
      console.log(set);
      state.currentSetIndex = state.allSets.findIndex(
        item => item.id === payloadSet.id,
      );
      console.log(state.currentSetIndex);
    },
    updateQuantityCurrentSet: (state, action: PayloadAction<number>) => {
      const currentIndex = state.currentSetIndex;
      if (currentIndex !== undefined) {
        state.allSets[currentIndex].quantityCollectorParts = action.payload;
      }
    },
    addSetToCollection(state, action: PayloadAction<Set>) {
      state.allSets = [...state.allSets, action.payload];
    },
    deleteSetToCollection(state, action: PayloadAction<string>) {
      state.allSets = state.allSets.filter(item => {
        return item.id !== action.payload;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addSet.pending, (state, _action) => {
        state.addSetStatus = 'pending';
      })
      .addCase(addSet.rejected, (state, _action) => {
        state.addSetStatus = 'rejected';
      })
      .addCase(addSet.fulfilled, (state, _action) => {
        state.addSetStatus = 'fulfilled';
      });
  },
});
export const deleteSet = createAsyncThunk<void, string>(
  'collection/deleteSet',
  async (idSet, {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const currentCollection = rootState.collection.currentCollection;
    if (currentCollection) {
      const idSets = currentCollection.idSets;
      const dbRef = ref(db, '/collections/' + idSets + '/' + idSet);
      await remove(dbRef);
      dispatch(deleteSetToCollection(idSet));
    }
  },
);
export const deleteParts = createAsyncThunk<void, string>(
  'collection/deleteParts',
  async idParts => {
    const dbRef = ref(db, '/parts/' + idParts);
    await remove(dbRef);
  },
);
export const addSet = createAsyncThunk<void, RebrickableSet>(
  'collection/addSet',
  async (rebrickableSet: RebrickableSet, {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const idCollection = rootState.collection.currentCollection?.id;
    const idSets = rootState.collection.currentCollection?.idSets;
    const collections = ref(db, '/collections/' + idSets);
    const newCollectionsRef = push(collections);
    const newSet: Set = {
      idCollection: <string>idCollection,
      id: <string>newCollectionsRef.key,
      name: rebrickableSet.name,
      imageUrl: rebrickableSet.set_img_url,
      isCompleted: false,
      quantityParts: rebrickableSet.num_parts,
      quantityCollectorParts: 0,
      idParts: nanoid(),
      idLego: rebrickableSet.set_num,
    };
    set(newCollectionsRef, newSet);
    dispatch(addSetToCollection(newSet));
  },
);

export const selectCollection = (state: RootState): CollectionState =>
  state.collection;

export const selectCurrentCollection = (
  state: RootState,
): Collection | undefined => state.collection.currentCollection;
export const selectCurrentSetIndex = (state: RootState): number | undefined =>
  state.collection.currentSetIndex;
export const selectAllSets = createSelector(
  selectCollection,
  collectionState => collectionState.allSets,
);

export const selectCompletedSets = createSelector([selectAllSets], sets =>
  sets.filter(set => set.isCompleted),
);

export const selectSetById = (state: RootState, set: Set) =>
  state.collection.allSets.find(item => set.id === item.id);

export const countSets = (state: RootState): number =>
  state.collection.allSets.length;

export const selectAddSetStatus = (
  state: RootState,
): 'none' | 'pending' | 'fulfilled' | 'rejected' =>
  state.collection.addSetStatus;

export const selectCurrentSet = (state: RootState): Set | undefined => {
  const index = state.collection.currentSetIndex;
  if (index !== undefined) {
    return state.collection.allSets[index];
  }
  return undefined;
};

export const {
  setCurrentCollection,
  setCurrentSets,
  setCurrentIndexSet,
  updateQuantityCurrentSet,
  addSetToCollection,
  deleteSetToCollection,
  setAddSetStatus,
} = collectionSlice.actions;

export default collectionSlice.reducer;
