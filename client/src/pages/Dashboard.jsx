import { motion } from "motion/react";
import { useAuthStore } from "../Store/authStore";
import { useState } from "react";
import { formatDate } from "../utils/date";

const clients = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Client Manager",
    contact: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Client Partner",
    contact: "bob@example.com",
  },
];

const employees = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    contact: "john@example.com",
  },
  {
    id: 2,
    name: "Sara Lee",
    role: "UI/UX Designer",
    contact: "sara@example.com",
  },
];

const Dashboard = () => {
  const { user, logout } = useAuthStore();

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleLogout = async () => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl w-full mx-auto mt-10 p-6 md:p-10 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-violet-400 to-blue-600 text-transparent bg-clip-text">
        Dashboard
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="md:w-3/5 space-y-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-violet-400 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.name}</p>
            <p className="text-gray-300">Email: {user.email}</p>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-violet-400 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login:</span>{" "}
              {formatDate(user.lastLogin)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-blue-600 text-white 
                font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-blue-700
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="md:w-4/5 space-y-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Client Selector
            </h3>
            <select
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
              onChange={(e) => {
                const client = clients.find(
                  (c) => c.id === parseInt(e.target.value)
                );
                setSelectedClient(client);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select a client
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

            {selectedClient && (
              <div className="mt-4 text-gray-300 space-y-1">
                <p>
                  <span className="font-bold">Name:</span> {selectedClient.name}
                </p>
                <p>
                  <span className="font-bold">Role:</span> {selectedClient.role}
                </p>
                <p>
                  <span className="font-bold">Contact:</span>{" "}
                  {selectedClient.contact}
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-400 mb-3">
              Employee Selector
            </h3>
            <select
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
              onChange={(e) => {
                const emp = employees.find(
                  (e1) => e1.id === parseInt(e.target.value)
                );
                setSelectedEmployee(emp);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select an employee
              </option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {selectedEmployee && (
              <div className="mt-4 text-gray-300 space-y-1">
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {selectedEmployee.name}
                </p>
                <p>
                  <span className="font-bold">Role:</span>{" "}
                  {selectedEmployee.role}
                </p>
                <p>
                  <span className="font-bold">Contact:</span>{" "}
                  {selectedEmployee.contact}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
