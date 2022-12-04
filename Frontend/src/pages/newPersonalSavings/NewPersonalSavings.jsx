import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { plus, programTitle, loading, edit } from "../../assets";
import {
  Footer,
  Jumbotron,
  ProgramForm,
  ProgramItem,
  Wallet,
} from "../../components";
import { PERSONAL_SAVINGS_DETAILS_ROUTE } from "../../constants/routes";
import { AnnualBudgetContext } from "../../context/AnnualBudgetContext";
import { saveSavingsName } from "../../utills/localStorage";

const NewPersonalSavings = () => {
  const [items, setItems] = useState([{ key: 0, cost: 0, itemName: "" }]);
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("New Bacon Program");
  const [isEditProgramName, setIsEditProgramName] = useState(false);
  const [errorMessage, setErrorMessage]= useState("")
  const {
    viewbudget,
    removeItem,
    isLoading,
    isSetLoading,
    createBudget
  } = useContext(AnnualBudgetContext);

  const handleSavings = (e) => {
    e.preventDefault()
    try {
      if (items.length) {
        isSetLoading(true);
        createBudget(items);
      } else {
        console.log("no item added");
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  };

  const handleAddItem = () => {
    const itemWithKey = getItemWithKey(items.length);
    setItems(items.concat(itemWithKey));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const getItemWithKey = (length) => {
    const key = `k-${length}`;
    const itemWithKey = {
      key,
      cost:0,
      itemName: ''
    };

    return itemWithKey;
  };

  const handleCostInc = (key) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, cost: Number(item.cost) + 1 } : item
    );
    setItems(updatedItems);
  };

  const handleCostDec = (key) => {
    const updatedItems = items.map((item) =>
      item.key === key && Number(item.cost) > 0
        ? { ...item, cost: Number(item.cost) - 1 }
        : item
    );
    setItems(updatedItems);
  };

  const handleCostChange = (key, value) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, cost: value } : item
    );
    setItems(updatedItems);
  };
  const handleItemChange = (key, value) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, itemName: value } : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = (key) => {
    const updatedItems = items.filter((item) => item.key !== key);
    setItems(updatedItems);
  };

  const toggleEditProgramName = () => {
    setIsEditProgramName(!isEditProgramName);
  };
  const handleSaveProgramName = () => {
    saveSavingsName(programName);
    toggleEditProgramName()
  }

  return (
    <div className="flex flex-col">
      <main className="ml-[78px] mr-[66px] pt-16 mb-16">
        <div className="flex justify-between flex-wrap">
          <div className="mb-8">
            <h1 className="font-main font-bold text-[40px] leading-[52px]">
              Setup New Personal Savings
            </h1>
            <div className="flex">
              {isEditProgramName ? (
                <div>
                  <input
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    className="border-b outline-none bg-primary border-[#3940DE]"
                    placeholder="Enter name"
                  />
                </div>
              ) : (
                <h3 className="font-main font-medium text-[30px] text-[#3940DE] leading-[39.06px]">
                  {programName}
                </h3>
              )}
              {isEditProgramName ? (
                <button
                  className="outline-none ml-3"
                  onClick={handleSaveProgramName}
                >
                  Save
                </button>
              ) : (
                <button
                  className="outline-none ml-3"
                  onClick={toggleEditProgramName}
                >
                  <img src={edit} />
                </button>
              )}
            </div>
          </div>
          <Wallet />
        </div>
        <form onSubmit={handleSavings}> 
        <div className="px-[1px] py-[1px]  w-[100%] h-fit rounded-[20px] button flex flex-col items-center justify-center text-[25px] leading-[32.55px] font-bold font-main mt-16">
          <div className="bg-[#08081E] w-[100%] h-[100%] rounded-[20px] p-4">
            <div className="overflow-auto">
              <table className="w-[100%]  m-w-[450px]">
                <thead>
                  <tr>
                    <th
                      className="p-4 font-bold text-[20px] leading-6 font-main text-left"
                      colSpan={2}
                    >
                      Items
                    </th>

                    <th className="p-4 font-bold text-[20px] leading-6 font-main text-left">
                      Cost
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length ? (
                    <>
                      {items.map((item) => (
                        <ProgramItem
                          key={item.key}
                          item={item}
                          onItemChange={handleItemChange}
                          onCostDec={handleCostDec}
                          onCostInc={handleCostInc}
                          onCostChange={handleCostChange}
                          onRemove={handleRemoveItem}
                        />
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={3}>
                        <div className="text-center">
                          <Jumbotron message="No Items" />
                        </div>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
            
            </div>

            <button
              className="button py-[3px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] flex"
              onClick={handleAddItem}
              type="button"
            >
              <img src={plus} />
              <span className="ml-3">Add Item</span>
            </button>
          </div>
        </div>
        {errorMessage && (
        <p className="text-center text-[red] font-semibold leading-4 mt-2">
          {" "}
          {errorMessage}{" "}
        </p>
      )}
        <div className="flex justify-center">
          {!isLoading ? (
            <button
              className="button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]"
              // onClick={handleSavings}
            >
              Save Program
            </button>
          ) : (
            <button>
              <img src={loading} alt="Loading" />
            </button>
          )}
        </div>
        </form>
      </main>
    </div>
  );
};

export default NewPersonalSavings;
