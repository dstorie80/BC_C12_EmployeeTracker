# BC_C12_EmployeeTracker
A console app to manage an employee database

## Description

This project was created to get a better understanding of MySQL and accessing queries from within the console.

- The project was an aid to help us understand MySQL, using inquirer to run custom queries, create a database with tables, access those tables from questions within the inquirer.
- Only one index.js file was created, but two sql files were created.  A schema.sql to create the database and tables from scratch, and then a seed.sql file to populate the tables with data.




## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To pull the rep files:
1. Go to my git hub repo (https://github.com/dstorie80/BC_C12_EmployeeTracker) 
2. Click on the code button and select SSH
3. Navigate git bash to a designated folder of your chosing (CD <filepath/> [if a new folder needs to be created, you can use the mkdir command in git bash])
4. Pull the latest update from git using the clone command in git bash (git clone <repo url>)
5. Once the repo has been downloaded into the folder, you can use open vs code (code . in git bash) to open the files from the repo
6. The Main project video can be found here: https://watch.screencastify.com/v/sJMzdTR5aKPbmcPnyECX
7. A second video was created for the bonus content.  That can be found here: https://watch.screencastify.com/v/ehr4ScLjo8akEmFnOMxy



## Usage

No website was used for this project. All data is inside the index.js file which contains the inquirer data.

To access the latest repo you will need to follow this github rep link - https://github.com/dstorie80/BC_C12_EmployeeTracker.git

When node.js is started up the user will be presented with a list of options:
1. View all employees
2. View Employees by Manager
3. View Employees by Department
4. Add Employee
5. Delete Employee
6. Update Employee Role
7. Update Employee Manager
8. View All Roles
9. Add Role
10. Delete Role
11. View All Departments
12. Add Department
13. Delete Department
14. Quit

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/0ad7ccaa-baac-40b5-a930-c2a011b2079f)

Selecting option 1 will allow the user to see all the employees in the database. It will show their ID, First Name, Last Name, Tittle, Department, and Manager

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/a514ec2a-46ed-4108-a3b0-3ba77c535478)

Option 2 Will display the employees by manager.  It will first ask which manager the user would like to to see the employees for.  Once the selection is made it will show all employees for that manager.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/322914ab-a131-4cfb-b520-d35f728bd2c4)

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/548e150c-8228-4d9a-a9ac-e3650cea1287)

Option 3 will display the employees by department.  The user will first be asked which department they would like to look at.  Once the id is selected, the app will display all users for that department

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/9dfae2fa-4c15-4eb3-813f-b5023a278437)

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/12b8ee40-88a7-4df7-bb68-3ab51262c5ee)

Option 4 will start the new employee process.  It will first display the list of roles and managers.  The prompt will then ask The employee first name:

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/d41342e7-a0b6-4b7f-9a66-6f24b752ec6d)

Follwed by the Last name:

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/79a462b6-4bb9-4ad8-bba7-bc2b7069243b)

It will then ask what the role is for the new employee

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/b1de2bb9-c072-4b57-a86e-cf0da2c72722)

Followed by the manager.  Once all the data has been entered it will ask for a confirmation asking if the details are correct.  If Y is selected, the user will get entered in to the database in the employees table
and an updated employee list will be displayed.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/07c5c5ed-8442-4cbf-8d20-621365063009)

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/29b7d39b-9008-4962-954c-26cf42669e22)

Option 5 will delete an employee.  It will display a list of employees along with their IDs.  

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/77c80b9d-94d2-4fe2-81d0-0cfbb71f5e42)

Once the ID is selected the user will be asked to confirm.  If Y is selected, the employee will be removed from the employee table and the updated list will appear for the user.  If N is selected the user will be taken back to the main menu.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/fd678780-a8ef-4fff-92dd-cbba575687f5)

Option 6 updates the employee role.  When selecting this option the user will be given a list of employees along with their Ids and current roles, as well as list of the roles from the role table.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/24aeb15d-2eb9-4c10-a1dd-ad1e6cdf6489)

The user enters the employeeId and the roleId they wish to change the employee to. When entered, the user will be presented with an updated table.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/fc4ad2e7-9823-422d-b678-576578ad4bbd)

Option 7 updates the manager for an employee.  The user is presented wit hthe list of employees to select from, and the list of managers.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/ae575357-b6e9-459f-b538-5cc9e237a028)

Once the user selects the employeeId and the New ManagerId, they will be presented with an updated table.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/7004f489-ec72-4f0e-92d8-10839aab414b)

Option 8 displays all the roles for the system including RoleId, RoleName, Salary, and Department

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/ad5a95ae-2c46-4a85-999b-539c274de957)

Option 9 Allows the user to add a Role.  The user is presented with the role table, and then asked the title of the role, Salary, and the the departmentId

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/1eec87aa-c11d-42e9-b740-0b56625a3385)

Option 10 allows the user to delete a role.  The user is presented with the current roles table and asked to enter a roleId.  Once entered, the user to give confirmation they really want to delete the role.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/9adce928-b2d5-469c-9a46-1a84750f9c40)

If y is selected, the role is deleted.  If n is selected the user is taken back to the main menu.

Option 11 allows the user to see all the current departments and their Ids

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/62b38a06-56ec-4f38-9a49-5b18092242f6)

Option 12 allows the user to create a new department.  The user will be asked to add a name for the new department.  

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/4fe51b53-826f-4230-8bb8-fbf8381eee49)

Option 13 allows the user to remove a department.  When the option is selected, the user will be presented with a current list of departments, and be prompted to add the departmentId they wish to remove. They will then be prompted to confirm that they wish to delete this department.  Y will delete the department, N will take the user back to the main menu. 

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/eb5b14ab-8f25-4a7f-90f8-40b2b9096144)

Selecting option 14 will quit out of the application and take the user back to the terminal.

![image](https://github.com/dstorie80/BC_C12_EmployeeTracker/assets/149905416/80af6314-025d-4bfb-8287-7c0326ab2581)


## Credits

## License

No license used 
