import {Collection, Part, Set} from '../types/types';
import jsonSets from './setsMocked.json';
import jsonParts from './partsMocked.json';

export const fetchSets = (collection: Collection): Set[] => {
  const id = collection.idSets;

  return (jsonSets as any)[id].map((item: Set) => {
    const set: Set = {
      idCollection: item.idCollection,
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      isCompleted: item.isCompleted,
      quantityParts: item.quantityParts,
      quantityCollectorParts: item.quantityCollectorParts,
      idParts: item.idParts,
      idLego: item.id,
    };

    return set;
  });
};

/*export const fetchParts = (set: Set): Part[] => {
  const id: string = set.idParts as keyof Part;
  return (jsonParts as any)[id].map((item: Part) => {
    const part: Part = {
      id: item.id,
      name: item.name,
      idElement: item.idElement,
      idCategory: item.idCategory,
      index: item.index,
      color: item.color,
      imageUrl: item.imageUrl,
      quantityPart: item.quantityPart,
      quantityCollectorPart: item.quantityCollectorPart,
      idSet: set.id,
    };

    return part;
  });
};*/
