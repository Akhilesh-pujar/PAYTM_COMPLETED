import { atom, selector } from 'recoil';

export const usernameState = atom({
  key: 'usernameState',
  default: '',
});

export const firstNameState = atom({
  key: 'firstNameState',
  default: '',
});

export const lastNameState = atom({
  key: 'lastNameState',
  default: '',
});

export const passwordState = atom({
  key: 'passwordState',
  default: '',
});

export const balanceState = atom({
  key: "balance",
  default: 0
})

export const transferTo = atom({
  key: "to",
  default: {
    username: "",
    fullName: ""
  }
})

export const usersState = atom({
  key: "users", 
  default: []
})