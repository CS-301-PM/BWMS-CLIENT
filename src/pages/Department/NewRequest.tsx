import * as React from "react";
import InputField from "../../components/other/InputFild";
import AppButton from "../../components/other/AppButton";
import BasicSelect from "../../components/other/BasicSelector";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Link } from "react-router-dom";

type RequestObj = {
  item: string;
  quantity: number;
  priority: "low" | "medium" | "high";
  reason: string;
  from: {
    userId?: string;
    departmentName?: string;
  };
};

function NewRequest() {
  const [item, setItem] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [priority, setPriority] = React.useState<
    "low" | "medium" | "high" | ""
  >("");
  const [requesterId, setRequesterId] = React.useState("");
  const [department, setDepartment] = React.useState("Finance");

  const possibleItems = [
    { value: "A4 Books", label: "A4 Books" },
    { value: "Pens", label: "Pens" },
    { value: "Notebooks", label: "Notebooks" },
    { value: "Staplers", label: "Staplers" },
    { value: "Markers", label: "Markers" },
  ];

  const priorityLevels = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!item || !quantity || !reason || !priority || !requesterId) {
      alert("Please fill all required fields");
      return;
    }

    const newRequest: RequestObj = {
      item,
      quantity: Number(quantity),
      reason,
      priority,
      from: {
        userId: requesterId,
        departmentName: department,
      },
    };

    console.log("New Request Object:", newRequest);

    setItem("");
    setQuantity("");
    setReason("");
    setPriority("");
    setRequesterId("");
  };

  return (
    <div className="m-2">
      <RequestTableHeader subtitle="Here you can create and make a new request">
        <Link to={"/"}>
          <AppButton variant="contained" color="primary">
            All requests
          </AppButton>
        </Link>
      </RequestTableHeader>

      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <div className="">
            <BasicSelect
              label="Item Name"
              value={item}
              options={possibleItems}
              onChange={(value) => setItem(String(value))}
            />
          </div>

          <div className="">
            <InputField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="">
            <BasicSelect
              label="Priority Level"
              value={priority}
              options={priorityLevels}
              onChange={(value) =>
                setPriority(value as "low" | "medium" | "high")
              }
            />
          </div>

          <div className="">
            <InputField
              label="Reasons for Requesting"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="">
            <InputField
              label="Requester ID"
              value={requesterId}
              disabled={true}
            />
          </div>

          <div className="">
            <InputField label="Departmtnt" value={department} disabled={true} />
          </div>
        </div>

        <div className="m-2">
          <AppButton variant="contained" color="secondary" type="submit">
            Submit Request
          </AppButton>
        </div>
      </form>
    </div>
  );
}

export default NewRequest;
