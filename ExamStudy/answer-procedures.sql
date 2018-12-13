DROP VIEW IF EXISTS AnswersDetailed;

DROP TABLE IF EXISTS Votes
DROP TABLE IF EXISTS Answers;


DROP PROCEDURE IF EXISTS AddAnswer;
DROP PROCEDURE IF EXISTS GetAnswers;
DROP PROCEDURE IF EXISTS GetAnswer;
DROP PROCEDURE IF EXISTS DeleteAnswer;
DROP PROCEDURE IF EXISTS UpdateAnswer;
DROP PROCEDURE IF EXISTS UpdateAnswerImage;
DROP PROCEDURE IF EXISTS AnswerUpvote;
DROP PROCEDURE IF EXISTS AnswerDownvote;
DROP PROCEDURE IF EXISTS AnswerUpvoteUpdate;
DROP PROCEDURE IF EXISTS AnswerDownvoteUpdate;


CREATE TABLE IF NOT EXISTS Answers(
	AnswerId INT AUTO_INCREMENT,
	AnswerTitle VARCHAR(64),
	AnswerText VARCHAR(512),
	AnswerImageName VARCHAR(64),
	QuestionId INT,
	UserId INT,
	PRIMARY KEY (AnswerId),
	CONSTRAINT FK_QuestionAnswer FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId) ON DELETE CASCADE,
	CONSTRAINT FK_UserAnswer FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
	);

CREATE TABLE IF NOT EXISTS Votes(
	AnswerId INT,
	UserId INT,
	VoteType TINYINT(1),
	PRIMARY KEY(AnswerId, UserId),
	CONSTRAINT FK_AnswerVote FOREIGN KEY (AnswerId) REFERENCES Answers(AnswerId) ON DELETE CASCADE,
	CONSTRAINT FK_UserVote FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
	);

DROP VIEW IF EXISTS AnswersDetailed;
CREATE VIEW AnswersDetailed AS
	SELECT U.UserName AS UserName, U.UserImageName AS UserImageName, A.*, COUNT(VUp.AnswerId) AS AnswerUpvotes, COUNT(VDown.AnswerId) AS AnswerDownvotes
	FROM Answers A
	LEFT JOIN Users U
	ON(U.UserId = A.UserId)
	LEFT OUTER JOIN Votes VUp
	ON(A.AnswerId = VUp.AnswerId AND VUp.VoteType = 1)
	LEFT OUTER JOIN Votes VDown
	ON(A.AnswerId = VDown.AnswerId AND VDown.VoteType = 0)
	GROUP BY AnswerId;


DELIMITER $$
CREATE PROCEDURE `AddAnswer`(
	IN p_AnswerTitle VARCHAR(64),
	IN p_AnswerText VARCHAR(512),
	IN p_AnswerImageName VARCHAR(64),
	IN p_QuestionId INT,
	IN p_UserId INT
)
BEGIN
	DECLARE tempId INT;
	INSERT INTO Answers
	SET
		AnswerTitle = p_AnswerTitle,
		AnswerText = p_AnswerText,
		AnswerImageName = p_AnswerImageName,
		QuestionId = p_QuestionId,
		UserId = p_UserId;
	SET tempId = LAST_INSERT_ID();
	SELECT * FROM AnswersDetailed
	WHERE AnswerId = tempId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetAnswers`(
	IN p_QuestionId INT
)
BEGIN
	SELECT * FROM AnswersDetailed
	WHERE QuestionId = p_QuestionId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetAnswer`(
	IN p_AnswerId INT
)
BEGIN
	SELECT * FROM AnswersDetailed
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
	IN p_AnswerTitle VARCHAR(64),
	IN p_AnswerText VARCHAR(512),
	IN p_AnswerId INT
)
BEGIN
	UPDATE Answers
	SET
		AnswerTitle = p_AnswerTitle,
		AnswerText = p_AnswerText
	WHERE
		AnswerId = p_AnswerId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `UpdateAnswerImage`(
	IN p_AnswerId INT,
	IN p_AnswerImageName VARCHAR(64)
)
BEGIN
	UPDATE Answers
	SET
		AnswerImageName = p_AnswerImageName
	WHERE
		AnswerId = p_AnswerId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `AnswerUpvote`(
	IN p_AnswerId INT,
	IN p_UserId INT
)
BEGIN
	INSERT INTO Votes
	SET
		AnswerId = p_AnswerId,
		UserId = p_UserId,
		VoteType = 1;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `AnswerDownvote`(
	IN p_AnswerId INT,
	IN p_UserId INT
)
BEGIN
	INSERT INTO Votes
	SET
		AnswerId = p_AnswerId,
		UserId = p_UserId,
		VoteType = 0;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `AnswerUpvoteUpdate`(
	IN p_AnswerId INT,
	IN p_UserId INT
)
BEGIN
	UPDATE Votes
	SET
		VoteType = 1
	WHERE
		AnswerId = p_AnswerId AND
		UserId = p_UserId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `AnswerDownvoteUpdate`(
	IN p_AnswerId INT,
	IN p_UserId INT
)
BEGIN
	UPDATE Votes
	SET
		VoteType = 0
	WHERE
		AnswerId = p_AnswerId AND
		UserId = p_UserId;
END $$
DELIMITER ;



