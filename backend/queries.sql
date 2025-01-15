-- 1. Company Table
CREATE TABLE Company (
    companyID INT PRIMARY KEY,
    companyName VARCHAR(255),
    address VARCHAR(255),
    phoneNumber VARCHAR(20),
    email VARCHAR(100),
    taxIDNumber VARCHAR(20)
);

-- 2. Employee Table
CREATE TABLE Employee (
    employeeID INT,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    birthday DATE,
    gender VARCHAR(10),
    phoneNumber VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    hireDate DATE,
    jobTitle VARCHAR(100),
    socialInsuranceNumber VARCHAR(20),
    departmentID INT,
    PRIMARY KEY (employeeID, firstName)
);

-- 3. Department Table
CREATE TABLE Department (
    departmentID INT PRIMARY KEY,
    departmentName VARCHAR(100),
    companyID INT,
    FOREIGN KEY (companyID) REFERENCES Company(companyID)
);

-- 4. Benefits Table (Decomposed into 3 tables)

-- BenefitAssignment Table
CREATE TABLE BenefitAssignment (
    BenefitID INT PRIMARY KEY,
    EmployeeID INT,
    BenefitType VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- BenefitDetails Table
CREATE TABLE BenefitDetails (
    EmployeeID INT,
    BenefitType VARCHAR(50),
    BenefitCost DECIMAL(10, 2),
    BenefitStart DATE,
    BenefitExpirationDate DATE,
    PRIMARY KEY (EmployeeID, BenefitType),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- BenefitCost Table
CREATE TABLE BenefitCost (
    BenefitType VARCHAR(50) PRIMARY KEY,
    BenefitCost DECIMAL(10, 2)
);

-- 5. TimeSheets Table (Decomposed into 2 tables)

-- TimeSheetDetails Table
CREATE TABLE TimeSheetDetails (
    TimeSheetID INT PRIMARY KEY,
    EmployeeID INT,
    Date DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- WorkHours Table
CREATE TABLE WorkHours (
    EmployeeID INT,
    Date DATE,
    HoursWorked DECIMAL(5, 2),
    PRIMARY KEY (EmployeeID, Date),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- 6. Deductions Table (Decomposed into 2 tables)

-- DeductionAssignment Table
CREATE TABLE DeductionAssignment (
    DeductionID INT PRIMARY KEY,
    EmployeeID INT,
    DeductionType VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- DeductionDetails Table
CREATE TABLE DeductionDetails (
    EmployeeID INT,
    DeductionType VARCHAR(50),
    PayPeriod DATE,
    DeductionAmount DECIMAL(10, 2),
    PRIMARY KEY (EmployeeID, DeductionType),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- 7. Banking Information Table (Decomposed into 2 tables)

-- BankAccount Table
CREATE TABLE BankAccount (
    BankingInformationID INT PRIMARY KEY,
    EmployeeID INT,
    AccountNumber VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- AccountDetails Table
CREATE TABLE AccountDetails (
    EmployeeID INT,
    AccountNumber VARCHAR(50),
    BankName VARCHAR(100),
    AccountType VARCHAR(50),
    DateAdded DATE,
    CurrencyType VARCHAR(20),
    PRIMARY KEY (EmployeeID, AccountNumber),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- 8. Salary Table (Decomposed into 2 tables)

-- SalaryAssignment Table
CREATE TABLE SalaryAssignment (
    SalaryID INT PRIMARY KEY,
    EmployeeID INT,
    departmentID INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);

-- SalaryDetails Table
CREATE TABLE SalaryDetails (
    EmployeeID INT,
    departmentID INT,
    EffectiveDate DATE,
    SalaryLevel VARCHAR(50),
    EndDate DATE,
    PRIMARY KEY (EmployeeID, departmentID, EffectiveDate),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);

-- 9. Status Table (Decomposed into 2 tables)

-- StatusAssignment Table
CREATE TABLE StatusAssignment (
    StatusID INT PRIMARY KEY,
    EmployeeID INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- StatusDetails Table
CREATE TABLE StatusDetails (
    EmployeeID INT,
    StartDate DATE,
    EndDate DATE,
    StatusType VARCHAR(50),
    PRIMARY KEY (EmployeeID, StartDate),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- 10. Bonus Table (Decomposed into 2 tables)

-- BonusAssignment Table
CREATE TABLE BonusAssignment (
    BonusID INT PRIMARY KEY,
    EmployeeID INT,
    BonusType VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);

-- BonusDetails Table
CREATE TABLE BonusDetails (
    EmployeeID INT,
    BonusType VARCHAR(50),
    PayPeriod DATE,
    BonusAmount DECIMAL(10, 2),
    PRIMARY KEY (EmployeeID, BonusType, PayPeriod),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
);