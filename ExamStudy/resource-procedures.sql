DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Resources;


DROP PROCEDURE IF EXISTS AddResource;
DROP PROCEDURE IF EXISTS GetResources;
DROP PROCEDURE IF EXISTS GetResource;
DROP PROCEDURE IF EXISTS DeleteResource;
DROP PROCEDURE IF EXISTS UpdateResource;


CREATE TABLE IF NOT EXISTS Resources(
	ResourceId INT AUTO_INCREMENT,
	ResourceName VARCHAR(50) UNIQUE,
	ResourceType VARCHAR(16),
	GroupId INT,
	PRIMARY KEY (ResourceId),
	CONSTRAINT FK_Group FOREIGN KEY (GroupId) REFERENCES Groups(GroupId) ON DELETE CASCADE
	);


DELIMITER $$
CREATE PROCEDURE `AddResource`(
	IN p_ResourceName VARCHAR(50),
	IN p_ResourceType VARCHAR(16),
	IN p_GroupId INT
)
BEGIN
	DECLARE tempId INT;
	INSERT INTO Resources
	SET
		ResourceName = p_ResourceName,
		ResourceType = p_ResourceType,
		GroupId = p_GroupId;
	SET tempId = LAST_INSERT_ID();
	SELECT * FROM Resources
	WHERE ResourceId = tempId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GetResources`(
	IN p_GroupId INT
)
BEGIN
	SELECT * FROM Resources
	WHERE GroupId = p_GroupId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetResource`(
	IN p_ResourceId INT
)
BEGIN
	SELECT * FROM Resources
	WHERE ResourceId = p_ResourceId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `DeleteResource`(
	IN p_ResourceId INT
)
BEGIN
	DELETE FROM Resources
	WHERE ResourceId = p_ResourceId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UpdateResource`(
	IN p_ResourceName VARCHAR(50),
	IN p_ResourceType VARCHAR(16),
	IN p_ResourceId INT
)
BEGIN
	UPDATE Resources
	SET
		ResourceName = p_ResourceName,
		ResourceType = p_ResourceType
	WHERE
		ResourceId = p_ResourceId;
END $$
DELIMITER ;



