import { useState, useEffect } from "react";

export interface Ticket {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = "flaxnet_support_tickets";

export function useTicketStorage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const ticketsWithDates = parsed.map((ticket: any) => ({
          ...ticket,
          createdAt: new Date(ticket.createdAt),
          updatedAt: new Date(ticket.updatedAt),
        }));
        setTickets(ticketsWithDates);
      } catch (error) {
        console.error("Error loading tickets:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    }
  }, [tickets, isLoading]);

  const addTicket = (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "status">) => {
    const newTicket: Ticket = {
      ...ticket,
      id: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date() }
          : ticket
      )
    );
  };

  const getTicket = (id: string) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const getTicketsByEmail = (email: string) => {
    return tickets.filter((ticket) => ticket.email.toLowerCase() === email.toLowerCase());
  };

  return {
    tickets,
    isLoading,
    addTicket,
    updateTicket,
    getTicket,
    getTicketsByEmail,
  };
}
