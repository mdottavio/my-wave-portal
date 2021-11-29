//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 lastWaveDate;
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }
    Wave[] waves;

    constructor() {
        console.log("Starting contract ", block.timestamp);
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        uint256 timestamp = block.timestamp;
        waves.push(Wave(msg.sender, _message, timestamp));
        lastWaveDate = timestamp;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getLastWaveDate() public view returns (uint256) {
      return lastWaveDate;
    }

    function getAllWaves() public view returns (Wave[] memory){
    return waves;
    }
}
