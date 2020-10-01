import {
  FETCH_VIDEOS_START,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from './../types/videos';

const initState = {
  videos: [],
  listasPrincipales: [],
  offset: 0,
  moreItems: true,
  loading: false,
  error: null,
  category: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_VIDEOS_SUCCESS:
      let items = action.data.reset ? [] : [...state.videos];

      action.data.items.forEach((item) => {
        if (!items.find((v) => v.id.toString() === item.id.toString())) {
          items.push(item);
        }
      });
      items.sort((a, b) => (b.publishedDate > a.publishedDate ? 1 : -1));
      return {
        videos: items,
        listasPrincipales: action.data.listasPrincipales
          ? action.data.listasPrincipales
          : state.listasPrincipales,
        moreItems: action.data.moreItems,
        offset: action.data.reset ? 1 : state.offset + 1,
        category: action.data.category,
        loading: false,
        error: null,
      };

    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
