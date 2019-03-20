import { SendBox, SearchBox, ChatPreview, Message } from './';

test('Check the public exportation', () => {
  expect(SendBox).toBeDefined();
  expect(ChatPreview).toBeDefined();
  expect(SearchBox).toBeDefined();
  expect(Message).toBeDefined();
});