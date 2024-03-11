import { House } from "@/assets/house";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { DashHead } from "./components/dashHead";
import dayjs from "dayjs";

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState("");
  // start of add
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [user_id, setUser] = useState("admin");
  const [transaction_type, setType] = useState("EXP");

  // onchanges
  const changeAmount = (e) => {
    setAmount(e.target.value);
  };

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const changeTime = (e) => {
    setTime(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  // user id

  // fetching everything

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = () => {
    axios.get("http://localhost:4000/transaction").then((response) => {
      setTransaction(response.data);
    });
  };

  const fetchCategories = () => {
    axios.get("http://localhost:4000/category").then((response) => {
      setCategory(response.data);
    });
  };

  // mapping categories to select

  console.log({ category });

  const options = category.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  // creating new transaction

  const newTransaction = async () => {
    const datetime = new Date(`${date}T${time}`);

    if (
      amount === undefined ||
      name === undefined ||
      desc === undefined ||
      datetime === undefined ||
      selectedOption === undefined
    ) {
      return;
    } else {
      try {
        await axios.post("http://localhost:4000/transaction/create", {
          user_id,
          amount,
          name,
          desc,
          datetime,
          selectedOption,
          transaction_type,
        });
        setAmount("");
        setName("");
        setDesc("");
        setDate("");
        setTime("");
        fetchTransactions();
        document.getElementById("my_modal_3").close();
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    }
  };

  // updating transaction
  const openUpdate = (id) => {
    document.getElementById("my_modal_2").showModal();
    setEditId(id);
  };

  const updateTransaction = async () => {
    const datetime = new Date(`${date}T${time}`);

    if (
      amount === undefined ||
      name === undefined ||
      desc === undefined ||
      datetime === undefined ||
      selectedOption === undefined
    ) {
      return;
    } else {
      try {
        await axios.put(`http://localhost:4000/transaction/update/${editId}`, {
          user_id,
          amount,
          name,
          desc,
          datetime,
          selectedOption,
          transaction_type,
        });
        setAmount("");
        setName("");
        setDesc("");
        setDate("");
        setTime("");
        fetchTransactions();
        setEditId("");
        document.getElementById("my_modal_2").close();
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    }
  };

  // delete a transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/transaction/delete/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* background color */}
      <DashHead />

      {/* background color */}
      <div className="bg-gray-100 flex-grow">
        {/* start of main area */}
        <div className="container mx-auto grid grid-cols-4 grid-rows-1 gap-2">
          <div className="mt-4 flex flex-col items-center border-[1px] rounded-lg bg-white">
            <div className="font-bold text-lg w-11/12 mt-2">
              <h1>Records</h1>
            </div>
            <button
              className="my-2 btn btn-sm font-thin rounded-full h-[32px] w-11/12 bg-blue-700 text-slate-50"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              + ADD
            </button>
          </div>
          <div className="mt-4 col-span-3">
            {/* start of transactions */}
            {transaction.map((transaction) => (
              <div className="bg-white w-full flex border rounded-xl justify-between items-center p-3 mt-1">
                <div className="flex justify-center items-center gap-x-4">
                  <div>
                    <button
                      className="btn btn-sm bg-red-500"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      X
                    </button>
                    <button
                      className="btn btn-sm bg-yellow-500"
                      onClick={() => openUpdate(transaction.id)}
                    >
                      /\
                    </button>
                  </div>

                  <House />
                  <div>
                    <h1 className="font-bold">{transaction.name}</h1>
                    <h2 className="text-sm text-gray-500">
                      {transaction.created_at}
                    </h2>
                  </div>
                </div>
                <h1 className="font-bold text-cyan-900">
                  {transaction.amount}
                </h1>
              </div>
            ))}
          </div>
        </div>
        {/* dialog box */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box max-w-4xl max-h-none">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="text-lg btn btn-sm btn-circle btn-ghost absolute right-3 top-5">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl">Add Record</h3>
            <div className="py-3 w-full h-full flex gap-x-4 border-t-[1px] mt-3">
              <div className="w-1/2">
                {/* income expense tabs */}
                <div role="tablist" className="tabs tabs-boxed">
                  <a role="tab" className="tab tab-active">
                    EXPENSE
                  </a>
                  <a role="tab" className="tab">
                    INCOME
                  </a>
                </div>
                {/* amount */}
                <div className="p-3 my-3 flex flex-col bg-gray-100 border-[1px] border-gray-300 rounded-xl">
                  <span className="font-thin text-lg">Amount</span>
                  <input
                    type="number"
                    placeholder="₮ 0.00"
                    className="placeholder:text-xl w-11/12 h-[28px] bg-gray-100"
                    value={amount}
                    onChange={changeAmount}
                  />
                </div>
                {/* category */}
                <div className="w-full">
                  <h1 className="font-thin text-lg mb-1">Category</h1>
                  <Select
                    options={options}
                    defaultValue={selectedOption}
                    onChange={(value) => setSelectedOption(value)}
                  />
                </div>
                {/* date n time */}
                <div className="flex w-full gap-x-2 my-3">
                  <div className="w-1/2">
                    <h1 className="font-thin text-lg mb-1">Set Date:</h1>
                    <input
                      className="bg-gray-100 border-[1px] border-gray-300 rounded-md p-2 w-full"
                      type="date"
                      value={date}
                      onChange={changeDate}
                    />
                  </div>
                  <div className="w-1/2">
                    <h1 className="font-thin text-lg mb-1">Time:</h1>
                    <input
                      className="bg-gray-100 border-[1px] border-gray-300 rounded-md p-2 w-full"
                      type="time"
                      value={time}
                      onChange={changeTime}
                    />
                  </div>
                </div>
                <button
                  className="my-2 btn btn-sm font-thin rounded-full h-[32px] w-full bg-blue-700 text-slate-50"
                  onClick={newTransaction}
                >
                  + ADD
                </button>
              </div>
              {/* start of second half */}
              <div className="w-1/2 flex flex-col gap-y-2">
                <div className="w-full">
                  <h1 className="font-thin text-lg mb-1">Payee</h1>
                  <input
                    className="bg-gray-100 border-[1px] border-gray-300 rounded-md w-full p-3"
                    placeholder="Enter Name of Payee"
                    type="text"
                    value={name}
                    onChange={changeName}
                  />
                </div>
                <div className="w-full h-full mb-2">
                  <h1 className="font-thin text-lg mb-1">Note</h1>
                  <textarea
                    className="w-full h-full bg-gray-100 p-3 border-[1px] border-gray-300 rounded-md"
                    placeholder="Description"
                    rows="5"
                    cols="30"
                    value={desc}
                    onChange={changeDesc}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </dialog>
        {/* update dialog box */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box max-w-4xl max-h-none">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="text-lg btn btn-sm btn-circle btn-ghost absolute right-3 top-5">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl">Update Record</h3>
            <div className="py-3 w-full h-full flex gap-x-4 border-t-[1px] mt-3">
              <div className="w-1/2">
                {/* income expense tabs */}
                <div role="tablist" className="tabs tabs-boxed">
                  <a role="tab" className="tab tab-active">
                    EXPENSE
                  </a>
                  <a role="tab" className="tab">
                    INCOME
                  </a>
                </div>
                {/* amount */}
                <div className="p-3 my-3 flex flex-col bg-gray-100 border-[1px] border-gray-300 rounded-xl">
                  <span className="font-thin text-lg">Amount</span>
                  <input
                    type="number"
                    placeholder="₮ 0.00"
                    className="placeholder:text-xl w-11/12 h-[28px] bg-gray-100"
                    value={amount}
                    onChange={changeAmount}
                  />
                </div>
                {/* category */}
                <div className="w-full">
                  <h1 className="font-thin text-lg mb-1">Category</h1>
                  <Select
                    options={options}
                    defaultValue={selectedOption}
                    onChange={(value) => setSelectedOption(value)}
                  />
                </div>
                {/* date n time */}
                <div className="flex w-full gap-x-2 my-3">
                  <div className="w-1/2">
                    <h1 className="font-thin text-lg mb-1">Set Date:</h1>
                    <input
                      className="bg-gray-100 border-[1px] border-gray-300 rounded-md p-2 w-full"
                      type="date"
                      value={date}
                      onChange={changeDate}
                    />
                  </div>
                  <div className="w-1/2">
                    <h1 className="font-thin text-lg mb-1">Time:</h1>
                    <input
                      className="bg-gray-100 border-[1px] border-gray-300 rounded-md p-2 w-full"
                      type="time"
                      value={time}
                      onChange={changeTime}
                    />
                  </div>
                </div>
                <button
                  className="my-2 btn btn-sm font-thin rounded-full h-[32px] w-full bg-blue-700 text-slate-50"
                  onClick={updateTransaction}
                >
                  Update
                </button>
              </div>
              {/* start of second half */}
              <div className="w-1/2 flex flex-col gap-y-2">
                <div className="w-full">
                  <h1 className="font-thin text-lg mb-1">Payee</h1>
                  <input
                    className="bg-gray-100 border-[1px] border-gray-300 rounded-md w-full p-3"
                    placeholder="Enter Name of Payee"
                    type="text"
                    value={name}
                    onChange={changeName}
                  />
                </div>
                <div className="w-full h-full mb-2">
                  <h1 className="font-thin text-lg mb-1">Note</h1>
                  <textarea
                    className="w-full h-full bg-gray-100 p-3 border-[1px] border-gray-300 rounded-md"
                    placeholder="Description"
                    rows="5"
                    cols="30"
                    value={desc}
                    onChange={changeDesc}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
