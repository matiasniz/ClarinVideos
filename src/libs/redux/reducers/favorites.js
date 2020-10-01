import {ADD_FAVORITE, REMOVE_FAVORITE} from './../types/favorites';

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      let items = [...state];

      if (!items.find((v) => action.payload.id === v.id)) {
        items.push(action.payload);
      }
      items.sort((a, b) => (b.publishedDate > a.publishedDate ? 1 : -1));

      return items;

    case REMOVE_FAVORITE:
      return state.filter((f) => f.id !== action.payload.id);

    default:
      return state;
  }
};
