export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const validateBitcoinAddress = (value) => {
  const regExpStr = "^((1[a-km-zA-HJ-NP-Z1-9]{25,34})|(3[a-km-zA-HJ-NP-Z1-9]{25,34})|(bc1[a-zA-HJ-NP-Z0-9]{25,39}))$"
  return new RegExp(regExpStr).test(value)
}

export const validateBitcoinTx = (value) => {
  const regExpStr = "^[a-fA-F0-9]{64}$"
  return new RegExp(regExpStr).test(value)
}
