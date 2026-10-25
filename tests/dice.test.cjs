const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../js/dice.js'), 'utf8');

function checkWithDigits(digits, target, opts) {
  let i = 0;
  const random = Object.create(Math);
  random.random = () => {
    assert.ok(i < digits.length, '随机数调用数量错误');
    return (digits[i++] + 0.01) / 10;
  };
  const context = { Math: random };
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.Dice.check(target, opts);
}

test('个位为零的奖励骰选 20 而不是 00=100', () => {
  const r = checkWithDigits([0, 0, 2], 50, { bonus: 1 });
  assert.equal(r.result, 20);
  assert.equal(r.chosen, 2);
});
test('个位为零的惩罚骰选 00=100 而不是 20', () => {
  assert.equal(checkWithDigits([0, 0, 2], 50, { penalty: 1 }).result, 100);
});
test('奖励与惩罚相抵时只掷基础十位', () => {
  assert.equal(checkWithDigits([3, 4], 50, { bonus: 1, penalty: 1 }).result, 43);
});
test('返回 CoC 的成功等级与大失败边界', () => {
  for (const [digits, target, expected] of [
    [[1, 0], 50, 'crit'], [[0, 1], 50, 'extreme'], [[5, 2], 50, 'hard'],
    [[6, 2], 50, 'success'], [[1, 5], 50, 'fail'],
    [[6, 9], 49, 'fumble'], [[6, 9], 50, 'fail'], [[0, 0], 90, 'fumble']
  ]) assert.equal(checkWithDigits(digits, target).grade, expected);
});
test('困难阈值向下取整', () => {
  assert.equal(checkWithDigits([3, 2], 47).grade, 'hard');
  assert.equal(checkWithDigits([4, 2], 47).grade, 'success');
});
