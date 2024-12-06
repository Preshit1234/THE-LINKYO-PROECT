import ordersStyles from './css/recent-orders.module.css'
import OrdersPaidOrPending from './recent-orders-paid';

export default function OrderAnalytics() {
    return(
        <>
        <div>
            <div className={ ordersStyles.orderTitleClass }>
                <div className={ ordersStyles.orderTitle }>Recent Orders</div>
                <div classnName={ ordersStyles.calandar }>Jan 2024</div>
            </div>
            <div className={ ordersStyles.tableHead }>
                <div className={ ordersStyles.tableOrdersCol }>Order</div>
                <div className={ ordersStyles.tableDateCol }>Date</div>
                <div className={ ordersStyles.tableStatusCol }>Status</div>
                <div className={ ordersStyles.tableTotalCol }>Total</div>
            </div>
            <OrdersPaidOrPending type="paidOrders" />
            <OrdersPaidOrPending type="paidOrders" />
            <OrdersPaidOrPending type="pendingOrders" />
            <OrdersPaidOrPending type="pendingTableHead" />
            <OrdersPaidOrPending type="pendingTableOrders" />
        </div>
        </>
    )
}