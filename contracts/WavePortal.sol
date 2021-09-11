// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    mapping (address => uint) addressToWaveCount;
    uint totalWaves;

    constructor() {
        console.log("Marty, we have to go back!!!");
    }

    function wave() public {
        totalWaves += 1;

        if (addressToWaveCount[msg.sender] >= 1) {
            addressToWaveCount[msg.sender] += 1;
        } else {
            addressToWaveCount[msg.sender] = 1;
        }

        console.log("%s is waved!", msg.sender);
    }

    function getTotalWaves() view public returns (uint) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    function getAddressWaves(address _address) view public returns (uint) {
        if (addressToWaveCount[_address] >= 1) {
            return addressToWaveCount[_address];
        }

        return 0;
    }
}