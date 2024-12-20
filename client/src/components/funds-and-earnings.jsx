import fundStyles from './css/funds-and-earnings.module.css';
import { useState, useEffect } from 'react';

export default function FundAndEarn(props){

    const [type, setType] = useState();
    useEffect (() => {
        setType(props.type);
    });

    if(type === "withdraw") {
        return(
            <>
            <div className={ fundStyles.fundParentClass }>
                <div className={ fundStyles.balanceClass }>
                    <div className={ fundStyles.balanceTitle }>Balance</div>
                    <div className={ fundStyles.balanceMoney }>US$ 600.00</div>
                </div>
                <div className={ fundStyles.withdrawBtnClass }>
                    <button type="button" className={ fundStyles.withdrawBtn }>Withdraw</button>
                </div>
            </div>
            </>
        );
    }

    if(type === "earnings") {
        return(
            <>
            <div className={ fundStyles.fundParentClass }>
                <div className={ fundStyles.earningClass }>
                    <div className={ fundStyles.earningTitle }>Earnings</div>
                    <div className={ fundStyles.earningMoney }>US$ 1856.00</div>
                </div>
            </div>
            </>
        )
    }
};