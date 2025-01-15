from flask import Flask, jsonify, request
import sqlite3
from database import initialize_database

app = Flask(__name__)
DB_NAME = "data.db"
@app.route('/api/drop_all_tables', methods=['DELETE'])
def drop_all_tables():
    tables = ["Company", "Employee", "Department", "BenefitAssignment", "BenefitDetails", "BenefitCost", "TimeSheetDetails", "WorkHours", "DeductionAssignment", "DeductionDetails", "BankAccount", "AccountDetails", "SalaryAssignment", "SalaryDetails", "StatusAssignment", "StatusDetails", "BonusAssignment", "BonusDetails"]
    
    conn = get_db_connection()
    try:
        for table in tables:
            conn.execute(f"DROP TABLE IF EXISTS {table}")
        conn.commit()
        conn.close()
        return {"message": "All tables dropped successfully!"}, 200
    except sqlite3.OperationalError as e:
        conn.close()
        return {"message": f"Error dropping tables: {str(e)}"}, 400

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/data', methods=['GET'])
def get_data():
    table_name = request.args.get('table_name')  # Extract table name from query parameter
    
    if not table_name:
        return {"message": "Missing table_name in the query parameters."}, 400

    conn = get_db_connection()
    try:
        data = conn.execute(f"SELECT * FROM {table_name}").fetchall()
        conn.close()
        return jsonify([dict(row) for row in data])
    except sqlite3.OperationalError:
        conn.close()
        return {"message": f"Table {table_name} does not exist."}, 400

@app.route('/api/data', methods=['POST'])
def add_data():
    request_data = request.json
    table_name = request_data.get('table_name')
    fields_data = request_data.get('fields')
    
    if not table_name or not fields_data:
        return {"message": "Missing table_name or fields in the request body."}, 400

    columns = ", ".join(fields_data.keys())
    placeholders = ", ".join("?" for _ in fields_data)
    values = tuple(fields_data.values())
    
    conn = get_db_connection()
    try:
        conn.execute(f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})", values)
        conn.commit()
        conn.close()
        return {"message": f"Data added to {table_name} successfully!"}, 201
    except sqlite3.OperationalError:
        conn.close()
        return {"message": f"Table {table_name} does not exist or invalid data provided."}, 400

@app.route('/api/table', methods=['DELETE'])
def drop_table():
    request_data = request.json
    table_name = request_data.get('table_name')
    
    if not table_name:
        return {"message": "Missing table_name in the request body."}, 400

    conn = get_db_connection()
    try:
        conn.execute(f"DROP TABLE IF EXISTS {table_name}")
        conn.commit()
        conn.close()
        return {"message": f"Table {table_name} dropped successfully!"}, 200
    except sqlite3.OperationalError:
        conn.close()
        return {"message": f"Error dropping table {table_name}."}, 400

@app.route('/api/reinitialize', methods=['POST'])
def reinitialize_database():
    try:
        initialize_database()
        return {"message": "Database reinitialized successfully!"}, 200
    except Exception as e:
        return {"message": f"Error reinitializing database: {str(e)}"}, 500
    
@app.route('/api/sql', methods=['POST'])
def execute_sql():
    request_data = request.json
    query = request_data.get('query')

    if not query:
        return {"message": "No SQL query provided."}, 400

    conn = get_db_connection()
    try:
        cursor = conn.execute(query)
        conn.commit()  # Commit changes for commands like INSERT, UPDATE, DELETE, DROP, etc.

        # Check if the query returned any data (e.g., SELECT)
        if cursor.description:  
            result = cursor.fetchall()
            conn.close()
            return jsonify([dict(row) for row in result])  # Return query result as JSON
        else:
            conn.close()
            return {"message": "SQL command executed successfully."}, 200  # For non-query commands
    except sqlite3.Error as e:
        conn.close()
        return {"message": f"SQL execution error: {str(e)}"}, 400
    
@app.route('/api/populate', methods=['POST'])
def populate_database():
    # Dummy data for populating tables
    try:
        conn = get_db_connection()

        # Company table
        conn.execute('''INSERT INTO Company (companyID, companyName, address, phoneNumber, email, taxIDNumber)
                        VALUES (1, "TechCorp", "123 Tech Ave", "123-456-7890", "contact@techcorp.com", "TX12345")''')
        
        conn.execute('''INSERT INTO Company (companyID, companyName, address, phoneNumber, email, taxIDNumber)
                        VALUES (2, "Test2", "123 Tech Ave", "123-456-7890", "contact@techcorp.com", "TX12345")''')
        
        # Employee table
        conn.execute('''INSERT INTO Employee (employeeID, firstName, lastName, birthday, gender, phoneNumber, email, address, hireDate, jobTitle, socialInsuranceNumber, departmentID)
                        VALUES (1, "John", "Doe", "1990-01-01", "Male", "987-654-3210", "johndoe@techcorp.com", "456 Tech St", "2015-06-01", "Software Engineer", "SI123456", 1)''')

        # Department table
        conn.execute('''INSERT INTO Department (departmentID, departmentName, companyID)
                        VALUES (1, "Engineering", 1)''')

        # BenefitAssignment table
        conn.execute('''INSERT INTO BenefitAssignment (BenefitID, EmployeeID, BenefitType)
                        VALUES (1, 1, "Health Insurance")''')

        # BenefitDetails table
        conn.execute('''INSERT INTO BenefitDetails (EmployeeID, BenefitType, BenefitCost, BenefitStart, BenefitExpirationDate)
                        VALUES (1, "Health Insurance", 500.00, "2023-01-01", "2024-01-01")''')

        # BenefitCost table
        conn.execute('''INSERT INTO BenefitCost (BenefitType, BenefitCost)
                        VALUES ("Health Insurance", 500.00)''')

        # TimeSheetDetails table
        conn.execute('''INSERT INTO TimeSheetDetails (TimeSheetID, EmployeeID, Date)
                        VALUES (1, 1, "2023-11-01")''')

        # WorkHours table
        conn.execute('''INSERT INTO WorkHours (EmployeeID, Date, HoursWorked)
                        VALUES (1, "2023-11-01", 8)''')

        # DeductionAssignment table
        conn.execute('''INSERT INTO DeductionAssignment (DeductionID, EmployeeID, DeductionType)
                        VALUES (1, 1, "Tax Deduction")''')

        # DeductionDetails table
        conn.execute('''INSERT INTO DeductionDetails (EmployeeID, DeductionType, PayPeriod, DeductionAmount)
                        VALUES (1, "Tax Deduction", "2023-11-01", 150.00)''')

        # BankAccount table
        conn.execute('''INSERT INTO BankAccount (BankingInformationID, EmployeeID, AccountNumber)
                        VALUES (1, 1, "987654321")''')

        # AccountDetails table
        conn.execute('''INSERT INTO AccountDetails (EmployeeID, AccountNumber, BankName, AccountType, DateAdded, CurrencyType)
                        VALUES (1, "987654321", "Bank of TechCorp", "Checking", "2020-01-01", "USD")''')

        # SalaryAssignment table
        conn.execute('''INSERT INTO SalaryAssignment (SalaryID, EmployeeID, departmentID)
                        VALUES (1, 1, 1)''')

        # SalaryDetails table
        conn.execute('''INSERT INTO SalaryDetails (EmployeeID, departmentID, EffectiveDate, SalaryLevel, EndDate)
                        VALUES (1, 1, "2023-01-01", "Level 3", "2024-01-01")''')

        # StatusAssignment table
        conn.execute('''INSERT INTO StatusAssignment (StatusID, EmployeeID)
                        VALUES (1, 1)''')

        # StatusDetails table
        conn.execute('''INSERT INTO StatusDetails (EmployeeID, StartDate, EndDate, StatusType)
                        VALUES (1, "2023-01-01", "2023-12-31", "Active")''')

        # BonusAssignment table
        conn.execute('''INSERT INTO BonusAssignment (BonusID, EmployeeID, BonusType)
                        VALUES (1, 1, "Annual Bonus")''')

        # BonusDetails table
        conn.execute('''INSERT INTO BonusDetails (EmployeeID, BonusType, PayPeriod, BonusAmount)
                        VALUES (1, "Annual Bonus", "2023-12-31", 2000.00)''')

        conn.commit()
        conn.close()

        return jsonify({"message": "Database populated successfully!"}), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Error populating database: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)

