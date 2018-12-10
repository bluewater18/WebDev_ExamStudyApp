DROP VIEW IF EXISTS QuestionsDetailed;

DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;

DROP PROCEDURE IF EXISTS AddQuestion;
DROP PROCEDURE IF EXISTS GetQuestions;
DROP PROCEDURE IF EXISTS GetQuestion;
DROP PROCEDURE IF EXISTS DeleteQuestion;
DROP PROCEDURE IF EXISTS UpdateQuestion;


CREATE TABLE IF NOT EXISTS Questions(
	QuestionId INT AUTO_INCREMENT,
	QuestionType VARCHAR(16),
	QuestionTitle VARCHAR(64),
	QuestionText VARCHAR(512),
	QuestionImageName VARCHAR(64),
	ResourceId INT,
	UserId INT,
	PRIMARY KEY (QuestionId),
	CONSTRAINT FK_ResourceQuestion FOREIGN KEY (ResourceId) REFERENCES Resources(ResourceId) ON DELETE CASCADE,
	CONSTRAINT FK_UserQuestion FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
	);

CREATE VIEW QuestionsDetailed AS
	SELECT U.UserName AS UserName, U.UserImageName AS UserImageName, Q.*
	FROM Questions Q
	INNER JOIN Users U
	ON(U.UserId = Q.UserId);


DELIMITER $$
CREATE PROCEDURE `AddQuestion`(
	IN p_QuestionType VARCHAR(16),
	IN p_QuestionTitle VARCHAR(64),
	IN p_QuestionText VARCHAR(512),
	IN p_QuestionImageName VARCHAR(64),
	IN p_ResourceId INT,
	IN p_UserId INT
)
BEGIN
	DECLARE tempId INT;
	INSERT INTO Questions
	SET
		QuestionType = p_QuestionType,
		QuestionTitle = p_QuestionTitle,
		QuestionText = p_QuestionText,
		QuestionImageName = "default_image.png",
		ResourceId = p_ResourceId,
		UserId = p_UserId;
	SET tempId = LAST_INSERT_ID();
	SELECT * FROM Questions
	WHERE QuestionId = tempId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetQuestions`(
	IN p_ResourceId INT
)
BEGIN
	SELECT * FROM QuestionsDetailed
	WHERE ResourceId = p_ResourceId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetQuestion`(
	IN p_QuestionId INT
)
BEGIN
	SELECT * FROM Questions
	WHERE QuestionId = p_QuestionId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `DeleteQuestion`(
	IN p_QuestionId INT
)
BEGIN
	DELETE FROM Questions
	WHERE QuestionId = p_QuestionId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `UpdateQuestion`(
	IN p_QuestionType VARCHAR(16),
	IN p_QuestionTitle VARCHAR(64),
	IN p_QuestionText VARCHAR(512),
	IN p_QuestionImageName VARCHAR(64),
	IN p_QuestionId INT
)
BEGIN
	UPDATE Questions
	SET
		QuestionType = p_QuestionType,
		QuestionTitle = p_QuestionTitle,
		QuestionText = p_QuestionText,
		QuestionImageName = p_QuestionImageName
	WHERE
		QuestionId = p_QuestionId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UpdateQuestionImage`(
	IN p_QuestionId INT,
	IN p_QuestionImageName VARCHAR(64)
)
BEGIN
	UPDATE Questions
	SET
		QuestionImageName = p_QuestionImageName
	WHERE
		QuestionId = p_QuestionId;
END $$
DELIMITER ;
