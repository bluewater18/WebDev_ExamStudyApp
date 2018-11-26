--DROP TABLE IF EXISTS Groups;
--DROP TABLE IF EXISTS GroupMembers;

--DROP PROCEDURE IF EXISTS AddGroup;

--CREATE TABLE IF NOT EXISTS Groups(
--	GroupId INT AUTO_INCREMENT,
--	GroupName VARCHAR(50),
--	GroupType VARCHAR(16),
--	GroupOwnerId INT,
--	PRIMARY KEY (GroupId),
--	CONSTRAINT FK_Owner FOREIGN KEY (GroupOwnerId) REFERENCES Users(UserId) ON DELETE CASCADE
--	);


--CREATE TABLE IF NOT EXISTS GroupMembers(
--	GroupId INT,
--	UserId INT,
--	MemberType VARCHAR(16),
--	PRIMARY KEY (GroupId, UserId, MemberType),
--	CONSTRAINT FK_GroupMember FOREIGN KEY (GroupId) REFERENCES Groups(GroupId) ON DELETE CASCADE,
--	CONSTRAINT FK_UserGroup FOREIGN KEY (UserID) REFERENCES Users(UserId) ON DELETE CASCADE
--);

--DELIMITER $$
--CREATE PROCEDURE `AddGroup`(
--	IN p_GroupName VARCHAR(50),
--	IN p_GroupType VARCHAR(16),
--	IN p_GroupOwnerId INT
--)
--BEGIN
--	DECLARE tempId INT;
--	INSERT INTO Groups
--	SET
--		GroupName = p_GroupName,
--		GroupType = p_GroupType,
--		GroupOwnerId = p_GroupOwnerId;
--	SELECT GroupId INTO tempId FROM Groups WHERE GroupName = p_GroupName 
--		AND GroupType = p_GroupType
--		AND GroupOwnerId = p_GroupOwnerId;
--	INSERT INTO GroupMembers
--	SET
--		GroupId = tempId,
--		UserId = p_GroupOwnerId,
--		MemberType = "OWNER";
--END $$
--DELIMITER ;