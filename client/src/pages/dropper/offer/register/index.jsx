import styles from "./index.module.css";
import React, { useState } from 'react';
import { Icon } from "@iconify/react";

const PricingTable = () => {
  const [productType, setProductType] = useState('onetime');
  const [tiers, setTiers] = useState(['Tier 1', 'Tier 2']);
  const [prices, setPrices] = useState({
    'onetime': '',
    'Tier 1': '',
    'Tier 2': ''
  });
  const [orignalPrices, setOrignalPrices] = useState({
    'onetime': '',
    'Tier 1': '',
    'Tier 2': ''
  });
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [commissionType, setCommissionType] = useState('flat');
  const [commissionRates, setCommissionRates] = useState({
    'onetime': '',
    'Tier 1': '',
    'Tier 2': ''
  });

  // Admin-set commission charges (percentage)
  const ADMIN_COMMISSION_CHARGE = 5;

  const currencies = ['USD', 'INR'];

  const addTier = () => {
    const newTier = `Tier ${tiers.length + 1}`;
    setTiers([...tiers, newTier]);
    setPrices(prev => ({...prev, [newTier]: ''}));
    setCommissionRates(prev => ({...prev, [newTier]: ''}));
  };

  const removeTier = () => {
    if (tiers.length > 1) {
      const lastTier = tiers[tiers.length - 1];
      const newTiers = tiers.slice(0, -1);
      const newPrices = {...prices};
      const newCommissionRates = {...commissionRates};
      delete newPrices[lastTier];
      delete newCommissionRates[lastTier];
      setTiers(newTiers);
      setPrices(newPrices);
      setCommissionRates(newCommissionRates);
    }
  };

  const handlePriceChange = (tier, value) => {
    setPrices(prev => ({
      ...prev,
      [tier]: value
    }));
  };

  const handleOrignalPriceChange = (tier, value) => {
    setOrignalPrices(prev => ({
      ...prev,
      [tier]: value
    }));
  };

  const handleCommissionRateChange = (tier, value) => {
    const numValue = parseFloat(value) || 0;
    const price = parseFloat(prices[tier]) || 0;
    const maxCommission = price * 0.5;

    if (commissionType === 'percentage') {
      if (numValue <= 50) {
        setCommissionRates(prev => ({
          ...prev,
          [tier]: value
        }));
      }
    } else {
      const percentageEquivalent = (numValue / price) * 100;
      if (percentageEquivalent <= 50) {
        setCommissionRates(prev => ({
          ...prev,
          [tier]: value
        }));
      }
    }
  };

  const calculateTotalCommission = (tier) => {
    const price = parseFloat(prices[tier]) || 0;
    const commissionRate = parseFloat(commissionRates[tier]) || 0;
    let rateAmount;

    if (commissionType === 'percentage') {
      rateAmount = (price * commissionRate) / 100;
    } else {
      rateAmount = commissionRate;
    }

    const chargeAmount = (price * ADMIN_COMMISSION_CHARGE) / 100;
    return (rateAmount + chargeAmount).toFixed(2);
  };

  return (
    <div className={ styles.offerContainer }>
      <div className={ styles.marginBottom }>
        <label className={ styles.productTypeLabel }>Product Type:</label>
        <select 
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className={ styles.productTypeSelect }
        >
          <option value="onetime">One-time Purchase</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>

      {productType === 'subscription' && (
        <div className={ styles.subscriptionContainer }>
          <table className={ styles.tableClass }>
            <thead>
              <tr className={ styles.tableHeadColor }>
                <th className={ styles.thead }>Offer Details</th>
                {tiers.map((tier, index) => (
                  <th key={index} className={ styles.thetd + " " + styles.tdColored }>{tier}</th>
                ))}
              </tr>
            </thead>
            <tbody>

            <tr>
              <td className={ styles.thetd + " " + styles.centreTd }>Orignal Price</td>
                {tiers.map((tier, index) => (
                  <td key={index} className={ styles.thetd }>
                    <div className={ styles.gapTable }>
                      <select 
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className={ styles.currencySelect }
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={orignalPrices[tier]}
                        onChange={(e) => handleOrignalPriceChange(tier, e.target.value)}
                        placeholder="0.00"
                        className={ styles.priceInput }
                    />
                    </div>
                  </td>
                ))}
              </tr>


              <tr>
              <td className={ styles.thetd + " " + styles.centreTd }>Offer Price</td>
                {tiers.map((tier, index) => (
                  <td key={index} className={ styles.thetd }>
                    <div className={ styles.gapTable }>
                      <select 
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className={ styles.currencySelect }
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={prices[tier]}
                        onChange={(e) => handlePriceChange(tier, e.target.value)}
                        placeholder="0.00"
                        className={ styles.priceInput }
                    />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className={ styles.thetd + " " + styles.centreTd  }>Commission Type</td>
                <td colSpan={tiers.length} className={ styles.thetd }>
                  <select
                    value={commissionType}
                    onChange={(e) => setCommissionType(e.target.value)}
                    className={ styles.commissionSelect }
                  >
                    <option value="flat">Flat Rate</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={ styles.thetd + " " + styles.centreTd  }>Commission Rate</td>
                {tiers.map((tier, index) => (
                  <td key={index} className={ styles.thetd} >
                    <div className={styles.tdRowCommissions}>

                    <input
                      type="number"
                      value={commissionRates[tier]}
                      onChange={(e) => handleCommissionRateChange(tier, e.target.value)}
                      placeholder="0.00"
                      className={ styles.priceInput }
                      /><span style={{ color : "#B7BFC7"}}>
                    {commissionType === 'percentage' ? '%' : selectedCurrency}
                    </span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className={ styles.thetd  + " " + styles.centreTd }>Commission Charges</td>
                {tiers.map((tier, index) => (
                  <td key={index} className={ styles.thetd }>
                    {ADMIN_COMMISSION_CHARGE}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className={ styles.thetd + " " + styles.centreTd }>Total Commission</td>
                {tiers.map((tier, index) => (
                  <td key={index} className={ styles.thetd }>
                    {selectedCurrency} {calculateTotalCommission(tier)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          
          <div className={ styles.tierAddorRemove }>
            <button
              onClick={removeTier}
              disabled={tiers.length <= 1}
              className={ styles.removeBtn }
            >
              <Icon icon="ic:baseline-minus" width="24" height="24" />
              Remove Tier
            </button>
            <button
              onClick={addTier}
              className={styles.addTierBtn}
            >
              <Icon icon="ic:outline-plus" width="24" height="24" />
              Add Tier
            </button>
          </div>
        </div>
      )}

      {productType === 'onetime' && (
        <div className={styles.oneTimeContainer}>
            <div className={styles.oneTimeSelectDiv}>
            <span className={styles.OrignalPriceDiv}>Orignal Price</span>
            <div className={ styles.oneTimePriceContainer}>
                <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className={styles.oneTimeSelect}
                >
                {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <input
                type="number"
                // value={orignalPrices['onetime']}
                // onChange={(e) => handleOrignalPriceChange(e.target.value)}
                placeholder="0.00"
                className={styles.oneTimeInput}
                />
            </div>
          </div>
          <div className={styles.oneTimeSelectDiv}>
            <span className={styles.OrignalPriceDiv}>Offer Price</span>
            <div className={ styles.oneTimePriceContainer}>
                <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className={styles.oneTimeSelect}
                >
                {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <input
                type="number"
                value={prices['onetime']}
                onChange={(e) => handlePriceChange('onetime', e.target.value)}
                placeholder="0.00"
                className={styles.oneTimeInput}
                />
            </div>
          </div>
          <div className={styles.commissionTypeContainer}>
            <div className={ styles.commissionTypeLabel }>Commission Type</div>
                <select
                    value={commissionType}
                    onChange={(e) => setCommissionType(e.target.value)}
                    className={ styles.commissionSelectKara }
                  > 
                  <option value="flat">Flat Rate</option>
                  <option value="percentage">Percentage</option>
                </select>
            </div>
            <div className={styles.commissionRateContainer}>
                <div className={ styles.commissionTypeLabel }>Commission Rate</div>
                    <div className={styles.commissionSpacer}>
                        <input
                            type="number"
                            value={commissionRates['onetime']}
                            onChange={(e) => handleCommissionRateChange('onetime', e.target.value)}
                            placeholder="0.00"
                            className={ styles.oneTimeInput }
                        />
                        <span style={{ color : "#B7BFC7"}}>
                        {commissionType === 'percentage' ? '%' : selectedCurrency}</span>
                </div>
            </div>
            <div className={styles.commissionChargesContainer}>
                <div className={ styles.commissionTypeLabel }>Linkyo Commission Charges</div>
                <div className={styles.totalCommision}>
                    {ADMIN_COMMISSION_CHARGE}%
                </div>
            </div>
            <div className={styles.commissionTotalContainer}>
                <div className={ styles.commissionTypeLabel }>Total Commission</div>
                <div className={styles.totalCommision}>
                    {selectedCurrency} {calculateTotalCommission('onetime')}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PricingTable;