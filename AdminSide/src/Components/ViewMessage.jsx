import React, { useEffect, useState } from "react";
import axios from "axios";

import PageHeader from "./admin/ui/PageHeader/PageHeader";
import DataCard from "./admin/ui/DataCard/DataCard";

import {
  Mail,
  User,
  MessageSquare,
} from "lucide-react";

import ViewMessageCSS from "./ViewMessage.module.css";

export const ViewMessage = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesPerPage = 10;
  const totalMessages = messages.length;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact/fetch");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const lowerSearch = searchQuery.toLowerCase();
  const filteredMessages = messages.filter((msg) =>
    (msg._id || "").toLowerCase().includes(lowerSearch) ||
    (msg.name || "").toLowerCase().includes(lowerSearch) ||
    (msg.email || "").toLowerCase().includes(lowerSearch) ||
    (msg.message || "").toLowerCase().includes(lowerSearch)
  );

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / messagesPerPage));
  const startIndex = (currentPage - 1) * messagesPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + messagesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

 return (
  <div className={ViewMessageCSS.container}>

    <PageHeader
      title="User Messages"
      subtitle="View all contact messages submitted by citizens."
    />

    <div className={ViewMessageCSS.statsCard}>
      <div className={ViewMessageCSS.statsIcon}>
        <Mail size={26} />
      </div>

      <div>
        <span>Total Messages</span>
        <h2>{totalMessages}</h2>
      </div>
    </div>

    <DataCard
      title="Search Messages"
      subtitle="Filter by ID, Name, Email or Message"
    >

      <input
        type="text"
        placeholder="Search messages..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={ViewMessageCSS.searchInput}
      />

    </DataCard>

    <DataCard
      title="Messages"
      subtitle={`${filteredMessages.length} Result(s)`}
    >

      <div className={ViewMessageCSS.tableWrapper}>

        <table className={ViewMessageCSS.messageTable}>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>

          </thead>

          <tbody>
{paginatedMessages.length > 0 ? (
  paginatedMessages.map((msg) => (
    <tr key={msg._id}>
      <td>{msg._id}</td>

      <td>
        <div className={ViewMessageCSS.userCell}>
          <User size={16} />
          <span>{msg.name}</span>
        </div>
      </td>

      <td>
        <div className={ViewMessageCSS.emailCell}>
          <Mail size={16} />
          <span>{msg.email}</span>
        </div>
      </td>

      <td>
        <div className={ViewMessageCSS.messageCell}>
          <MessageSquare size={16} />
          <span>{msg.message}</span>
        </div>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td
      colSpan="4"
      className={ViewMessageCSS.emptyState}
    >
      No messages found.
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>

      <div className={ViewMessageCSS.pagination}>

        <button
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        <div className={ViewMessageCSS.pageInfo}>
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>

      </div>

    </DataCard>

  </div>
);

};
