import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    isWalletConnected: false,
    walletAddress: null,
    balance: "0",
  },
  reducers: {
    connectWallet: (state, action) => {
      state.isWalletConnected = true;
      state.walletAddress = action.payload.walletAddress;
      state.balance = action.payload.balance;
    },
    disconnectWallet: (state) => {
      state.isWalletConnected = false;
      state.walletAddress = null;
      state.balance = 0;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload.balance;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setIsWalletConnected: (state, action) => {
      state.isWalletConnected = action.payload;
    },
  },
});

export const {
  connectWallet,
  disconnectWallet,
  updateBalance,
  setWalletAddress,
  setBalance,
  setIsWalletConnected,
} = walletSlice.actions;

export default walletSlice.reducer;
