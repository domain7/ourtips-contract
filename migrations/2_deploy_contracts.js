const Ourtips = artifacts.require("./Ourtips.sol");

module.exports = (deployer) => {
  deployer.deploy(Ourtips, ['0x627306090abab3a6e1400e9345bc60c78a8bef57', '0xf17f52151ebef6c7334fad080c5704d77216b732'], [1,2], 'Default name');
};
