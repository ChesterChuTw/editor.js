import createStore from '../../../../src/components/store/createStore';
import { EditorState } from '../../../../types/store/editorState';
import { BlockMutationType } from '../../../../types/events/block/mutation-type';
import blocksReducer from '../../../../src/components/store/blocksReducer';

describe('State manager', () => {
  it('should create the store without initial state', () => {
    const emptyReducer = (state: EditorState): EditorState => state;

    const store = createStore(emptyReducer);

    expect(store.getState()).to.deep.equal({ blocks: {} });
  });

  it('should create the store with initial state', () => {
    const emptyReducer = (state: EditorState): EditorState => state;
    const initialState = {
      blocks: {
        '3JPEqh8_Wc': {
          id: '3JPEqh8_Wc',
          type: 'header',
          data: {
            text: 'Editor.js',
            level: 2,
          },
        },
      },
    };

    const store = createStore(emptyReducer, initialState);

    expect(store.getState()).to.deep.equal(initialState);
  });

  describe('blocksReducer', () => {
    it('should change the state', () => {
      const store = createStore(blocksReducer);
      const block = {
        id: '3JPEqh8_Wc',
        type: 'header',
        data: {
          text: 'Editor.js',
          level: 2,
        },
      };
      const expectedResult = {
        blocks: {
          '3JPEqh8_Wc': block,
        },
      };

      store.dispatch({
        type: BlockMutationType.Added,
        data: block,
      });

      expect(store.getState()).to.be.deep.equal(expectedResult);
    });
  });
});
