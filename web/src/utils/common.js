export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const bitcoinAddressRegexStr =
  '^((1[a-km-zA-HJ-NP-Z1-9]{25,34})|(3[a-km-zA-HJ-NP-Z1-9]{25,34})|(bc1[a-zA-HJ-NP-Z0-9]{25,39}))$';

export const validateBitcoinAddress = (value) => {
  return new RegExp(bitcoinAddressRegexStr).test(value);
};

export const validateBitcoinTx = (value) => {
  const regExpStr = '^[a-fA-F0-9]{64}$';
  return new RegExp(regExpStr).test(value);
};

export const checkValidUUID = (value)  => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(value);
};

export const titleShortener = (type, value) => {
  if (type === 'wallet') {
    return 'Wallet [' + value.split('-')[0] + ']';
  } else if (type === 'transaction') {
    return 'Tx [' + value.substring(0, 8) + ']';
  } else if (type === 'address') {
    return 'Address [' + value.substring(0, 8) + ']';
  } else {
    return value;
  }
};
