function isOperandValid(operand) {
  return Number.isFinite(operand);
}

module.exports.validateOperand = function(a, b) {
  return (isOperandValid(a) && isOperandValid(b))
}