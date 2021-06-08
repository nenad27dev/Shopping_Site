import axios from 'axios'
import {
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SUBCATEGORY_DETAILS_FAIL,
  PRODUCT_SUBCATEGORY_DETAILS_REQUEST,
  PRODUCT_SUBCATEGORY_DETAILS_SUCCESS,
} from '../constants/ProductConstants'
import { logout } from './userActions'
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })

    const { data } = await axios.get('/api/products')
    console.log('Data is', data)
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/products/${id}`)
    console.log('Data is', data)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCategoryDetails = (categoryName, cost) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CATEGORY_DETAILS_REQUEST,
    })
    console.log('values', categoryName, cost)
    const { data } = await axios.get(
      `/api/products/category/${categoryName}/${cost}`
    )
    console.log('Data is', data)
    dispatch({
      type: PRODUCT_CATEGORY_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listsubCategoryDetails =
  (subcategoryName, cost) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_SUBCATEGORY_DETAILS_REQUEST,
      })
      console.log('values', subcategoryName, cost)
      const { data } = await axios.get(
        `/api/products/subcategory/${subcategoryName}/${cost}`
      )
      console.log('Data is', data)
      dispatch({
        type: PRODUCT_SUBCATEGORY_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_SUBCATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const productsSearch = (productName) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_SEARCH_REQUEST,
    })
    const { data } = await axios.get(`/api/products/search/${productName}`)
    console.log('Data is', data)
    dispatch({
      type: PRODUCT_SEARCH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })

      const {
        userLogin: { userInformation },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInformation.token}`,
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config)

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }
