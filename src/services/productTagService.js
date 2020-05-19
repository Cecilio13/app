import http from '../services/http-common';

const getAll = () => {
    return http.get("/product_tags");
};

const get = id => {
    return http.get(`/product_tags/${id}`);
};

const create = data => {
    return http.post("/", data);
};

const update = (id, data) => {
    return http.put(`/product_tags/${id}`, data);
};

const remove = id => {
    return http.delete(`/product_tags/${id}`);
};

const removeAll = () => {
    return http.delete(`/product_tags`);
};

const findByActive = active => {
    return http.get(`/product_tags?title=${active}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByActive
  };

