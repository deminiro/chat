const nickname = localStorage.getItem('nickname');

let bool;
if (nickname !== null) {
  bool = true;
} else {
  bool = false;
}

const loggedReducer = (state = bool, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
