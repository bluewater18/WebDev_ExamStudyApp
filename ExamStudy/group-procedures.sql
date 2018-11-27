DROP VIEW IF EXISTS GroupMembersDetailed;

DROP TABLE IF EXISTS GroupMembers;
DROP TABLE IF EXISTS Groups;

DROP PROCEDURE IF EXISTS AddGroup;
DROP PROCEDURE IF EXISTS UpdateGroupImage;
DROP PROCEDURE IF EXISTS AddUserToGroup;
DROP PROCEDURE IF EXISTS GetGroupPhotoPath;
DROP PROCEDURE IF EXISTS DeleteGroup;
DROP PROCEDURE IF EXISTS GetGroupById;
DROP PROCEDURE IF EXISTS UpdateGroup;
DROP PROCEDURE IF EXISTS GetAllUsersInGroup;

CREATE TABLE IF NOT EXISTS Groups(
	GroupId INT AUTO_INCREMENT,
	GroupName VARCHAR(50) UNIQUE,
	GroupType VARCHAR(16),
	GroupOwnerId INT,
	GroupImageName VARCHAR(64),
	PRIMARY KEY (GroupId),
	CONSTRAINT FK_Owner FOREIGN KEY (GroupOwnerId) REFERENCES Users(UserId) ON DELETE CASCADE
	);


CREATE TABLE IF NOT EXISTS GroupMembers(
	GroupId INT,
	UserId INT,
	MemberType VARCHAR(16),
	PRIMARY KEY (GroupId, UserId),
	CONSTRAINT FK_GroupMember FOREIGN KEY (GroupId) REFERENCES Groups(GroupId) ON DELETE CASCADE,
	CONSTRAINT FK_UserGroup FOREIGN KEY (UserID) REFERENCES Users(UserId) ON DELETE CASCADE
);

CREATE VIEW GroupMembersDetailed AS
	SELECT U.UserName as UserName, U.UserId as UserId, G.GroupId as GroupId, G.MemberType as MemberType
	FROM Users U
	INNER JOIN GroupMembers G
	ON (U.UserId = G.UserId);

DELIMITER $$
CREATE PROCEDURE `AddGroup`(
	IN p_GroupName VARCHAR(50),
	IN p_GroupType VARCHAR(16),
	IN p_GroupOwnerId INT
)
BEGIN
	DECLARE tempId INT;
	INSERT INTO Groups
	SET
		GroupName = p_GroupName,
		GroupType = p_GroupType,
		GroupOwnerId = p_GroupOwnerId;
	SELECT GroupId INTO tempId FROM Groups WHERE GroupName = p_GroupName 
		AND GroupType = p_GroupType
		AND GroupOwnerId = p_GroupOwnerId;
	INSERT INTO GroupMembers
	SET
		GroupId = tempId,
		UserId = p_GroupOwnerId,
		MemberType = "OWNER";
	SELECT * FROM Groups
	WHERE GroupId = tempId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UpdateGroupImage`(
	IN p_GroupId INT,
	IN p_GroupImageName VARCHAR(64)
)
BEGIN
	UPDATE Groups
	SET
		GroupImageName = p_GroupImageName
	WHERE
		GroupId = p_GroupId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `AddUserToGroup`(
	IN p_GroupId INT,
	IN p_UserId INT,
	IN p_MemberType VARCHAR(1)
)
BEGIN
	INSERT INTO GroupMembers(
	SET
		GroupId = p_GroupId,
		UserId = p_UserId,
		MemberType = p_MemberType;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GetAllGroups`()
BEGIN
	SELECT * FROM Groups;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `DeleteGroup`(
	IN p_GroupId INT
)
BEGIN
	DELETE FROM Groups
	WHERE GroupId = p_GroupId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetGroupById`(
	IN p_GroupId INT
)
BEGIN
	SELECT * FROM Groups
	WHERE GroupId = p_GroupId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `UpdateGroup`(
	IN p_GroupId INT,
	IN p_GroupName VARCHAR(50),
	IN p_GroupType VARCHAR(16),
	IN p_GroupImageName VARCHAR(64),
	IN p_GroupOwnerId INT
)
BEGIN
	UPDATE Groups
	SET
	SET
		GroupName = p_GroupName,
		GroupType = p_GroupType,
		GroupOwnerId = p_GroupOwnerId
	WHERE GroupId = p_GroupId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE IF `GetAllUsersInGroup`(
	IN p_GroupId INT
)
BEGIN
	SELECT UserId, UserName, MemberType FROM GroupMembersDetailed
	WHERE GroupId = p_GroupId;
END $$
DELIMITER ;

