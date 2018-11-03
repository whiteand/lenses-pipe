import { view, over, lens } from "ramda";
module.exports = (...lenses) => {
  const getFunc = state => {
    let currentValue = state;
    for (const lens of lenses) {
      currentValue = view(lens, currentValue);
    }
    return currentValue;
  };
  const _setFunc = (value, state, lenses, index = 0) => {
    if (lenses.length === 0) return value;
    if (lenses.length - 1 === index)
      return over(lenses[index], () => value, state);

    return over(
      lenses[index],
      innerState => _setFunc(value, innerState, lenses, index + 1),
      state
    );
  };
  const setFunc = (value, state) => {
    return _setFunc(value, state, lenses);
  };
  return lens(getFunc, setFunc);
};
