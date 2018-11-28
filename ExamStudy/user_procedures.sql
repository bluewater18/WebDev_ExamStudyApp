DROP TABLE IF EXISTS GroupMembers;
DROP TABLE IF EXISTS Groups;
DROP TABLE IF EXISTS UserTokens;
DROP TABLE IF EXISTS Users;

DROP PROCEDURE IF EXISTS AddUser;
DROP PROCEDURE IF EXISTS DeleteUser;
DROP PROCEDURE IF EXISTS GetAllUsers;
DROP PROCEDURE IF EXISTS GetUserById;
DROP PROCEDURE IF EXISTS AddUserToken;
DROP PROCEDURE IF EXISTS GetUserByToken;
DROP PROCEDURE IF EXISTS UpdateUserToken;
DROP PROCEDURE IF EXISTS GetUserByEmail;
DROP PROCEDURE IF EXISTS UpdateUserPhoto;
DROP PROCEDURE IF EXISTS GetUserPhotoPath;
DROP PROCEDURE IF EXISTS UpdateUser;

CREATE TABLE IF NOT EXISTS Users(
	UserId INT AUTO_INCREMENT,
	UserName VARCHAR(50),
	UserEmail VARCHAR(50) UNIQUE,
	UserPassword VARCHAR(256),
	UserImageName VARCHAR(64),
	PRIMARY KEY (UserId)
);

CREATE TABLE IF NOT EXISTS UserTokens(
UserId INT NOT NULL,
UserToken VARCHAR(128) NOT NULL,
KEY (UserToken),
CONSTRAINT FK_UserToken FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);



DELIMITER $$
CREATE PROCEDURE `AddUser`(
    IN p_UserName varchar(50),
    IN p_UserEmail varchar(50),
    IN p_UserPassword varchar(256)
)
BEGIN
	INSERT INTO Users 
    SET 
    	UserName = p_UserName,
    	UserEmail = p_UserEmail,
    	UserPassword = p_UserPassword,
		UserImageName = 'default_user.png';
	SELECT * from Users WHERE UserEmail = p_UserEmail;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `UpdateUserPhoto`(
	IN p_UserId INT,
	IN p_UserImageName VARCHAR(64)
)
BEGIN
	UPDATE Users
	SET
		UserImageName = p_UserImageName
	WHERE
		UserId = p_UserId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetUserPhotoPath`(
	IN p_UserId INT
)
BEGIN
	SELECT UserImageName FROM Users
	WHERE UserId = p_UserId;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `DeleteUser`(
	IN p_UserId varchar(50)
)
BEGIN
	DELETE FROM Users
	WHERE UserID = p_UserId;
END $$
DELIMITER ;


DELIMITER $$

CREATE PROCEDURE `GetAllUsers`()
BEGIN
	SELECT * FROM Users;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `GetUserById`(
	IN p_UserId int
)
BEGIN
	SELECT * FROM Users WHERE UserId = p_UserId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GetUserByEmail`(
	IN p_Email varchar(50)
)
BEGIN
	SELECT * FROM Users WHERE UserEmail = p_Email;
END $$
DELIMITER;

DELIMITER $$
CREATE PROCEDURE `AddUserToken`(
	IN p_UserId int,
	IN p_UserToken varchar(128)
)
BEGIN
	INSERT INTO UserTokens
	SET
		UserId = p_UserId,
		UserToken = p_UserToken;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GetUserByToken`(
	IN p_UserToken varchar(128)
)
BEGIN
	SELECT * FROM User WHERE UserID = (SELECT UserID from UserTokens Where UserToken = p_UserToken);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UpdateUserToken`( 
	IN p_UserId int,
	IN p_UserToken varchar(128)
)
BEGIN
	DECLARE token INT;
	SELECT COUNT(*) INTO token FROM UserTokens WHERE UserId = p_UserId;
	IF token = 0 THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'No Existing Token';
	END IF;
	IF token = 1 THEN
		UPDATE UserTokens
		SET
			UserToken = p_UserToken
		WHERE
			UserId = p_UserId;
	END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UpdateUser`(
	IN p_UserId INT,
	IN p_UserName VARCHAR(50),
	IN p_UserEmail VARCHAR(50),
	IN p_UserPassword VARCHAR(256)
)
BEGIN
	UPDATE Users
	SET
		UserName = p_UserName,
		UserEmail = p_UserEmail,
		UserPassword = p_UserPassword
	WHERE
		UserId = p_UserId;
	SELECT * FROM Users WHERE UserId = p_UserId;
END $$
DELIMITER ;