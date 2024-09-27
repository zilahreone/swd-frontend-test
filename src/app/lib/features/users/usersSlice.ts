import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchUsers = () => {
//   return localStorage.getItem('count')
// }
const initialState: any = {
  users: [],
  loading: false,
  value: 0,
  edit_index: -1,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
      localStorage.setItem('count', state.value.toString());
    },
    setCount: (state, payload) => {
      // state.value = Number(localStorage.getItem('count'))
    },
    setUser: (state, action) => {
      // console.log(action.payload);
      state.users = [...state.users, action.payload]
      localStorage.setItem('swd-user', JSON.stringify(state.users))
    },
    getUsers: (state) => {
      // console.log(localStorage.getItem('swd-user'));
      const users: string | null = localStorage.getItem('swd-user')
      if (users) {
        state.users = JSON.parse(users)
      }
    },
    deleteRow: (state, action) => {
      // console.log('deleteRow', action.payload);
      const users = JSON.parse(JSON.stringify(state.users))
      const filter = users.filter((user: any) => user.id !== action.payload.id)
      state.users = filter
      localStorage.setItem('swd-user', JSON.stringify(state.users))
    },
    setEditIndex: (state, action) => {
      state.edit_index = action.payload
    },
    setEditUser: (state, action) => {
      // console.log(action.payload);
      let users = JSON.parse(JSON.stringify(state.users))
      // console.log(users);
      users = users.map((user: any) => user.id === state.edit_index ? action.payload : user)
      state.users = users
      localStorage.setItem('swd-user', JSON.stringify(state.users))
      state.edit_index = -1
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.users.push(...action.payload);
    // });

    // builder.addCase('fetchUsers', (state, action) => {
    //   const count = localStorage.getItem('count')
    //   if (count) {
    //     state.loading = false;
    //     state.value = Number(count)
    //   }
    //   state.loading = true;
    // });
  },
});

export const { increment, setUser, getUsers, deleteRow, setEditIndex, setEditUser } = userSlice.actions;
export default userSlice.reducer;