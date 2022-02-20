import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: term,
        },
      });

      const repositories = data.objects.map((result: any) => {
        return {
          name: result.package.name,
          url: result.package.links.npm,
        };
      });

      console.log(repositories);

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: repositories,
      });
    } catch (error: unknown) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: (error as Error).message,
      });
    }
  };
};
