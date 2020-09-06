import * as types from "./types";

export function getIntialData(data) {
  return {
    type: types.GET_INITIAL,
    data: data
  };
}

export function getData() {
  return {
    type: types.GET_SUCESS
  };
}

export function getUpdatedData() {
  return {
    type: types.UPDATE_SUCESS
  };
}

export function filterData(data, condition) {
  console.log(condition);
  return dispatch => {
    const newData = data;
    const filterData = [];

    if (condition.isHeart && !condition.isStar) {
      for (var i = 0; i < newData.length; i++) {
        if (newData[i].isHeart) {
          filterData.push(newData[i]);
        }
      }
    } else if (condition.isStar && !condition.isHeart) {
      for (var i = 0; i < newData.length; i++) {
        if (newData[i].isStar) {
          filterData.push(newData[i]);
        }
      }
    } else if (condition.isStar && condition.isHeart) {
      for (var i = 0; i < newData.length; i++) {
        if (newData[i].isStar && newData[i].isHeart) {
          filterData.push(newData[i]);
        }
      }
    }
    dispatch({
      type: types.FILTER_REQUEST,
      filter: filterData
    });
  };
}

export function deleteRow(rowMap, data, rowKey) {
  console.log("delete");
  console.log(data);
  console.log(rowKey);
  return dispatch => {
    const newData = data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].key == rowKey) {
        newData.splice(i, 1);
      }
    }
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function updateStar(rowMap, data, rowKey) {
  return dispatch => {
    const newData = data;
    newData[rowKey].isStar = !newData[rowKey].isStar;
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function updateHeart(rowMap, data, rowKey) {
  return dispatch => {
    const newData = data;
    newData[rowKey].isHeart = !newData[rowKey].isHeart;
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function saveData(data, type, position, obj) {
  return dispatch => {
    const newData = data;
    if (type == "edit") {
      newData[position] = obj;
    } else {
      newData.push(obj);
    }
    dispatch({
      type: types.GET_SUCESS,
      data: newData
    });
  };
}

export function peformEdit(rowMap, rowKey) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_REQUEST,
      position: rowKey
    });
  };
}

export function createNew() {
  return dispatch => {
    dispatch({
      type: types.CREATE_REQUEST
    });
  };
}
