CREATE TABLE IF NOT EXISTS Users(
	UserId INT AUTO_INCREMENT,
	UserName VARCHAR(50),
	UserEmail VARCHAR(50),
	UserPassword VARCHAR(50),
	PRIMARY KEY (UserId)
);


DELIMITER $$

CREATE PROCEDURE `AddUser`(
    IN p_UserName varchar(50),
    IN p_UserEmail varchar(50),
    IN p_UserPassword varchar(50)
)
BEGIN
	INSERT INTO Users 
    SET 
    	UserName = p_UserName,
    	UserEmail = p_UserEmail,
    	UserPassword = p_UserPassword;
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
	IN p_UserId varchar(50)
)
BEGIN
	SELECT * FROM Users WHERE UserId = p_UserId;
END $$
DELIMITER ;

