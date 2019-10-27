const usersMock = [
  { id: '1', firstName: 'Tom', lastName: 'Coleman' },
  { id: '2', firstName: 'Sashko', lastName: 'Stubailo' },
  { id: '3', firstName: 'Mikhail', lastName: 'Novikov' },
];

const postsMock = [
  {
    id: '1', userId: '1', title: 'Introduction to GraphQL', content: 'content Introduction to GraphQL',
  },
  {
    id: '2', userId: '2', title: 'Welcome to Meteor', content: 'content Welcome to Meteor',
  },
  {
    id: '3', userId: '2', title: 'Advanced GraphQL', content: 'content Advanced GraphQL',
  },
  {
    id: '4', userId: '3', title: 'Launchpad is Cool', content: 'content Launchpad is Cool',
  },
];

const commentsMock = [
  {
    id: '1', userId: '1', postId: '1', content: 'Comment Introduction to GraphQL',
  },
  {
    id: '2', userId: '2', postId: '2', content: 'Comment Welcome to Meteor',
  },
  {
    id: '3', userId: '2', postId: '2', content: 'Comment Advanced GraphQL',
  },
  {
    id: '4', userId: '3', postId: '3', content: 'Comment Launchpad is Cool',
  },
];
