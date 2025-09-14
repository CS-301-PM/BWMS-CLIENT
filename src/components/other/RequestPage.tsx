import React, { useState } from "react";
import RequestTable, {
  Request,
  RequestItem,
  RequestStatus,
} from "./RequestTable";

const sampleRequests: Request[] = [
  {
    requestId: "REQ001",
    blockchainId: "0xabc123",
    userId: "USR001",
    department: "IT Department",
    status: "Pending",
    items: [
      {
        id: "1",
        name: "Laptop",
        description: "Dell Latitude 5420",
        quantity: 5,
      },
      {
        id: "2",
        name: "Mouse",
        description: "Wireless Logitech",
        quantity: 10,
      },
    ],
  },
  {
    requestId: "REQ002",
    blockchainId: "0xdef456",
    userId: "USR002",
    department: "Engineering",
    status: "Approved",
    items: [
      {
        id: "3",
        name: "Screwdriver Set",
        description: "12-piece toolset",
        quantity: 3,
      },
    ],
  },
];

const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(sampleRequests);
  const [selectedItem, setSelectedItem] = useState<RequestItem | null>(null);

  const handleStatusChange = (requestId: string, nextStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.requestId === requestId ? { ...req, status: nextStatus } : req
      )
    );
  };

  const handleItemClick = (item: RequestItem) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <RequestTable
        requests={requests}
        onStatusChange={handleStatusChange}
        onItemClick={handleItemClick}
      />

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Item Details</h3>
            <p>
              <strong>Name:</strong> {selectedItem.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedItem.description}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedItem.quantity}
            </p>
            <button
              className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
