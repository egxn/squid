import {getButtonBarItem} from './extension';

test('Create a squid button bar item', () => {
  const button = getButtonBarItem('squid.createInkServer');

  expect(button.command).toBe('squid.createInkServer');
  expect(button.text).toBe('[🦑]');
  expect(button.tooltip).toBe('Create an ink server');
});