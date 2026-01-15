// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WeatherBetAMM v2 Mini
 * @notice Secure LMSR prediction market - optimized for MegaETH
 */
contract WeatherBetAMMv2 is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdm;
    address public oracle;
    uint256 public nextId = 1;
    bool public paused;

    struct Market {
        uint256 id;
        uint256 closes;
        uint256 weekEnd;
        uint256 yesShares;
        uint256 noShares;
        uint256 liq;
        int256 avg;
        int256 proposed;
        uint256 resTime;
        uint8 status; // 0=active,1=pending,2=disputed,3=resolved,4=cancelled
        bool outcome;
    }

    struct Position {
        uint256 yes;
        uint256 no;
        uint256 cost;
        bool claimed;
    }

    struct Account {
        uint256 bal;
        uint256 lastW;
    }

    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => Position)) public positions;
    mapping(address => Account) public accounts;

    event Deposit(address indexed u, uint256 a);
    event Withdraw(address indexed u, uint256 a);
    event Buy(uint256 indexed id, address indexed u, bool isYes, uint256 s, uint256 c);
    event Sell(uint256 indexed id, address indexed u, bool isYes, uint256 s, uint256 p);
    event Proposed(uint256 indexed id, int256 v);
    event Resolved(uint256 indexed id, bool o);

    modifier notPaused() { require(!paused, "P"); _; }
    modifier onlyOracle() { require(msg.sender == oracle, "O"); _; }

    constructor() Ownable(msg.sender) {
        usdm = IERC20(0x18Fe541217F45a32D11183C2F90a5E22598d9749);
    }

    function deposit(uint256 a) external nonReentrant notPaused {
        require(a > 0, "Z");
        usdm.safeTransferFrom(msg.sender, address(this), a);
        accounts[msg.sender].bal += a;
        emit Deposit(msg.sender, a);
    }

    function withdraw(uint256 a) external nonReentrant notPaused {
        Account storage acc = accounts[msg.sender];
        require(acc.bal >= a, "B");
        require(block.timestamp >= acc.lastW + 1 hours, "C");
        acc.bal -= a;
        acc.lastW = block.timestamp;
        usdm.safeTransfer(msg.sender, a);
        emit Withdraw(msg.sender, a);
    }

    function createMarket(uint256 weekStart, int256 avg, uint256 liq) external onlyOwner returns (uint256 id) {
        require(weekStart > block.timestamp + 24 hours, "T");
        require(liq >= 100e18, "L");
        id = nextId++;
        markets[id] = Market(id, weekStart - 24 hours, weekStart + 7 days, 0, 0, liq, avg, 0, 0, 0, false);
    }

    function buy(uint256 id, bool isYes, uint256 s, uint256 max) external nonReentrant notPaused {
        Market storage m = markets[id];
        require(m.id != 0 && m.status == 0, "M");
        require(block.timestamp < m.closes, "C");
        require(s > 0 && s <= 10000e18, "S");

        Position storage p = positions[id][msg.sender];
        require((isYes ? p.yes : p.no) + s <= 100000e18, "X");

        uint256 cost = _buyCost(m, isYes, s);
        require(cost <= max && accounts[msg.sender].bal >= cost, "F");

        accounts[msg.sender].bal -= cost;
        if (isYes) { m.yesShares += s; p.yes += s; }
        else { m.noShares += s; p.no += s; }
        p.cost += cost;

        emit Buy(id, msg.sender, isYes, s, cost);
    }

    function sell(uint256 id, bool isYes, uint256 s, uint256 min) external nonReentrant notPaused {
        Market storage m = markets[id];
        require(m.id != 0 && m.status == 0 && block.timestamp < m.closes, "M");

        Position storage p = positions[id][msg.sender];
        if (isYes) { require(p.yes >= s, "N"); p.yes -= s; m.yesShares -= s; }
        else { require(p.no >= s, "N"); p.no -= s; m.noShares -= s; }

        uint256 pay = _sellPay(m, isYes, s);
        require(pay >= min, "R");
        accounts[msg.sender].bal += pay;

        emit Sell(id, msg.sender, isYes, s, pay);
    }

    function propose(uint256 id, int256 v) external onlyOracle {
        Market storage m = markets[id];
        require(m.status == 0 && block.timestamp >= m.weekEnd, "M");
        m.proposed = v;
        m.resTime = block.timestamp;
        m.status = 1;
        emit Proposed(id, v);
    }

    function dispute(uint256 id) external {
        Market storage m = markets[id];
        Position storage p = positions[id][msg.sender];
        require(m.status == 1 && block.timestamp < m.resTime + 24 hours, "D");
        require(p.yes > 0 || p.no > 0, "P");
        m.status = 2;
    }

    function finalize(uint256 id) external {
        Market storage m = markets[id];
        require(m.status == 1 && block.timestamp >= m.resTime + 24 hours, "F");
        m.outcome = m.proposed > m.avg;
        m.status = 3;
        emit Resolved(id, m.outcome);
    }

    function override_(uint256 id, int256 v) external onlyOwner {
        Market storage m = markets[id];
        require(m.status == 2, "O");
        m.proposed = v;
        m.outcome = v > m.avg;
        m.status = 3;
        emit Resolved(id, m.outcome);
    }

    function claim(uint256 id) external nonReentrant {
        Market storage m = markets[id];
        Position storage p = positions[id][msg.sender];
        require(m.status == 3 && !p.claimed, "C");
        p.claimed = true;
        uint256 pay = m.outcome ? p.yes : p.no;
        if (pay > 0) accounts[msg.sender].bal += pay;
    }

    function emergencyW(uint256 id) external nonReentrant {
        Market storage m = markets[id];
        Position storage p = positions[id][msg.sender];
        require(m.status == 4 && !p.claimed && p.cost > 0, "E");
        p.claimed = true;
        accounts[msg.sender].bal += p.cost;
    }

    // Views
    function getPrice(uint256 id) external view returns (uint256 y, uint256 n) {
        Market storage m = markets[id];
        if (m.yesShares == 0 && m.noShares == 0) return (5e5, 5e5);
        uint256 e1 = _exp((m.yesShares * 1e18) / m.liq);
        uint256 e2 = _exp((m.noShares * 1e18) / m.liq);
        uint256 t = e1 + e2;
        return ((e1 * 1e6) / t, (e2 * 1e6) / t);
    }

    function getBal(address u) external view returns (uint256) { return accounts[u].bal; }
    function getPos(uint256 id, address u) external view returns (uint256, uint256, bool) {
        Position storage p = positions[id][u];
        return (p.yes, p.no, p.claimed);
    }

    // Admin
    function setOracle(address o) external onlyOwner { oracle = o; }
    function setPause(bool p) external onlyOwner { paused = p; }
    function cancel(uint256 id) external onlyOwner { markets[id].status = 4; }

    // LMSR
    function _buyCost(Market storage m, bool isYes, uint256 s) internal view returns (uint256) {
        uint256 b = _cost(m.yesShares, m.noShares, m.liq);
        uint256 a = isYes ? _cost(m.yesShares + s, m.noShares, m.liq) : _cost(m.yesShares, m.noShares + s, m.liq);
        return a > b ? a - b : 0;
    }

    function _sellPay(Market storage m, bool isYes, uint256 s) internal view returns (uint256) {
        uint256 b = _cost(m.yesShares, m.noShares, m.liq);
        uint256 a = isYes ? _cost(m.yesShares - s, m.noShares, m.liq) : _cost(m.yesShares, m.noShares - s, m.liq);
        return b > a ? b - a : 0;
    }

    function _cost(uint256 q1, uint256 q2, uint256 b) internal pure returns (uint256) {
        if (q1 == 0 && q2 == 0) return (b * 693147) / 1e6;
        return (b * _ln(_exp((q1 * 1e18) / b) + _exp((q2 * 1e18) / b))) / 1e18;
    }

    function _exp(uint256 x) internal pure returns (uint256) {
        if (x > 5e18) return type(uint256).max / 2;
        return 1e18 + x + (x * x) / 2e18 + (x * x * x) / 6e36;
    }

    function _ln(uint256 x) internal pure returns (uint256) {
        if (x <= 1e18) return 0;
        return ((x - 1e18) * 1e18) / x;
    }
}
