##Description <br>
Simple crud application for Node and MySql. <br>

##Database <br>
In order to use this app, create Database i.e <br>

 USE EmployeeDB;<br>

LOCK TABLES `employee` WRITE;<br>
INSERT INTO `employee` VALUES(1, 'Gavin Cortez', 'EMP90', 265400),
							 (2, 'Quinn Fylynn', 'EMP94', 364600),
                             (3, 'Doris Wilder', 'EMP06', 316400),
                             (4, 'Hermione Butler', 'EMP965', 417500);
UNLOCK TABLES;<br>

##Stored Producures <br>
You will be required to create Store Produre called "EmployeeAddOrEdit"<br>

It will be used in Insertion and Updating of Employee DB.<br>

##run <br>
Run this program on localhost PORT: 3000 "http://localhost:3000/"