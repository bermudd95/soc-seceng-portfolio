import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import ContactModule from "./ContactModule";

// 1. Mock EmailJS
vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

// 2. Mock Firebase Firestore
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => "MOCK_SERVER_TIMESTAMP"),
}));

// 3. Mock Firebase db instance
vi.mock("../firebase", () => ({
  db: {},
}));

import emailjs from "@emailjs/browser";
import { addDoc } from "firebase/firestore";

describe("ContactModule Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields and submit button correctly", () => {
    render(<ContactModule />);

    expect(screen.getByPlaceholderText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/jane.doe@company.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/acme secops inc/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/soc \/ seceng inquiry/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter details regarding project scope/i)).toBeInTheDocument();
    
    expect(
      screen.getByRole("button", { name: /dispatch telemetry/i })
    ).toBeInTheDocument();
  });

  it("submits form data to Firestore and dispatches EmailJS templates on valid submission", async () => {
    const user = userEvent.setup();

    // Mock Firestore addDoc returning a mock document ID
    vi.mocked(addDoc).mockResolvedValueOnce({ id: "DOC_ID_12345" } as any);

    // Mock EmailJS send resolving successfully
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: "OK" });

    render(<ContactModule />);

    // Fill in required fields
    await user.type(screen.getByPlaceholderText(/jane doe/i), "Alex Mercer");
    await user.type(screen.getByPlaceholderText(/jane.doe@company.com/i), "alex@secops.io");
    await user.type(screen.getByPlaceholderText(/acme secops inc/i), "CyberCorp");
    await user.type(screen.getByPlaceholderText(/soc \/ seceng inquiry/i), "Security Assessment");
    await user.type(
      screen.getByPlaceholderText(/enter details regarding project scope/i),
      "Requesting quote for SOC monitoring."
    );

    // Click submit
    await user.click(screen.getByRole("button", { name: /dispatch telemetry/i }));

    // Verify Firestore document creation
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(addDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: "Alex Mercer",
          email: "alex@secops.io",
          organization: "CyberCorp",
          subject: "Security Assessment",
          message: "Requesting quote for SOC monitoring.",
        })
      );
    });

    // Verify EmailJS triggered twice (Admin Alert + Auto-reply)
    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(2);
      expect(emailjs.send).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.objectContaining({
          record_id: "DOC_ID_12345",
          from_name: "Alex Mercer",
          from_email: "alex@secops.io",
          organization: "CyberCorp",
          subject: "Security Assessment",
          message: "Requesting quote for SOC monitoring.",
          timestamp: expect.any(String),
        }),
        expect.any(String)
      );
    });

    // Verify success banner appears and inputs are cleared
    expect(await screen.findByText(/telemetry logged & transmitted/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/jane doe/i)).toHaveValue("");
  });

  it("displays error message when Firestore or EmailJS dispatch fails", async () => {
    const user = userEvent.setup();

    // Simulate Firestore failure
    vi.mocked(addDoc).mockRejectedValueOnce(new Error("Firestore connection error"));

    render(<ContactModule />);

    await user.type(screen.getByPlaceholderText(/jane doe/i), "Alex Mercer");
    await user.type(screen.getByPlaceholderText(/jane.doe@company.com/i), "alex@secops.io");
    await user.type(screen.getByPlaceholderText(/soc \/ seceng inquiry/i), "Test Inquiry");
    await user.type(
      screen.getByPlaceholderText(/enter details regarding project scope/i),
      "Testing error handling."
    );

    await user.click(screen.getByRole("button", { name: /dispatch telemetry/i }));

    // Verify error banner is rendered
    expect(await screen.findByText(/transmission failed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/failed to store or transmit telemetry packet/i)
    ).toBeInTheDocument();
  });
});