const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
    },
    console.log('Connected to the employee_db database.')
    
);

db.connect(function (err) {
  if (err) throw err;
  // this is the ascii art splash title

        // this is the ascii art splash title
console.log(`        ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
        ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
        █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
        ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
        ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
        ╚═══████████╗██████╗═╝█████╗══██████╗██╗══██╗███████╗██████╗╝╚══════╝
            ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗        
               ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝        
               ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗        
               ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║        
               ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`)
        // run the startTracker function after the connection is successful to show prompts to user
        employeeTracker();
      });




// employeeTracker();

function employeeTracker() {
    inquirer
    .prompt({
        type: 'rawlist',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View All Employees', 
                    'View Employees by Manager',
                    'View Employees by Department',
                    'Add Employee', 
                    'Delete Employee',
                    'Update Employee Role', 
                    'Update Employee Manager', 
                    'View All Roles',
                    'Add Role', 
                    'Delete Role',
                    'View All Departments', 
                    'Add Department', 
                    'Delete Department',
                    'Quit'],
        
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                case 'View Employees by Manager':
                    viewEmployeesByManager();
                    break;
                case 'View Employees by Department':
                    viewEmployeesByDept();
                    break;
                case 'Delete Department':
                    deleteDept();
                    break;
                case 'Delete Role':
                    deleteRole();
                    break;
                case 'Delete Employee':
                    deleteEmployee();
                    break;
                case 'Quit':
                    db.end();
                    process.exit();
                    
            }
            
        });
};



// ------------------------------------------------------------------------ //
//                          View all employees                              //  
// ------------------------------------------------------------------------ //

function viewEmployees() {
    const query = `select 
	                    t1.id as 'Employee ID', 
	                    t1.first_name as 'First Name',
	                    t1.last_name as 'Last Name',
	                    t2.title as 'Title',
                        t4.name as 'Department',
	                    IFNULL(CONCAT(t3.first_name, ' ', t3.last_name), 'Manager') as 'Manager'
                    from employee t1	
	                    left join role t2 on t1.role_id = t2.id
	                    left join employee t3 on t1.manager_id = t3.id
                        left join department t4 on t2.department_id = t4.id
                    order by t1.id`
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        employeeTracker();
    });
};



// ------------------------------------------------------------------------ //
//                     View all employees by manager                        //
// ------------------------------------------------------------------------ //

const viewEmployeesByManager = () => {
    // First, display all managers (which are also employees)
    console.log('Here is the list of managers')
    db.query(`select 
	            t1.id as 'Manager ID', 
	            t1.first_name as 'First Name',
	            t1.last_name as 'Last Name',
	            t2.title as 'Title'
            from employee t1	
	            left join role t2 on t1.role_id = t2.id
	            left join employee t3 on t1.manager_id = t3.id
            where t1.manager_id is null
            order by t1.id`, function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, prompt the user for the manager ID
        inquirer
        .prompt({
            type: 'input',
            message: 'Enter the manager ID:',
            name: 'manager_id'
        })
        .then(function (answer) {
            db.query(
                `select 
                t1.id as 'Employee ID', 
                t1.first_name as 'First Name',
                t1.last_name as 'Last Name',
                t2.title  as 'Title',
                IFNULL(CONCAT(t3.first_name, ' ', t3.last_name), '') as 'Manager'
            from employee t1	
                left join role t2 on t1.role_id = t2.id
                left join employee t3 on t1.manager_id = t3.id
            WHERE t1.?
            order by t1.id `,
                {
                    manager_id: answer.manager_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    employeeTracker();
                }
            );
        });
    });
};


// ------------------------------------------------------------------------ //
//                       View employees by department                       //  
// ------------------------------------------------------------------------ //

const viewEmployeesByDept = () =>  {
    // First, display all departments
    console.log('Here is the list of departments')
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, prompt the user for the department ID
        inquirer
        .prompt({
            type: 'input',
            message: 'Enter the department ID:',
            name: 'department_id'
        })
        .then(function (answer) {
            db.query(
                `select	
                    t3.name as 'Department',
                    CONCAT(t1.first_name, ' ', t1.last_name) as 'Employee',
                    t2.title as 'Department Title',
                    t2.salary,
                    IFNULL(CONCAT(t4.first_name, ' ', t4.last_name), 'Department Manager') as 'Manager'
                from employee t1
                    inner join role t2 on t1.role_id = t2.id
                    inner join department t3 on t2.department_id = t3.id
                    left join employee t4 on t1.manager_id = t4.id
                where t3.id = ?
                order by t1.id`,
                [answer.department_id],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    employeeTracker();
                }
            );
        });
    });
};


// ------------------------------------------------------------------------ //
//                           Add a new employee                             //  
// ------------------------------------------------------------------------ //

function addEmployee() {
    // First, display all roles along with their department names
    console.log('Here is the list of roles')
    db.query(`SELECT 
                t1.id as 'Role ID', 
                t1.title as 'Role', 
                t2.name AS department,
                CASE WHEN t3.manager_id is NULL THEN 'Yes' ELSE 'No' END AS 'Is Management Role'
            FROM role t1
                LEFT JOIN department t2 ON t1.department_id = t2.id
                LEFT JOIN employee t3 on t1.id = t3.role_id`, function(err, res) {
if (err) throw err;
console.table(res);

        // Then, display all managers (which are also employees)
        console.log('Here is the list of managers')
        db.query(`SELECT 
                    t1.id as 'Manager Id',
                    CONCAT(t1.first_name, ' ', t1.last_name) as 'Manager',
                    t2.title as 'Role' 
                  FROM employee t1
                    left join role t2 on t1.role_id = t2.id
                  WHERE t1.manager_id IS NULL`, function(err, res) {
            if (err) throw err;
            console.table(res);

            // Then, prompt the user for the details of the new employee
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter the employee first name:',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'Enter the employee last name:',
                    name: 'last_name'
                },
                {
                    type: 'input',
                    message: 'Enter the new employee role ID:',
                    name: 'role_id'
                },
                {
                    type: 'input',
                    message: 'Enter the new employee manager ID:',
                    name: 'manager_id'
                }
            ])
            .then(function (answer) {
                // First, select the role and manager
                db.query(
                    'SELECT title FROM role WHERE id = ?',
                    [answer.role_id],
                    function (err, res) {
                        if (err) throw err;
                        const roleName = res[0].title;

                        db.query(
                            'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE id = ?',
                            [answer.manager_id],
                            function (err, res) {
                                if (err) throw err;
                                const managerName = res[0].manager;

                                // Show the user their inputs
                                console.log(`\nFirst Name: ${answer.first_name}`);
                                console.log(`Last Name: ${answer.last_name}`);
                                console.log(`Role: ${roleName}`);
                                console.log(`Manager: ${managerName || 'None'}\n`);

                                // Ask for confirmation
                                inquirer
                                .prompt([
                                    {
                                        type: 'confirm',
                                        message: 'Are these details correct?',
                                        name: 'confirm'
                                    }
                                ])
                                .then(function (confirmation) {
                                    if (confirmation.confirm) {
                                        db.query(
                                            'INSERT INTO employee SET ?',
                                            {
                                                first_name: answer.first_name,
                                                last_name: answer.last_name,
                                                role_id: answer.role_id,
                                                manager_id: answer.manager_id || null
                                            },
                                            function (err, res) {
                                                if (err) throw err;
                                                console.log(`Employee ${answer.first_name} ${answer.last_name} added successfully!`);
                                                employeeTracker();

                                                // New query to display the updated employee table
                                                console.log('Here is the updated list of employees:');
                                                db.query(`select 
                                                            t1.id as 'Employee ID', 
                                                            t1.first_name as 'First Name',
                                                            t1.last_name as 'Last Name',
                                                            t2.title as 'Title',
                                                            IFNULL(CONCAT(t3.first_name, ' ', t3.last_name), 'Department Manager') as 'Manager'
                                                        from employee t1	
                                                            left join role t2 on t1.role_id = t2.id
                                                            left join employee t3 on t1.manager_id = t3.id
                                                        order by t1.id`, function(err, res) {
                                                    if (err) throw err;                                                    
                                                    console.table(res);
                                                    employeeTracker();
                                                });
                                            }
                                        );
                                    } else {
                                        console.log('Starting over...');
                                        addEmployee();
                                    }
                                });
                            }
                        );
                    }
                );
            });
        });
    });
};


// ------------------------------------------------------------------------ //
//                            Delete Employee                               //  
// ------------------------------------------------------------------------ //

const deleteEmployee = () => {
    // First, display all employees with their role and manager names
    console.log('Here is the list of employees')
    db.query(`
        SELECT 
            t1.id, 
            t1.first_name, 
            t1.last_name, 
            t2.title AS role, 
            IFNULL(CONCAT(t3.first_name, ' ', t3.last_name), 'Department Manager') as 'Manager' 
        FROM employee t1 
            LEFT JOIN role t2 ON t1.role_id = t2.id 
            LEFT JOIN employee t3 ON t1.manager_id = t3.id`, 
        function(err, res) {
            if (err) throw err;
            console.table(res);


            // Then, prompt the user for the ID of the employee to delete
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter the employee ID:',
                    name: 'id'
                },
                {
                    type: 'confirm',
                    message: `You are about to permanently remove an employee from the system, are you sure you want to continue?`,
                    name: 'confirmDelete'
                }
            ])
            .then(function (answer) {
                if (answer.confirmDelete) {
                    // First, select the employee to delete
                    db.query(
                        'SELECT * FROM employee WHERE ?',
                        {
                            id: answer.id
                        },
                        function (err, res) {
                            if (err) throw err;

                            // Store the first name and last name of the employee to delete
                            const firstName = res[0].first_name;
                            const lastName = res[0].last_name;

                            // Then, delete the employee
                            db.query(
                                'DELETE FROM employee WHERE ?',
                                {
                                    id: answer.id
                                },
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(`Employee ${firstName} ${lastName} removed successfully!`);

                                    // Display the updated employee table
                                    console.log('Here is the updated list of employees')
                                    db.query(`SELECT 
                                                t1.id, 
                                                t1.first_name, 
                                                t1.last_name, 
                                                t2.title AS role, 
                                                IFNULL(CONCAT(t3.first_name, ' ', t3.last_name), 'Department Manager') as 'Manager' 
                                            FROM employee t1 
                                                LEFT JOIN role t2 ON t1.role_id = t2.id 
                                                LEFT JOIN employee t3 ON t1.manager_id = t3.id`, function(err, res) {
                                        if (err) throw err;
                                        console.table(res);
                                        employeeTracker();
                                    });
                                }
                            );
                        }
                    );
                } else {
                    console.log('Employee deletion cancelled.');
                    employeeTracker();
                }
            });
        }
    );
};




// ------------------------------------------------------------------------ //
//                          Update Employee Role                            //  
// ------------------------------------------------------------------------ //

const updateEmployeeRole = () => {
    // First, display all employees along with their roles and departments
    console.log('Here is the list of employees and their departments')
    db.query(`SELECT 
                t1.id as 'Employee ID', 
                t1.first_name as 'First Name', 
                t1.last_name as 'Last Name', 
                t2.title AS role, 
                t3.name AS department 
            FROM employee t1 
                LEFT JOIN role t2 ON t1.role_id = t2.id 
                LEFT JOIN department t3 ON t2.department_id = t3.id`, function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, display all roles along with their departments
        console.log('Here is the list of roles')
        db.query(`SELECT 
                    t1.id as 'Employee ID', 
                    t1.title  as 'Title', 
                    t2.name AS department 
                FROM role t1
                    LEFT JOIN department t2 ON t1.department_id = t2.id`, function(err, res) {
            if (err) throw err;
            console.table(res);

            // Then, prompt the user for the ID of the employee and the new role ID
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter the employee ID you want to update:',
                    name: 'employee_id'
                },
                {
                    type: 'input',
                    message: 'Enter the new role ID:',
                    name: 'role_id'
                }
            ])
            .then(function (answer) {
                // First, select the employee to update
                db.query(
                    'SELECT * FROM employee WHERE ?',
                    {
                        id: answer.employee_id
                    },
                    function (err, res) {
                        if (err) throw err;

                        // Store the first name and last name of the employee to update
                        const firstName = res[0].first_name;
                        const lastName = res[0].last_name;

                        // Then, select the new role
                        db.query(
                            'SELECT * FROM role WHERE ?',
                            {
                                id: answer.role_id
                            },
                            function (err, res) {
                                if (err) throw err;

                                // Store the title of the new role
                                const newRole = res[0].title;

                                // Then, update the employee
                                db.query(
                                    'UPDATE employee SET ? WHERE ?',
                                    [
                                        {
                                            role_id: answer.role_id
                                        },
                                        {
                                            id: answer.employee_id
                                        }
                                    ],
                                    function (err, res) {
                                        if (err) throw err;
                                        console.log(`Employee ${firstName} ${lastName} updated to role ${newRole} successfully!`);

                                        // Display the updated employee table
                                        db.query(`SELECT 
                                                    t1.id as 'Employee ID', 
                                                    t1.first_name as 'First Name', 
                                                    t1.last_name as 'Last Name', 
                                                    t2.title AS Role, 
                                                    t3.name AS department 
                                                FROM employee t1 
                                                    LEFT JOIN role t2 ON t1.role_id = t2.id 
                                                    LEFT JOIN department t3 ON t2.department_id = t3.id`, function(err, res) {
                                            if (err) throw err;
                                            console.table(res);
                                            employeeTracker();
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    });
};


// ------------------------------------------------------------------------ //
//                         Update Employee Manager                          //  
// ------------------------------------------------------------------------ //

const updateEmployeeManager = () => {
    // First, display all employees along with their roles
    console.log('Here is the list of employees and their roles')
    db.query(`SELECT 
                t1.id as 'Employee ID', 
                t1.first_name as 'First Name', 
                t1.last_name as 'Last Name', 
                t2.title AS Role 
            FROM employee t1
                LEFT JOIN role t2 ON t1.role_id = t2.id`, function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, display employees with no manager along with their roles
        console.log('Here is the list of managers')
        db.query(`SELECT 
                    t1.id as 'Employee ID', 
                    t1.first_name as 'First Name', 
                    t1.last_name as 'Last Name', 
                    t2.title AS Role 
                FROM employee t1
                    LEFT JOIN role t2 ON t1.role_id = t2.id 
                WHERE t1.manager_id IS NULL`, function(err, res) {
            if (err) throw err;
            console.table(res);

            // Then, prompt the user for the ID of the employee and the new manager ID
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter the employee ID you want to update:',
                    name: 'employee_id'
                },
                {
                    type: 'input',
                    message: 'Enter the new manager ID:',
                    name: 'manager_id'
                }
            ])
            .then(function (answer) {
                // First, select the employee to update
                db.query(
                    'SELECT * FROM employee WHERE ?',
                    {
                        id: answer.employee_id
                    },
                    function (err, res) {
                        if (err) throw err;

                        // Store the first name and last name of the employee to update
                        const firstName = res[0].first_name;
                        const lastName = res[0].last_name;

                        // Then, update the employee
                        db.query(
                            'UPDATE employee SET ? WHERE ?',
                            [
                                {
                                    manager_id: answer.manager_id
                                },
                                {
                                    id: answer.employee_id
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log(`Manager updated successfully for employee: ${firstName} ${lastName}!`);
                                employeeTracker();
                            }
                        );
                    }
                );
            });
        });
    });
};


// ------------------------------------------------------------------------ //
//                             View all Roles                               //  
// ------------------------------------------------------------------------ //

function viewRoles() {
    console.log("Viewing All Roles");
    const query = `SELECT 
                        t1.id as 'Role ID',
                        t1.title as 'Role Name',
                        t1.salary as 'Salary', 
                        t2.name as 'Department'  
                    FROM role t1
                        inner join department t2 on t1.department_id = t2.id`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        employeeTracker();
    });
};


// ------------------------------------------------------------------------ //
//                             Add a new Role                               //  
// ------------------------------------------------------------------------ //

const addRole = () => {
    // First, display all roles
    console.log('Here is the list of roles')
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, prompt the user for the details of the new role
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the title of the role:',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Enter the salary of the role:',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'Enter the department ID:',
                name: 'department_id'
            }
        ])
        .then(function (answer) {
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    employeeTracker();
                }
            );
        });
    });
};


// ------------------------------------------------------------------------ //
//                              Delete a Role                               //  
// ------------------------------------------------------------------------ //

const deleteRole = () => {
    // First, display all roles
    console.log('Here is the list of roles')
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, prompt the user for the ID of the role to delete
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the role ID:',
                name: 'id'
            },
            {
                type: 'confirm',
                message: 'You are about to permanently remove a roll from the system, are you sure you want to continue?',
                name: 'confirmDelete'
            }
        ])
        .then(function (answer) {
            if (answer.confirmDelete) {
                db.query(
                    'DELETE FROM role WHERE ?',
                    {
                        id: answer.id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('Role deleted successfully!');
                        employeeTracker();
                    }
                );
            } else {
                console.log('Role deletion cancelled.');
                employeeTracker();
            }
        });
    });
};



// ------------------------------------------------------------------------ //
//                          View all departments                            //  
// ------------------------------------------------------------------------ //

function viewDepartments() {
    const query = `SELECT 
                        id as 'Department Id',
                        name as 'Department Name' 
                   FROM department`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        employeeTracker();
    });
};


// ------------------------------------------------------------------------ //
//                          Add a new Department                            //  
// ------------------------------------------------------------------------ //

const addDepartment = () => {
    // First, display all departments
    console.log('Here is the list of departments')
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, prompt the user for the name of the new department
        inquirer
        .prompt({
            type: 'input',
            message: 'Enter the name of the new department:',
            name: 'department'
        })
        .then(function (answer) {
            db.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.department
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    employeeTracker();
                }
            );
        });
    });
};



// ------------------------------------------------------------------------ //
//                          Delete a Department                             //  
// ------------------------------------------------------------------------ //

const deleteDept = () => {
    // First, display all departments
    console.log('Here is the list of departments')
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);

        // Then, prompt the user for the ID of the department to delete
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the department ID:',
                name: 'id'
            },
            {
                type: 'confirm',
                message: 'You are about to permanently remove a department from the system, are you sure you want to continue?',
                name: 'confirmDelete'
            }
        ])
        .then(function (answer) {
            if (answer.confirmDelete) {
                db.query(
                    'DELETE FROM department WHERE ?',
                    {
                        id: answer.id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('Department deleted successfully!');

                        // Update the department_id to NULL in the role table for the deleted department
                        db.query(
                            'UPDATE role SET department_id = NULL WHERE department_id = ?',
                            [answer.id],
                            function (err, res) {
                                if (err) throw err;
                                console.log('Updated roles with deleted department.');

                                // Select all roles where department_id is NULL
                                db.query(
                                    'SELECT * FROM role WHERE department_id IS NULL',
                                    function (err, res) {
                                        if (err) throw err;
                                        console.table(res);
                                        employeeTracker();
                                    }
                                );
                            }
                        );
                    }
                );
            } else {
                console.log('Department deletion cancelled.');
                employeeTracker();
            }
        });
    });
};