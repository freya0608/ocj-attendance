const _ = require('lodash');

// 将一个数组类型的 orm model instance toJSON
const modeInstanceListToJSON = modelList => modelList.map(model => model.toJSON());

/**
 * 自动分sql查询hasmany关系的字段
 *
 * @param scopedModel {orm model}
 * @param includes {Array}
 * {
 *   model: 'ProductVideo',
 *   filter: {} //所有合法的orm find options
 * }
 * 可参看 ／v1/products 的用法
 *
 */
exports.autoAttachHasMany = (scopedModel, includes = []) => async (options) => {
  const { count, rows } = await scopedModel.findAndCountAll(options);
  const extrasFieldPromises = includes.map((item, idx) => {
    const { model, filter } = item;
    return Promise.all(rows.map(modelInstance => modelInstance[`get${model}`](filter)));
  });

  const extraResults = await Promise.all(extrasFieldPromises);
  const finalRows = rows.map((row, idx) => {
    const jsonRow = row.toJSON();
    extraResults.forEach((resultList, keyIdx) => {
      const { model } = includes[keyIdx];
      jsonRow[model] = modeInstanceListToJSON(resultList[idx]);
    });
    return jsonRow;
  });
  return {
    count,
    rows: finalRows
  };
};
