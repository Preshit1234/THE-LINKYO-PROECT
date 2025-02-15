import styles from "./index.module.css";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const PricingTable = ({ tiersDataRef }) => {
    const [productType, setProductType] = useState("onetime");
    const [tiers, setTiers] = useState(["Tier 1", "Tier 2"]);
    const [prices, setPrices] = useState({
        onetime: "",
        "Tier 1": "",
        "Tier 2": "",
    });
    const [orignalPrices, setOrignalPrices] = useState({
        onetime: "",
        "Tier 1": "",
        "Tier 2": "",
    });
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [commissionType, setCommissionType] = useState("flat");
    const [commissionRates, setCommissionRates] = useState({
        onetime: "",
        "Tier 1": "",
        "Tier 2": "",
    });
    const [totalCommission, setTotalCommission] = useState({});

    console.log("tiersDataRef", tiersDataRef.current);

    useEffect(() => {
      if (productType === "onetime") {
          // 🚀 Switching to One-Time → Remove Subscription-specific fields from frontend & backend
          setTiers((prevTiers) =>
              prevTiers.map((tier) => {
                  if (tiersDataRef.current[tier]) {
                      delete tiersDataRef.current[tier].subscriptionOnlyField; // ❌ Remove specific field
                  }
                  return tier;
              })
          );
      } else if (productType === "subscription") {
          // 🚀 Switching to Subscription → Remove One-Time specific fields
          if (tiersDataRef.current["onetime"]) {
              delete tiersDataRef.current["onetime"].oneTimeOnlyField;
          }
      }
  
      console.log("Updated tiersDataRef:", tiersDataRef.current);
  }, [productType]);
  
  const handlePaymentModelChange = (newModel) => {
      setProductType(newModel); // ✅ Triggers useEffect to update tiers
  };

  const cleanEmptyTiers = () => {
    Object.keys(tiersDataRef.current).forEach((tier) => {
        const data = tiersDataRef.current[tier];

        if (
            (!data.commissionRates || data.commissionRates === "") &&
            (!data.originalPrices || data.originalPrices === "") &&
            (!data.prices || data.prices === "") &&
            data.totalCommission === "0.00"
        ) {
            delete tiersDataRef.current[tier]; // 🚀 Remove the empty tier from backend
            console.log(`🗑️ Removed ${tier} from backend.`);
        }
    });

    console.log("Updated tiersDataRef:", tiersDataRef.current); // Debugging log
};

    // Admin-set commission charges (percentage)
    const ADMIN_COMMISSION_CHARGE = 5;

    const currencies = ["USD", "INR"];

    const handleCurrencies = (value) => {
      if (tiersDataRef.current.selectedCurrency === undefined) {
        tiersDataRef.current.selectedCurrency = "";
    }
    tiersDataRef.current.selectedCurrency = value;
  };

  const handleCommissionType = (value) => {
    if (tiersDataRef.current.commissionType === undefined) {
      tiersDataRef.current.commissionType = "";
  }
  tiersDataRef.current.commissionType = value;
};

    const addTier = () => {
        const newTier = `Tier ${tiers.length + 1}`;
        setTiers([...tiers, newTier]);
        setPrices((prev) => ({ ...prev, [newTier]: "" }));
        setCommissionRates((prev) => ({ ...prev, [newTier]: "" }));
    };

    const removeTier = () => {
        if (tiers.length > 1) {
            const lastTier = tiers[tiers.length - 1];
            const newTiers = tiers.slice(0, -1);
            const newPrices = { ...prices };
            const newCommissionRates = { ...commissionRates };
            delete orignalPrices[lastTier];
            delete newPrices[lastTier];
            delete newCommissionRates[lastTier];
            setTiers(newTiers);
            setPrices(newPrices);
            setCommissionRates(newCommissionRates);
            setTotalCommission((prev) => {
              const updatedCommission = { ...prev };
              delete updatedCommission[lastTier];
              return updatedCommission;
          });
          if (tiersDataRef.current[lastTier]) {
            delete tiersDataRef.current[lastTier];
        }
      }
    };


    const handlePriceChange = (tier, value, field) => {
        setPrices((prev) => ({
            ...prev,
            [tier]: value,
        }));
        if (tiersDataRef.current[tier] === undefined) {
          tiersDataRef.current[tier] = {};
      }
      tiersDataRef.current[tier].prices = value;
      tiersDataRef.current[tier][field] = value.trim();

    cleanEmptyTiers();
    };

    const handleOrignalPriceChange = (tier, value, field) => {
        setOrignalPrices((prev) => ({
            ...prev,
            [tier]: value,
        }));
        if (tiersDataRef.current[tier] === undefined) {
            tiersDataRef.current[tier] = {};
        }
        tiersDataRef.current[tier].originalPrices = value;
        tiersDataRef.current[tier][field] = value.trim();

        cleanEmptyTiers();
    };

    const handleCommissionRateChange = (tier, value, field) => {
        const numValue = parseFloat(value) || 0;
        const price = parseFloat(prices[tier]) || 0;
        const maxCommission = price * 0.5;

        if (commissionType === "percentage") {
            if (numValue <= 50) {
                setCommissionRates((prev) => ({
                    ...prev,
                    [tier]: value,
                }));
            }
        } else {
            const percentageEquivalent = (numValue / price) * 100;
            if (percentageEquivalent <= 50) {
                setCommissionRates((prev) => ({
                    ...prev,
                    [tier]: value,
                }));
            }
        }
        if (tiersDataRef.current[tier] === undefined) {
          tiersDataRef.current[tier] = {};
      }
      tiersDataRef.current[tier].commissionRates = value;
      tiersDataRef.current[tier][field] = value.trim();

      cleanEmptyTiers();
    };

    const calculateTotalCommission = (tier) => {
        const price = !!parseFloat(prices[tier]) ? parseFloat(prices[tier]) : 0;
        const commissionRate = parseFloat(commissionRates[tier]) || 0;
        let rateAmount;
        console.log("Calculating total commission...");
        console.log("price :", price);
        if (commissionType === "percentage") {
            rateAmount = (price * commissionRate) / 100;
        } else {
            rateAmount = commissionRate;
        }

        const chargeAmount = (price * ADMIN_COMMISSION_CHARGE) / 100;
        const totalCommissionChargesCalculated = (rateAmount + chargeAmount).toFixed(2);

        return totalCommissionChargesCalculated;
    };

        const updateCommissionForTier = (tier) => {
          if (!tier || !prices[tier]) return; 
          const commissionValue = calculateTotalCommission(tier);
          
          setTotalCommission((prev) => ({
              ...prev,
              [tier]: commissionValue,
          }));
          
          if (!tiersDataRef.current[tier]) {
              tiersDataRef.current[tier] = {};
          }
          tiersDataRef.current[tier].totalCommission = commissionValue;
      };

      useEffect(() => {
        if ("onetime") {  
            updateCommissionForTier("onetime");
        }
      }, [prices["onetime"], commissionRates["onetime"], commissionType]); 

      useEffect(() => {
        tiers.forEach((tier) => updateCommissionForTier(tier));  
    }, [tiers, prices, commissionRates, commissionType]); 
    



    return (
        <div className={styles.offerContainer}>
            <div className={styles.marginBottom}>
                <label className={styles.productTypeLabel}>Product Type:</label>
                <select
                    value={productType}
                    onChange={(e) => {
                        setProductType(e.target.value);
                        tiersDataRef.current.productType = e.target.value;
                    }}
                    className={styles.productTypeSelect}
                >
                    <option value="onetime">One-time Purchase</option>
                    <option value="subscription">Subscription</option>
                </select>
            </div>

            {productType === "subscription" && (
                <div className={styles.subscriptionContainer}>
                    <table className={styles.tableClass}>
                        <thead>
                            <tr className={styles.tableHeadColor}>
                                <th className={styles.thead}>Offer Details</th>
                                {tiers.map((tier, index) => (
                                    <th
                                        key={index}
                                        className={
                                            styles.thetd +
                                            " " +
                                            styles.tdColored
                                        }
                                    >
                                        {tier}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    className={
                                        styles.thetd + " " + styles.centreTd
                                    }
                                >
                                    Orignal Price
                                </td>
                                {tiers.map((tier, index) => (
                                    <td key={index} className={styles.thetd}>
                                        <div className={styles.gapTable}>
                                            <select
                                                value={selectedCurrency}
                                                onChange={(e) => {
                                                    setSelectedCurrency(
                                                        e.target.value
                                                    );
                                                    console.log("Select Change :")
                                                    handleCurrencies(e.target.value);
                                                }}
                                                className={
                                                    styles.currencySelect
                                                }
                                            >
                                                {currencies.map((currency) => (
                                                    <option
                                                        key={currency}
                                                        value={currency}
                                                    >
                                                        {currency}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={orignalPrices[tier]}
                                                onChange={(e) => {
                                                    handleOrignalPriceChange(
                                                        tier,
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="0.00"
                                                className={styles.priceInput}
                                            />
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                <td
                                    className={
                                        styles.thetd + " " + styles.centreTd
                                    }
                                >
                                    Offer Price
                                </td>
                                {tiers.map((tier, index) => (
                                    <td key={index} className={styles.thetd}>
                                        <div className={styles.gapTable}>
                                            <select
                                                value={selectedCurrency}
                                                onChange={(e) =>
                                                    setSelectedCurrency(
                                                        e.target.value
                                                    )
                                                }
                                                className={
                                                    styles.currencySelect
                                                }
                                            >
                                                {currencies.map((currency) => (
                                                    <option
                                                        key={currency}
                                                        value={currency}
                                                    >
                                                        {currency}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={prices[tier]}
                                                onChange={(e) =>
                                                    handlePriceChange(
                                                        tier,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className={styles.priceInput}
                                            />
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    className={
                                        styles.thetd + " " + styles.centreTd
                                    }
                                >
                                    Commission Type
                                </td>
                                <td
                                    colSpan={tiers.length}
                                    className={styles.thetd}
                                >
                                    <select
                                        value={commissionType}
                                        onChange={(e) =>{
                                            setCommissionType(e.target.value);
                                            handleCommissionType(e.target.value);}
                                        }
                                        className={styles.commissionSelect}
                                    >
                                        <option value="flat">Flat Rate</option>
                                        <option value="percentage">
                                            Percentage
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={
                                        styles.thetd + " " + styles.centreTd
                                    }
                                >
                                    Commission Rate
                                </td>
                                {tiers.map((tier, index) => (
                                    <td key={index} className={styles.thetd}>
                                        <div
                                            className={styles.tdRowCommissions}
                                        >
                                            <input
                                                type="number"
                                                value={commissionRates[tier]}
                                                onChange={(e) =>
                                                    handleCommissionRateChange(
                                                        tier,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className={styles.priceInput}
                                            />
                                            <span style={{ color: "#B7BFC7" }}>
                                                {commissionType === "percentage"
                                                    ? "%"
                                                    : selectedCurrency}
                                            </span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    className={
                                        styles.thetd + " " + styles.centreTd
                                    }
                                >
                                    Commission Charges
                                </td>
                                {tiers.map((tier, index) => (
                                    <td key={index} className={styles.thetd}>
                                        {ADMIN_COMMISSION_CHARGE}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    className={
                                        styles.thetd + " " + styles.centreTd
                                    }
                                >
                                    Total Commission
                                </td>
                                {tiers.map((tier, index) => (
                                    <td key={index} className={styles.thetd}>
                                        {selectedCurrency}{" "}
                                        {/* {calculateTotalCommission(tier)} */}
                                        <div>{totalCommission[tier] || "0.00"}</div> 
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.tierAddorRemove}>
                        <button
                            onClick={removeTier}
                            disabled={tiers.length <= 1}
                            className={styles.removeBtn}
                        >
                            <Icon
                                icon="ic:baseline-minus"
                                width="24"
                                height="24"
                            />
                            Remove Tier
                        </button>
                        <button onClick={addTier} className={styles.addTierBtn}>
                            <Icon
                                icon="ic:outline-plus"
                                width="24"
                                height="24"
                            />
                            Add Tier
                        </button>
                    </div>
                </div>
            )}

            {productType === "onetime" && (
                <div className={styles.oneTimeContainer}>
                    <div className={styles.oneTimeSelectDiv}>
                        <span className={styles.OrignalPriceDiv}>
                            Orignal Price
                        </span>
                        <div className={styles.oneTimePriceContainer}>
                            <select
                                value={selectedCurrency}
                                onChange={(e) => {
                                    setSelectedCurrency(e.target.value);
                                    handleCurrencies(e.target.value);}
                                }
                                className={styles.oneTimeSelect}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={orignalPrices["onetime"]}
                                onChange={(e) => handleOrignalPriceChange(
                                  "onetime", 
                                  e.target.value
                                  )}
                                placeholder="0.00"
                                className={styles.oneTimeInput}
                            />
                        </div>
                    </div>
                    <div className={styles.oneTimeSelectDiv}>
                        <span className={styles.OrignalPriceDiv}>
                            Offer Price
                        </span>
                        <div className={styles.oneTimePriceContainer}>
                            <select
                                value={selectedCurrency}
                                onChange={(e) =>
                                    setSelectedCurrency(e.target.value)
                                }
                                className={styles.oneTimeSelect}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={prices["onetime"]}
                                onChange={(e) => {
                                    handlePriceChange(
                                        "onetime",
                                        e.target.value
                                    );
                                }}
                                placeholder="0.00"
                                className={styles.oneTimeInput}
                            />
                        </div>
                    </div>
                    <div className={styles.commissionTypeContainer}>
                        <div className={styles.commissionTypeLabel}>
                            Commission Type
                        </div>
                        <select
                            value={commissionType}
                            onChange={(e) => {
                              setCommissionType(e.target.value);
                              handleCommissionType(e.target.value);}}
                            className={styles.commissionSelectKara}
                        >
                            <option value="flat">Flat Rate</option>
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>
                    <div className={styles.commissionRateContainer}>
                        <div className={styles.commissionTypeLabel}>
                            Commission Rate
                        </div>
                        <div className={styles.commissionSpacer}>
                            <input
                                type="number"
                                value={commissionRates["onetime"]}
                                onChange={(e) =>
                                    handleCommissionRateChange(
                                        "onetime",
                                        e.target.value
                                    )
                                }
                                placeholder="0.00"
                                className={styles.oneTimeInput}
                            />
                            <span style={{ color: "#B7BFC7" }}>
                                {commissionType === "percentage"
                                    ? "%"
                                    : selectedCurrency}
                            </span>
                        </div>
                    </div>
                    <div className={styles.commissionChargesContainer}>
                        <div className={styles.commissionTypeLabel}>
                            Linkyo Commission Charges
                        </div>
                        <div className={styles.totalCommision}>
                            {ADMIN_COMMISSION_CHARGE}%
                        </div>
                    </div>
                    <div className={styles.commissionTotalContainer}>
                        <div className={styles.commissionTypeLabel}>
                            Total Commission
                        </div>
                        <div className={styles.totalCommision}>
                          <div>
                            {selectedCurrency}{" "}
                            {/* {calculateTotalCommission("onetime")} */}

                            {/* WORKING */}
                            {/* {totalCommission["onetime"] || "0.00"} */}
                            {/* WORKING */}
                            <div>{totalCommission["onetime"] || "0.00"}</div> 

                          </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PricingTable;
