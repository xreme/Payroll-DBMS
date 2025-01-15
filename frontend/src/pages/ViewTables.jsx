import { useState } from "react";
import TableDisplay from "../components/TableDisplay";
import { useParams } from "react-router";
import Tables from "../components/Tables";

const ViewTables = (props) => {
    const {view} = useParams();
    const [selectedElement, setSelectedElement] = useState(null)
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'center'
        }}>
            <h1>
                Viewing: {view}
            </h1>
            {(view == 'company') && <Tables name="Company"/>}
            {(view == 'company') && <Tables name="Department"/>}

            {(view == 'employee') && <Tables name="Employee"/>}
            {(view == 'employee') && <Tables name="DeductionAssignment" />}
            {(view == 'employee') && <Tables name="DeductionDetails" />}
            {(view == 'employee') && <Tables name="BankAccount"/>}
            {(view == 'employee') && <Tables name="AccountDetails"/>}
            {(view == 'employee') && <Tables name="SalaryAssignment"/>}
            {(view == 'employee') && <Tables name="SalaryDetails"/>}
            {(view == 'employee') && <Tables name="BonusAssignment"/>}
            {(view == 'employee') && <Tables name="BonusDetails"/>}
            {(view == 'employee') && <Tables name="StatusAssignment"/>}
            {(view == 'employee') && <Tables name="StatusDetails"/>}

            {(view == 'timesheets') && <Tables name="TimesheetDetails"/>}
            {(view == 'timesheets') && <Tables name="WorkHours"/>}
            
            {(view == 'benefits') && <Tables name="BenefitAssignment"/>}
            {(view == 'benefits') && <Tables name="BenefitDetails"/>}
            {(view == 'benefits') && <Tables name="BenefitCost"/>}
        </div>
    )
}
export default ViewTables