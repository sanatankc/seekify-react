export const mapRange = (obj, num) =>
  ((num - obj.from[0]) * (obj.to[1] - obj.to[0])) /
    (obj.from[1] - obj.from[0]) +
  obj.to[0];

export default mapRange;
