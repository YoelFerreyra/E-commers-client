import axios from "axios";
import swal from "sweetalert";

export const local_url = process.env.REACT_APP_URL_LOCAL

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_SHOE_DETAIL = "GET_SHOE_DETAIL";
export const SEARCH_SNEAKES = "SEARCH_SNEAKES";
export const FILTER_PRICE = "FILTER_PRICE";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const GET_REVIEWS_PRODUCT = "GET_REVIEWS_PRODUCT";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const CREATE_WISHLIST_PRODUCT = "CREATE_WISHLIST_PRODUCT";
export const GET_WISHLIST_PRODUCT = "GET_WISHLIST_PRODUCT";
export const GET_WISHLIST_PRODUCT_ID = "GET_WISHLIST_PRODUCT_ID";
export const REMOVE_PRODUCT_WISHLIST = "REMOVE_PRODUCT_WISHLIST";
export const ALL_FILTERS = "ALL_FILTERS";
export const GET_STOCK = "GET_STOCK";
export const GET_PROMOTION = "GET_PROMOTION";
export const MODIFY_PRODUCT = "GET_PROMOTION";
export const ALL_CATEGORY_ADMIN = "ALL_CATEGORY_ADMIN";
export const MODIFY_CATEGORY = "MODIFY_CATEGORY";
export const ALL_WISHLIST = "ALL_WISHLIST";
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const GET_PRODUCTOS_DESTACADOS = "GET_PRODUCTOS_DESTACADOS";
export const GET_PICTURES = "GET_PICTURES";
export const ORDER_STATUS = "ORDER_STATUS"
export const GET_ORDER = "GET_ORDER"
export const FILTER_ORDER = "FILTER_ORDER"
export const ADD_CATEGORY = "ADD_CATEGORY"
export const EDIT_CATEGORY = "EDIT_CATEGORY"
export const SEARCH_USER = "SEARCH_USER"
export const DELETE_CATEGORY = "DELETE_CATEGORY"
export const DELETE_ORDER = "DELETE_ORDER"
export const UPDATE_ORDER = "UPDATE_ORDER"
export const RELOAD_USER = "RELOAD_USER"
// export const CLEAR_STATE = "CLEAR_STATE"


export function getProducts() {
  return function (dispatch) {
    axios(`${local_url}/shoes`).then((json) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: json.data,
      })
    );
  };
}

export function getShoeDetail(id) {
  return async function (dispatch) {
    const { data } = await axios(`${local_url}/shoes/${id}`);
    dispatch({ type: GET_SHOE_DETAIL, payload: data });
  };
}

export const searchSneakes = (shoe) => {
  return (dispatch) => {
    axios.get(`${local_url}/shoes?name=${shoe}`).then(
      (res) => dispatch({ type: SEARCH_SNEAKES, payload: res.data }),
      (error) => swal("No hay resultados")
    );
  };
};

export const create_new_review = (payload) => {
  return (dispatch) => {
    axios.post(`${local_url}/reviews`, payload).then(
      (res) => dispatch({ type: CREATE_REVIEW, payload: res.data }),
      (error) => swal("Reseña no creada")
    );
  };
};

export const get_reviews = (id) => {
  return (dispatch) => {
    axios(`${local_url}/reviews/${id}`).then(
      (json) => dispatch({ type: GET_REVIEWS_PRODUCT, payload: json.data }),
      (error) => swal(error)
    );
  };
};

export const filterByPrice = (payload) => {
  return {
    type: FILTER_PRICE,
    payload,
  };
};

export function getCategories() {
  return function (dispatch) {
    axios(`${local_url}/categories`).then((json) =>
      dispatch({
        type: GET_CATEGORIES,
        payload: json.data,
      })
    );
  };
}

export function filterByCategory(id) {
  return async function (dispatch) {
    const { data } = await axios(`${local_url}/categories/${id}`);
    dispatch({ type: FILTER_CATEGORY, payload: data });
  };
}

export const createProduct = (payload) => {
  return async () => {
    const json = await axios.post(`${local_url}/shoes`, payload);
    return json;
  };
};

export const get_wishlist_product = (payload) => {
  return async (dispatch) => {
    const json = await axios(`${local_url}/wishlist/${payload}`);
    dispatch({ type: GET_WISHLIST_PRODUCT, payload: json.data });
  };
};
export const filter_get_wishlist_product = (payload) => {
  return (dispatch) => {
    axios.get(`${local_url}/wishlist/${payload.id}`).then(
      (res) =>
        dispatch({
          type: GET_WISHLIST_PRODUCT_ID,
          payload: res.data,
          producto: payload.product,
        }),
      (error) => swal("Error")
    );
  };
};
export const create_new_wishlist = (payload) => {
  return (dispatch) => {
    axios.post(`${local_url}/wishlist`, payload).then(
      (res) =>
        dispatch({
          type: CREATE_WISHLIST_PRODUCT,
          payload: res.data,
          producto: payload.product_id,
        }),
      (error) => swal("Favoritos no creada")
    );
  };
};
export const remove_wishlist_product = (id, id_user) => {
  return (dispatch) => {
    axios
      .delete(`${local_url}/wishlist`, { data: { id: id, id_user: id_user } })
      .then(
        (res) =>
          dispatch({
            type: REMOVE_PRODUCT_WISHLIST,
            payload: res.data,
            id: id,
          }),
        (error) => swal(error)
      );
  };
};

export const allFilters = (payload) => {
  return {
    type: ALL_FILTERS,
    payload,
  };
};

export const getStock = (id) => {
  return async function (dispatch) {
    const { data } = await axios(`https://api.mercadolibre.com/items/${id}`);
    dispatch({ type: GET_STOCK, payload: data });
  };
};

export const adminDeleteShoes = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`${local_url}/shoes/${id}`);
    } catch (error) {
      swal(`ERROR: ${error}`);
    }
  };
};
export const modifyProduct = ({ id, input }) => {
  return async (dispatch) => {
    await axios
      .put(`${local_url}/shoes/${id}`, input)
      .then((res) => dispatch({ type: MODIFY_PRODUCT }));
  };
};

export const getAllCategoryAdmin = () => {
  return async (dispatch) => {
    try {
      const result = await axios(`${local_url}/categories/admin`);
      return dispatch({ type: ALL_CATEGORY_ADMIN, payload: result.data });
    } catch (error) {
      swal("ERROR!", `${error.message}`, "danger");
    }
  };
};
export const modifyCategory = ({ id, input }) => {
  return async (dispatch) => {
    await axios
      .put(`${local_url}/shoes/${id}`, input)
      .then((res) => dispatch({ type: MODIFY_CATEGORY }));
  };
};
//me falta crear ruta delete para descomentar esto!
// export const adminDeleteCategories = (id) => {
//   return async function (dispatch) {
//     try {
//       await axios.delete(`${local_url}/shoes/${id}`);
//     } catch (error) {
//       swal(`ERROR: ${error}`);
//     }
//   };
// };
export const getUsers = (id) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${local_url}/customers/`);
      return dispatch({
        type: GET_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${local_url}/customers/` + id);
      return dispatch({
        type: GET_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductosDestacados = (payload) => {
  return {
    type: GET_PRODUCTOS_DESTACADOS,
    payload,
  };
};

export const getOrderProducts = (payload) => {
  return async (dispatch) => {
    const json = await axios.get(`${local_url}/order/`, payload);
    dispatch({ type: GET_ORDER, payload: json.data, correo: payload });
  };
};

export const updateUser = (payload) => {
  return async function (dispatch) {
    var response = await axios.post(`${local_url}/customers/update/` + payload.id, payload.submission)
    console.log(response, "esto es response")
    return response;
  };
};

export const updateUserAdmin = (payload) => {
  const { admin, banned } = payload
  return async function (dispatch) {
    var response = await axios.post(`${local_url}/customers/admin/update/` + payload.id, { admin, banned })
    console.log(response, "esto es response")
    return response;
  };
};

export const getPictures = (id) => {
  return async function (dispatch) {
    let json = await axios.get(`${local_url}/shoes/pictures/${id}`);
    return dispatch({
      type: "GET_PICTURES",
      payload: json.data,
    });
  };
};

export const orderStatus = () => {
  return (dispatch) => {
    axios
      .get(`${local_url}/order`)
      .then((res) => dispatch({ type: ORDER_STATUS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const filterByOrder = (payload) => {
  return {
    type: FILTER_ORDER,
    payload,
  };
};

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${local_url}/customers`, payload);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const addCategory = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`${local_url}/categories`, { nameC: payload })
        .then(res => dispatch({ type: ADD_CATEGORY, payload: res.data }))
    } catch (error) {
      console.log(error)
    }
  }
}

export const editCategory = ({ id, name }) => {
  return async (dispatch) => {
    try {
      await axios.put(`${local_url}/categories/${id}`, { nameCategory: name })
        .then(res => dispatch({ type: EDIT_CATEGORY, payload: res.data }))
    } catch (error) {
      console.log(error)
    }
  }
}

export const adminDeleteCategories = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${local_url}/categories/${id}`)
        .then(res => dispatch({type: DELETE_CATEGORY,payload:id}))
    } catch (error) {
      swal("Oops...", `ERROR: ${error}`, "error");
    }
  }
}

export const deleteOrder = ({ id }) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${local_url}/order/${id}`);
      return dispatch({type:DELETE_ORDER,payload:id})
    } catch (error) {
      swal(`ERROR: ${error}`);
    }
  };
}
export const updateStateOfOrder = (payload) => {
  return async (dispatch) => {
    try {
      const {id} = payload
      console.log(id,payload.order)
      await axios.put(`${local_url}/order/${id}`,payload)
      return dispatch({type:UPDATE_ORDER})
    } catch (error) {
      swal(`ERROR: ${error}`);
    }
  };
}

export const searchUser = (customer) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_USER, payload: customer })
  }
}
export const reloadUser = () => {
  return (dispatch) => {
    dispatch({ type: RELOAD_USER })
  }
}

// export const clearStateDetail = () => {
//   return {
//     type: CLEAR_STATE
//   }
// }
