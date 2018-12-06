DROP TABLE IF EXISTS Answers;

DROP PROCEDURE IF EXISTS AddAnswer;
DROP PROCEDURE IF EXISTS GetAnswers;
DROP PROCEDURE IF EXISTS GetAnswer;
DROP PROCEDURE IF EXISTS DeleteAnswer;
DROP PROCEDURE IF EXISTS UpdateAnswer;
DROP PROCEDURE IF EXISTS AnswerUpvote;
DROP PROCEDURE IF EXISTS AnswerDownvote;


CREATE TABLE IF NOT EXISTS Answers(
	AnswerId INT AUTO_INCREMENT,
	AnswerType VARCHAR(16),
	AnswerTitle VARCHAR(64),
	AnswerText VARCHAR(512),
	AnswerImageName VARCHAR(64),
	AnswerUpvotes INT,
	AnswerDownvotes INT,
	QuestionId INT,
	UserId INT,
	PRIMARY KEY (AnswerId),
	CONSTRAINT FK_QuestionAnswer FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId) ON DELETE CASCADE,
	CONSTRAINT FK_UserAnswer FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
	);


DELIMITER $$
CREATE PROCEDURE `AddAnswer`(
	IN p_AnswerType VARCHAR(16),
	IN p_AnswerTitle VARCHAR(64),
	IN p_AnswerTtext VARCHAR(512),
	IN p_AnswerImageName VARCHAR(64),
	IN p_QuestionId INT,
	IN p_UserId INT
)
BEGIN
	DECLARE tempId INT;
	INSERT INTO Answers
	SET
		AnswerType = p_AnswerType,
		AnswerTitle = p_AnswerTitle,
		AnswerText = p_AnswerText,
		AnswerImageName = p_AnswerImageName,
		AnswerUpvotes = 0,
		AnswerDownvotes = 0,
		QuestionId = p_QuestionId,
		UserId = p_UserId;
	SET tempId = LAST_INSERT_ID();
	SELECT * FROM Answers
	WHERE AnswerId = tempId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetAnswers`(
	IN p_QuestionId INT
)
BEGIN
	SELECT * FROM Answers
	WHERE QuestionId = p_QuestionId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetAnswer`(
	IN p_AnswerId INT
)
BEGIN
	SELECT * FROM Answers
	WHERE AnswerId = p_AnswerId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `DeleteAnswer`(
	IN p_AnswerId INT
)
BEGIN
	DELETE FROM Answers
	WHERE AnswerId = p_AnswerId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `UpdateAnswer`(
	IN p_AnswerType VARCHAR(16),
	IN p_AnswerTitle VARCHAR(64),
	IN p_AnswerTtext VARCHAR(512),
	IN p_AnswerImageName VARCHAR(64),
	IN p_AnswerId INT
)
BEGIN
	UPDATE Answers
	SET
		AnswerType = p_AnswerType,
		AnswerTitle = p_AnswerTitle,
		AnswerText = p_AnswerText,
		AnswerImageName = p_AnswerImageName
	WHERE
		AnswerId = p_AnswerId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `AnswerUpvote`(
	IN p_AnswerId INT
)
BEGIN
	UPDATE Answers
	SET
		AnswerUpvotes = AnswerUpvotes+1
	WHERE
		AnswerId = p_AnswerId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `AnswerDownvote`(
	IN p_AnswerInt INT
)
BEGIN
	UPDATE Answers
	SET
		AnswerDownvotes = AnswerDownvotes+1
	WHERE
		AnswerId = p_AnswerId;
END $$
DELIMITER ;



