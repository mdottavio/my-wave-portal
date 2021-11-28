//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 lastWaveDate;

    constructor() {
        console.log("Starting contract ", block.timestamp);
    }

    function wave() public {
        totalWaves += 1;
        lastWaveDate = block.timestamp;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getLastWaveDate() public view returns (uint256) {
      return lastWaveDate;
    }
}
