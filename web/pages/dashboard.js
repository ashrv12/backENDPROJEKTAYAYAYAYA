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
  const [delId, setDelId] = useState("");
  // start of add
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");

  // error message
  const [error, setError] = useState("");

  // need to fix these or add the expense and income button
  const [user_id, setUser] = useState("admin");
  const [transaction_type, setType] = useState("EXP");

  // cooking
  const [updateDatetime, setUpdatedatetime] = useState("");

  // onchanges
  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };

  const changeTime = (event) => {
    setTime(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeDesc = (event) => {
    setDesc(event.target.value);
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
      amount === null ||
      name === null ||
      desc === null ||
      datetime === null ||
      selectedOption === null ||
      amount === "" ||
      name === "" ||
      desc === "" ||
      datetime === "" ||
      selectedOption === ""
    ) {
      setError("Please fill all required fields");
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
        setError("");
        fetchTransactions();
        document.getElementById("my_modal_3").close();
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    }
  };
  const openRecordadder = () => {
    setAmount("");
    setName("");
    setDesc("");
    setDate("");
    setTime("");
    setError("");
    document.getElementById("my_modal_3").showModal();
    console.log({ transaction });
  };
  // updating transaction
  const openUpdate = (transaction) => {
    document.getElementById("my_modal_2").showModal();
    setAmount(transaction.amount);
    setName(transaction.name);
    setDesc(transaction.description);
    setEditId(transaction.id);
    // parsing the date
    const parsedDatetime = dayjs(transaction.updated_at);
    const formattedDatetime = parsedDatetime.format("YYYY/MM/DD HH:mm:ss");
    setUpdatedatetime(formattedDatetime);
  };

  const updateTransaction = async () => {
    const datetime = new Date(`${date}T${time}`);

    if (
      amount === null ||
      name === null ||
      desc === null ||
      datetime === null ||
      selectedOption === null ||
      amount === "" ||
      name === "" ||
      desc === "" ||
      datetime === "" ||
      selectedOption === ""
    ) {
      setError("Please fill all required fields");
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
        // resetting the fields
        setAmount(null);
        setName("");
        setDesc("");
        setDate("");
        setTime("");
        setUpdatedatetime(null);
        fetchTransactions();
        setEditId("");
        // resetting error message
        setError("");
        document.getElementById("my_modal_2").close();
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    }
  };

  // delete a transaction
  const openDeleteAlert = async (id) => {
    document.getElementById("my_modal_del").showModal();
    setDelId(id);
  };

  const closeAlert = () => {
    document.getElementById("my_modal_del").close();
  };

  const deleteTransaction = async () => {
    try {
      await axios.delete(`http://localhost:4000/transaction/delete/${delId}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
    document.getElementById("my_modal_del").close();
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
              onClick={openRecordadder}
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
                      onClick={() => openDeleteAlert(transaction.id)}
                      // onClick={() => deleteTransaction(transaction.id)}
                      // onClick={() => document.getElementById("my_modal_del").showModal()}
                    >
                      X
                    </button>
                    <button
                      className="btn btn-sm bg-yellow-500"
                      onClick={() => openUpdate(transaction)}
                    >
                      /\
                    </button>
                  </div>

                  <House />
                  <div>
                    <h1 className="font-bold">{transaction.name}</h1>
                    <h2 className="text-sm text-gray-500">
                      {dayjs(transaction.updated_at).format(
                        "YYYY/MM/DD HH:mm:ss Z"
                      )}
                    </h2>
                  </div>
                </div>
                <h1 className="font-bold text-cyan-900">
                  ₮{transaction.amount}
                </h1>
              </div>
            ))}
          </div>
        </div>
        {/* alert box for delete */}
        <dialog id="my_modal_del" className="modal">
          <div className="modal-box bg-red-400/0">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Are you sure you want to delete this transaction?</span>
              <div className="flex gap-x-1">
                <button
                  className="btn btn-sm btn-neutral"
                  onClick={deleteTransaction}
                >
                  Accept
                </button>
                <button className="btn btn-sm" onClick={closeAlert}>
                  Deny
                </button>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* dialog box for adding */}
        <dialog id="my_modal_3" className="modal overflow-visible">
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
                    min="1"
                    step="any"
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
                <h1 className="text-red-700">{error}</h1>
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
                    min="1"
                    step="any"
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
                <h1 className="text-red-700">{error}</h1>
                <h1 className="text-black">
                  Previous date was: {updateDatetime}
                </h1>
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
