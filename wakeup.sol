// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract WakeUpPoints {
    struct User {
        string username;
        string email;
        bool exists;
        uint256 points;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddress, string username, string email);
    event PointsRewarded(address indexed user, uint256 totalPoints);

    function register(string memory _username, string memory _email) public {
        require(!users[msg.sender].exists, "User already registered");

        users[msg.sender] = User({
            username: _username,
            email: _email,
            exists: true,
            points: 0
        });

        emit UserRegistered(msg.sender, _username, _email);
    }

    function rewardOnWakeUp() public {
        require(users[msg.sender].exists, "User not registered");
        users[msg.sender].points += 10;
        emit PointsRewarded(msg.sender, users[msg.sender].points);
    }

    function getUser(address _userAddress) public view returns (
        string memory, string memory, uint256
    ) {
        require(users[_userAddress].exists, "User not found");
        User memory user = users[_userAddress];
        return (user.username, user.email, user.points);
    }
}
