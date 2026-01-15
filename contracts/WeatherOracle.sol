// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";

interface IWeatherBetAMM {
    function propose(uint256 id, int256 v) external;
}

contract MockWeatherOracle is Ownable {
    IWeatherBetAMM public immutable amm;

    constructor() Ownable(msg.sender) {
        amm = IWeatherBetAMM(0x7ff64aC54827360A860d8EbD13Bf39e0eb68fE5A);
    }

    function resolve(uint256 marketId, int256 value) external onlyOwner {
        amm.propose(marketId, value);
    }
}
