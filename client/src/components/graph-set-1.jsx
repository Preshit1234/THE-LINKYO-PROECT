import styles from './css/GraphSet1.module.css';
import LineChart from './line-chart';

export default function GraphSet1() {

    return (
        <div className={styles.container}>
            <div className={styles.containerCol1}>
                <div className={styles.graph1Row1}>
                    <div className={styles.div1}>
                        <span className={styles.revenueLabel}>Total Revenue</span>
                        <div className={styles.div2}>
                            <span className={styles.span1}>
                                $<span className={styles.revenueAmount1}>240.8</span>K
                            </span>
                            <div className={styles.chip1}>
                                <span className={styles.percentage1Amount}>24.6%</span>
                                <img src="" alt="Percentage increase or decrease icon" />
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.div3}>
                        <div className={styles.legend1}>
                            <img src="" alt="Revenue Indicator Icon" />
                            <span>Revenue</span>
                        </div>
                        <div className={styles.legend2}>
                            <img src="" alt="Expenses Indicator Icon" />
                            <span>Expenses</span>
                        </div>
                        <div className={styles.calender}>
                            <img src="" alt="Date range picker Icon" />
                            <div className={styles.dateRangeLabel}>
                                <span className={styles.date1Label}>Jan 2024</span> - <span className={styles.date2Label}>Dec 2024</span>
                            </div>
                            <img src="" alt="Dropdown Icon" />
                        </div>
                    </div>
                </div>
                <div className={styles.graph1Row2}>
                    <LineChart />
                </div>
            </div>
            <div className={styles.containerCol2}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}