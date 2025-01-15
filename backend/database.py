import sqlite3

DB_NAME = "data.db"

def initialize_database():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()

        # Create Company Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Company (
            companyID INTEGER PRIMARY KEY,
            companyName TEXT NOT NULL,
            address TEXT,
            phoneNumber TEXT,
            email TEXT,
            taxIDNumber TEXT
        )
        """)

        # Create Employee Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Employee (
            employeeID INTEGER NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            birthday DATE,
            gender TEXT,
            phoneNumber TEXT,
            email TEXT,
            address TEXT,
            hireDate DATE,
            jobTitle TEXT,
            socialInsuranceNumber TEXT,
            departmentID INTEGER,
            PRIMARY KEY (employeeID, firstName)
        )
        """)

        # Create Department Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Department (
            departmentID INTEGER PRIMARY KEY,
            departmentName TEXT NOT NULL,
            companyID INTEGER,
            FOREIGN KEY (companyID) REFERENCES Company(companyID)
        )
        """)

        # Create BenefitAssignment Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS BenefitAssignment (
            BenefitID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            BenefitType TEXT NOT NULL,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create BenefitDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS BenefitDetails (
            EmployeeID INTEGER,
            BenefitType TEXT NOT NULL,
            BenefitCost REAL,
            BenefitStart DATE,
            BenefitExpirationDate DATE,
            PRIMARY KEY (EmployeeID, BenefitType),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create BenefitCost Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS BenefitCost (
            BenefitType TEXT PRIMARY KEY,
            BenefitCost REAL
        )
        """)

        # Create TimeSheetDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS TimeSheetDetails (
            TimeSheetID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            Date DATE,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create WorkHours Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS WorkHours (
            EmployeeID INTEGER,
            Date DATE,
            HoursWorked REAL,
            PRIMARY KEY (EmployeeID, Date),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create DeductionAssignment Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS DeductionAssignment (
            DeductionID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            DeductionType TEXT NOT NULL,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create DeductionDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS DeductionDetails (
            EmployeeID INTEGER,
            DeductionType TEXT NOT NULL,
            PayPeriod DATE,
            DeductionAmount REAL,
            PRIMARY KEY (EmployeeID, DeductionType),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create BankAccount Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS BankAccount (
            BankingInformationID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            AccountNumber TEXT NOT NULL,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create AccountDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS AccountDetails (
            EmployeeID INTEGER,
            AccountNumber TEXT NOT NULL,
            BankName TEXT,
            AccountType TEXT,
            DateAdded DATE,
            CurrencyType TEXT,
            PRIMARY KEY (EmployeeID, AccountNumber),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create SalaryAssignment Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS SalaryAssignment (
            SalaryID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            departmentID INTEGER,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID),
            FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
        )
        """)

        # Create SalaryDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS SalaryDetails (
            EmployeeID INTEGER,
            departmentID INTEGER,
            EffectiveDate DATE,
            SalaryLevel TEXT,
            EndDate DATE,
            PRIMARY KEY (EmployeeID, departmentID, EffectiveDate),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID),
            FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
        )
        """)

        # Create StatusAssignment Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS StatusAssignment (
            StatusID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create StatusDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS StatusDetails (
            EmployeeID INTEGER,
            StartDate DATE,
            EndDate DATE,
            StatusType TEXT,
            PRIMARY KEY (EmployeeID, StartDate),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create BonusAssignment Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS BonusAssignment (
            BonusID INTEGER PRIMARY KEY,
            EmployeeID INTEGER,
            BonusType TEXT NOT NULL,
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        # Create BonusDetails Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS BonusDetails (
            EmployeeID INTEGER,
            BonusType TEXT NOT NULL,
            PayPeriod DATE,
            BonusAmount REAL,
            PRIMARY KEY (EmployeeID, BonusType, PayPeriod),
            FOREIGN KEY (EmployeeID) REFERENCES Employee(employeeID)
        )
        """)

        print("Database initialized.")

if __name__ == '__main__':
    initialize_database()

