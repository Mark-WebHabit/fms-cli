export const handleClearStatePromise = async (setterState, stateObject) => {
  try {
    for (const key in stateObject) {
      await new Promise((resolve) => {
        setterState((prevState) => ({
          ...prevState,
          [key]: "",
        }));
        resolve();
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleValidPasswordOrUsername = (state, maxLength = null) => {
  return new Promise((resolve, reject) => {
    if (!state || typeof state !== "string") {
      reject(new Error("Invalid state, expected string"));
    }
    if (maxLength && typeof maxLength !== "number") {
      reject(
        new Error(`Invalid argument maxLength ${maxLength}, expected number`)
      );
    }
    if (maxLength && state.length < maxLength) {
      reject(
        new Error(
          `${state} too short, expected at least ${maxLength} characters`
        )
      );
    }

    resolve("valid state");
  });
};

export const handleConfirmPassword = (password, confirmer) => {
  return new Promise((resolve, reject) => {
    if (!password || !confirmer) {
      reject(new Error("Empty argument"));
    }

    if (password !== confirmer) {
      reject(new Error("Passwords don't matched"));
    }

    resolve("Passwords matched");
  });
};

export const handleStateChange = (setterState, state, key, val) => {
  setterState({ ...state, [key]: val });
};
