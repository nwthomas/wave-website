// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    mapping (address => uint) addressToWaveCount;
    uint totalWaves;

    event NewWave(address indexed from, uint timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("Contract was built successfully");
    }

    function wave(string memory _message) public {
        totalWaves += 1;

        if (addressToWaveCount[msg.sender] >= 1) {
            addressToWaveCount[msg.sender]++;
        } else {
            addressToWaveCount[msg.sender] = 1;
        }

        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        uint prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
        (bool success,) = (msg.sender).call{value: prizeAmount}("");
        require(success, "failed to withdraw money from the contract.");
    }

    function getTotalWaves() view public returns (uint) {
        return totalWaves;
    }

    function getAddressWaves(address _address) view public returns (uint) {
        if (addressToWaveCount[_address] >= 1) {
            return addressToWaveCount[_address];
        }

        return 0;
    }

    function getAllWaves() view public returns (Wave[] memory) {
        return waves;
    }
}