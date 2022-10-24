import {
  PayloadAction,
  createSlice,
  createSelector,
  createAsyncThunk,
  current,
} from '@reduxjs/toolkit';
import {Set, Part, Color, SetWithParts} from '../../types/types';
import {db} from './../services/firebase/firebaseConfig';
import {
  ref,
  set,
  update,
  get,
  query,
  DatabaseReference,
} from 'firebase/database';
import {RootState} from '..';
import {RebrickablePart} from '../services/rebrickable/type';
import {rebrickableApi} from '../services/rebrickable/rebrickable';
import {selectCurrentSet, updateQuantitySet} from '../collection';
export type SetState = {
  currentSet?: Set;
  allParts: Part[];
  statusParts: 'loading' | 'fulfilled';
};
export const initialState: SetState = {
  currentSet: undefined,
  allParts: [],
  statusParts: 'loading',
};

export const addParts = createAsyncThunk<void, RebrickablePart[]>(
  'set/addParts',
  async (rebrickableParts: RebrickablePart[], {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const currentSet = selectCurrentSet(rootState);
    const parts = ref(db, '/parts/' + currentSet?.idParts);
    const newParts: Part[] = rebrickableParts
      .filter(part => part.is_spare === false)
      .map((part, index) => {
        return {
          id: part.id,
          name: part.part.name,
          idElement: part.element_id,
          idCategory: part.part.part_cat_id,
          index: index,
          color: part.color,
          imageUrl: part.part.part_img_url,
          quantityPart: part.quantity,
          quantityCollectorPart: 0,
          idSet: part.set_num,
        };
      });
    set(parts, newParts);
    dispatch(setAllParts(newParts));
  },
);
export const fetchParts = createAsyncThunk<void, void>(
  'set/fetchParts',
  async (_, {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const currentSet = selectCurrentSet(rootState);
    console.log('currentSet');
    console.log(currentSet);
    if (currentSet) {
      const dbRef = ref(db, '/parts/' + currentSet?.idParts);
      const dataSnapshot = await get(query(dbRef));
      const values: Part[] = dataSnapshot.val();
      let datas: Part[] = [];
      for (const data in values) {
        datas.push(values[data]);
      }
      if (datas.length <= 0) {
        console.log('on fetch nvelle parts');
        dispatch(
          rebrickableApi.endpoints.getPartsByIdLego.initiate(
            currentSet?.idLego,
          ),
        );
      } else {
        console.log('on fetch parts firebase');
        dispatch(setAllParts(datas));
      }
    }
  },
);
export const incrementPart = createAsyncThunk<boolean, Part>(
  'set/incrementPart',
  async (part, {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const currentSet = selectCurrentSet(rootState);
    const indexPart = part.index;
    if (part.quantityCollectorPart < part.quantityPart) {
      const newQuantity = part.quantityCollectorPart + 1;
      if (currentSet) {
        const dbRef = ref(
          db,
          '/parts/' + currentSet?.idParts + '/' + indexPart,
        );
        await updatePart(dbRef, newQuantity);
        updateQuantitySet(currentSet.quantityCollectorParts + 1);
        return true;
      }
    }
    return false;
  },
);
export const decrementPart = createAsyncThunk<void, Part>(
  'set/decrementPart',
  async (part, {getState, dispatch}) => {
    const rootState = getState() as RootState;
    const currentSet = selectCurrentSet(rootState);
    const indexPart = part.index;
    if (part.quantityCollectorPart > 0) {
      const newQuantity = part.quantityCollectorPart - 1;
      if (currentSet) {
        const dbRef = ref(
          db,
          '/parts/' + currentSet?.idParts + '/' + indexPart,
        );
        await updatePart(dbRef, newQuantity);
        updateQuantitySet(currentSet.quantityCollectorParts - 1);
      }
    }
  },
);
export const updatePart = async (
  dbRef: DatabaseReference,
  quantity: number,
) => {
  await update(dbRef, {quantityCollectorPart: quantity});
};

const SetSlice = createSlice({
  name: 'Set',
  initialState: initialState,
  reducers: {
    setAllParts(state, action: PayloadAction<Part[]>) {
      state.allParts = action.payload;
    },
    checkCurrentSetIsCompleted(state) {
      if (state.currentSet) {
        state.currentSet.isCompleted = isCompleted(state.allParts);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchParts.pending, (_state, _action) => {
        console.log('fetch parts pending');
      })
      .addCase(fetchParts.fulfilled, (_state, _action) => {
        console.log('fetch parts fulfilled');
      })
      .addCase(incrementPart.fulfilled, (state, action) => {
        console.log('on pass dans increment');
        if (action.payload) {
          // incrementCollectorParts();
        }

        console.log('on pass dans increment fin');
      })
      .addCase(decrementPart.fulfilled, (state, action) => {
        console.log('on pass dans decrement');
      })
      .addCase(fetchParts.rejected, (state, action) => {});
  },
});
export type PayloadActionCollectorPart = {
  set: Set | undefined;
  part: Part;
};
const isCompleted = (parts: Part[]) => {
  const incompletedParts = parts.filter(
    item => item.quantityCollectorPart < item.quantityPart,
  );

  return incompletedParts.length === 0;
};

export const selectSet = (state: RootState): SetState => state.set;
export const selectStatus = (state: RootState): string => state.set.statusParts;
export const selectAllParts = createSelector(
  selectSet,
  setState => setState.allParts,
);

export const selectAllCompletedParts = createSelector(
  [selectSet, selectAllParts],
  (_state, parts) =>
    parts.filter(part => part.quantityCollectorPart === part.quantityPart),
);
export const selectPartsByColor = createSelector(
  [selectSet, selectAllParts, (_state, colors: Color[]) => colors],
  (_state, parts, colors) => {
    return parts.filter(part =>
      colors.find((c: Color) => c.id === part.color.id),
    );
  },
);

export const {setAllParts, checkCurrentSetIsCompleted} = SetSlice.actions;

export default SetSlice.reducer;
