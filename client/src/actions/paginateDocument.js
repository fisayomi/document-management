import axios from 'axios';
import actionTypes from '../actions/actionTypes';

export default function paginateDocumentAction(token, offset, limit) {
  return function (dispatch) {
    return axios.get(`/api/v1/documents?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.PAGINATED_DOCUMENTS,
          documents: response.data.documents,
          pageCount: response.data.pageCount
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.DOCUMENT_RETRIEVAL_FAILED,
          status: 'failed',
          error: err.message
        });
      });
  };
}
