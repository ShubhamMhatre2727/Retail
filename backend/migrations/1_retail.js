var retail = artifacts.require("./retail.sol");

module.exports = function(deployer) {
    deployer.deploy(retail);
}