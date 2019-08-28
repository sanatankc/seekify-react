export const mapRange = (obj, num) =>
  ((num - obj.from[0]) * (obj.to[1] - obj.to[0])) /
    (obj.from[1] - obj.from[0]) +
  obj.to[0];

const mapScale = (options, value) => {
  if (value > options.from[0]) return options.to[0];
  if (value < options.from[1]) return options.to[1];
  return mapRange(options, value);
};

export default mapScale