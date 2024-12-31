import PropTypes from 'prop-types';
import HTTP from '../../configs/HTTP';

export const getOrders = async ({ access_token }) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/get_orders_employee',
      options,
      (res) => {
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      (err) => {
        handleError(err);
      },
    );
  });

export const getOrderDetail = async ({ access_token, id }) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
      id: id,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/get_order_detail_employee',
      options,
      (res) => {
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      (err) => {
        handleError(err);
      },
    );
  });

export const updateOrder = async ({ access_token, id, action }) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
      id: id,
      action: action,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sale_order/update',
      options,
      (res) => {
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      (err) => {
        handleError(err);
      },
    );
  });

getOrders.propTypes = {
  access_token: PropTypes.string.isRequired,
};

getOrderDetail.propTypes = {
  access_token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

updateOrder.propTypes = {
  access_token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  action: PropTypes.string.isRequired,
};
