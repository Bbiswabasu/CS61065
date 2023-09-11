// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract AddressRollMap {
    mapping(address => string) public roll;
    function update(string calldata newRoll) public
    {
        roll[msg.sender] = newRoll;
    }
    function get(address addr) public view returns (string memory)
    {
        return roll[addr];
    }
    function getmine() public view returns (string memory)
    {
        return roll[msg.sender];
    }
}