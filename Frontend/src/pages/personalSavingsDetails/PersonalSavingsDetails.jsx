import React, { useState, useContext, useEffect } from "react";
import { loading, viewReport } from "../../assets";
import {
  DepositForm,
  Jumbotron,
  Modal,
  OVerlay,
  ProgramItem,
  ProgressBar,
  Wallet,
} from "../../components";
import { AnnualBudgetContext } from "../../context/AnnualBudgetContext";

const PersonalSavingsDetails = () => {
  const {
    viewbudget,
    removeItem,
    isLoading,
    getUnLockTime,
    deposit,
    contractBalance,
  } = useContext(AnnualBudgetContext);
  const [items, setItems] = useState([]);
  const [unlockTime, setUnlockTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDepositForm, setShowDepositForm] = useState(false);

  useEffect(() => {
    (async () => {
      const items = await viewbudget();
      if (items) {
        const formatedItems = items.map((item) => ({
          itemName: item.item,
          cost: item.maticAmount.toString(),
          key: item.ID,
        }));
        setItems(formatedItems);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const time = await getUnLockTime();
      setUnlockTime(time);
    })();
  }, []);

  // console.log(unlockTime, "time");

  const removeOneItem = (id) => {
    const updatedItems = items.filter((item) => item.key != id);
    setItems(updatedItems);
  };
  const handleRemove = async (id) => {
    await removeItem(id);
    removeOneItem(id);
  };
  const getTotalItemCost = (items) => {
    return items.reduce((acc, curr) => acc + parseInt(curr.cost), 0);
  };
  const calculateGoalPercentage = (value, totalValue) => {
    const percentage = (parseInt(value) / parseInt(totalValue)) * 100;

    return percentage.toFixed(2)
  };
  const handleDeposit = async (amount) => {
    setErrorMessage("");

    try {
      await deposit(amount);
      toggleDeposit();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const toggleDeposit = () => {
    setShowDepositForm(!showDepositForm);
  };
  return (
    <div className="flex flex-col">
      <main className="ml-[78px] mr-[66px] pt-16 mb-auto mb-16">
        <div className="flex justify-between flex-wrap">
          <div className="mb-4">
            <h1 className="font-main font-bold text-[40px] leading-[52px]">
              Savings Program Name
            </h1>
            <img src={viewReport} />
          </div>
          <Wallet />
        </div>
        <div className="px-[1px] py-[1px]  w-[100%] h-fit rounded-[20px] button flex flex-col items-center justify-center text-[25px] leading-[32.55px] font-bold font-main mt-16">
          <div className="bg-[#08081E] w-[100%] h-[100%] rounded-[20px] p-4">
            <div className="overflow-auto">
              {isLoading && !showDepositForm ? (
                <div className="w-[100%] flex justify-center items-center">
                  <img src={loading} alt="" />
                </div>
              ) : (
                <table className="w-[100%]  m-w-[450px]">
                  <thead>
                    <tr>
                      <th
                        className="p-4 font-bold text-[20px] leading-6 font-main text-left"
                        colSpan={2}
                      >
                        Item
                      </th>
                      <th className="p-4 font-bold text-[20px] leading-6 font-main text-left">
                        Cost
                      </th>
                      <th className="p-4 font-bold text-[20px] leading-6 font-main text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!items.length ? (
                      <tr>
                        <td></td>
                        <td className="text-center" colSpan={2}>
                          <div className="text-center">
                            <Jumbotron message="No Items" />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {items.map((item) => (
                          <ProgramItem
                            key={item.key}
                            item={item}
                            editable={false}
                            onRemove={handleRemove}
                          />
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="mt-[40px]">
          <ProgressBar
            completed={calculateGoalPercentage(
              parseInt(contractBalance || 0),
              getTotalItemCost(items)
            )}
            bgcolor="red"
          />
        </div>

        <div className="flex mt-2">
          <p className="font-normal text-[16px] font-main leading-6">
            Savings Goal:{" "}
            {calculateGoalPercentage(
              parseInt(contractBalance || 0),
              getTotalItemCost(items)
            )}
            % of ({getTotalItemCost(items)} Matic)
          </p>{" "}
          <p className="font-normal text-[16px] font-main leading-6 ml-20">
            Time Left: 3 months, 12 Days
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-4">
            <button
              className="button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]"
              onClick={toggleDeposit}
              disabled={isLoading}
            >
              Deposit
            </button>
            <button className="button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]">
              Widthraw
            </button>
          </div>
        </div>
        {showDepositForm && (
          <Modal title="Deposit Funds" onClose={toggleDeposit}>
            <DepositForm
              onSubmit={handleDeposit}
              errorMessage={errorMessage}
              isLoading={isLoading}
            />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default PersonalSavingsDetails;
