DROP SCHEMA IF EXISTS TaskData;
CREATE SCHEMA IF NOT EXISTS TaskData;

CREATE TABLE TaskData.Task_Status (
    status_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(30) NOT NULL
)  ENGINE=INNODB;

CREATE TABLE TaskData.Tasks (
    task_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(30) NOT NULL,
    task_message TEXT NOT NULL,
    task_status_id INT NOT NULL DEFAULT 1,
    task_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_status_id)
        REFERENCES TaskData.Task_Status (status_id)
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

INSERT INTO TaskData.Task_Status (status_id, status_name) VALUES
    (1, "status1"),
    (2, "status2"),
    (3, "status3");

INSERT INTO TaskData.Tasks (task_id, task_name, task_message, task_status_id, task_date) VALUES
    (1, "Martelo de Thor", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 1, (NOW())),
    (2, "Traje de encolhimento", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 2, (NOW())),
    (3, "Escudo do Capitão América", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 3, (NOW()));

