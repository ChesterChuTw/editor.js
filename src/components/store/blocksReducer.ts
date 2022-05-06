import { EditorState } from '../../../types/store/editorState';
import { Action } from '../../../types/store/action';
import * as _ from '../utils';
import { BlockMutationType } from '../../../types/events/block/mutation-type';

/**
 * The reducer function for Editor.js state
 * This function applies the passed action to the current state and returns the new state
 * This reducer is especially for working with blocks data
 *
 * @param state - previous state to apply action
 * @param action - information about the action in the previous state
 */
export default function blocksReducer(state: EditorState, action: Action): EditorState {
  const stateCopy = _.deepCopy(state);

  switch (action.type) {
    case BlockMutationType.Added:
    case BlockMutationType.Changed:
      stateCopy.blocks[action.data.id] = action.data;
      break;

    case BlockMutationType.Removed:
      delete stateCopy.blocks[action.blockId];
      break;
  }

  return stateCopy;
}
