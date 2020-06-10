console.log('getting mocked version');

export const getTodos = jest.fn().mockReturnValue([
  {id: '1', title: 'my first item', isActive: false},
  {id: '2', title: 'my second todo', isActive: false}
]);

export const getTodosAsync = jest.fn().mockResolvedValue([
  {id: '1', title: 'my first item', isActive: false},
  {id: '2', title: 'my second todo', isActive: false}
]);
