import { useCallback, useEffect, useState } from "react";

export const useWallet = () => {
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        throw Error("Make sure you have metamask!");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        throw Error("Make sure you have metamask!");
      }
      //  else {
      //   console.log("We have the ethereum object", ethereum);
      // }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        setError(null);
      } else {
        throw Error("No authorized account found");
      }
    } catch (err) {
      setError(err);
    }
  }, [setError, setCurrentAccount]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return {
    currentAccount,
    error,
    connectWallet,
  };
};
