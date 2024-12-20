import orderPaidStyles from './css/recent-orders-paid.module.css';
import orderPendingStyles from './css/recent-orders-pending.module.css';
import { useState, useEffect } from 'react';

export default function OrdersPaidOrPending(props){

    const [type, setType] = useState();
    useEffect (() => {
        setType(props.type);
    },[setType, props.type]);

    if (type === "paidOrders"){
    return(
        <>
            <div className={ orderPaidStyles.tableHead }>
                <div className={ orderPaidStyles.tableOrdersCol }># 1532</div>
                <div className={ orderPaidStyles.tableDateCol }>Dec 30, 10:06 AM</div>
                <div className={ orderPaidStyles.tableStatusCol }>Paid</div>
                <div className={ orderPaidStyles.tableTotalCol }>$ 329.40</div>
            </div>
        </>
    )};

    if (type === "pendingOrders"){
        return(
            <>
            <div className={ orderPendingStyles.tableHead }>
                <div className={ orderPendingStyles.tableOrdersCol }># 1531</div>
                <div className={ orderPendingStyles.tableDateCol }>December 29, 2:59 AM</div>
                <div className={ orderPendingStyles.tableStatusCol }>Pending</div>
                <div className={ orderPendingStyles.tableTotalCol }>$ 117.24</div>
            </div>
            </>
        )
    }

    if (type === "pendingTableHead"){
        return(
            <table className={ orderPendingStyles.tableOrdersHead }>
                <tr className={ orderPendingStyles.tableHeadTr }>
                    <td className={ orderPendingStyles.tableHeadTdCol }>Order</td>
                </tr>
                <tr>
                    <td className={ orderPendingStyles.tableHeadTdDate}>Date</td>
                </tr>
                <tr>
                    <td className={ orderPendingStyles.tableHeadTdStatus}>Status</td>
                </tr>
                <tr>
                    <td className={ orderPendingStyles.tableHeadTdTotal}>Total</td>
                </tr>
            </table>
        )
    }

    if (type === "pendingTableOrders"){
        return(
            <table className={ orderPendingStyles.tableOrdersHead }>
                <tr className={ orderPendingStyles.tableTr }>
                    <td className={ orderPendingStyles.tableTdCol }># 1531</td>
                </tr>
                <tr>
                    <td className={ orderPendingStyles.tableTdDate}>December 29, 2:59 AM</td>
                </tr>
                <tr>
                    <td className={ orderPendingStyles.tableTdStatus}>Pending</td>
                </tr>
                <tr>
                    <td className={ orderPendingStyles.tableTdTotal}>$ 117.24</td>
                </tr>
            </table>
        )
    }
}

