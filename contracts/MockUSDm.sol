// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockUSDm - Mock USDm Stablecoin for Testing
 * @notice Mintable ERC20 token that simulates USDm on testnet
 * @dev On mainnet, use the real USDm token address
 */
contract MockUSDm is ERC20, Ownable {
    uint8 private _decimals;
    
    // Faucet settings
    uint256 public faucetAmount = 1000 * 10**18; // 1000 USDm per claim
    uint256 public faucetCooldown = 1 hours;
    mapping(address => uint256) public lastFaucetClaim;
    
    constructor() ERC20("Mock USDm", "USDm") Ownable(msg.sender) {
        _decimals = 18;
    }
    
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    /**
     * @notice Mint tokens (owner only, for initial distribution)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @notice Public faucet for testnet usage
     */
    function faucet() external {
        require(
            block.timestamp >= lastFaucetClaim[msg.sender] + faucetCooldown,
            "Faucet cooldown not elapsed"
        );
        
        lastFaucetClaim[msg.sender] = block.timestamp;
        _mint(msg.sender, faucetAmount);
    }
    
    /**
     * @notice Check if user can claim from faucet
     */
    function canClaimFaucet(address user) external view returns (bool) {
        return block.timestamp >= lastFaucetClaim[user] + faucetCooldown;
    }
    
    /**
     * @notice Time until next faucet claim
     */
    function timeUntilNextClaim(address user) external view returns (uint256) {
        uint256 nextClaimTime = lastFaucetClaim[user] + faucetCooldown;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        return nextClaimTime - block.timestamp;
    }
    
    /**
     * @notice Update faucet settings (owner only)
     */
    function setFaucetSettings(uint256 _amount, uint256 _cooldown) external onlyOwner {
        faucetAmount = _amount;
        faucetCooldown = _cooldown;
    }
}
