import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import JobListTile from "../../../src/components/Job/JobListTile";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../../src/store/UserStore";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, { shallow: true });
vi.mock("../../../src/store/UserStore", () => ({
  useUserStore: vi.fn(),
}));

// Mock user data for the store
useUserStore.mockReturnValue({
  id: "user123",
  role: "Applicant",
});

describe("JobListTile", () => {
  const jobData = {
    _id: "1",
    managerAffilication: "nc-state-dining",
    pay: "100",
    status: "open",
    name: "Software Developer",
    type: "full-time",
  };

  afterEach(() => {
    localStorage.clear();
    mockedAxios.post.mockClear();
    mockedAxios.delete.mockClear();
  });

  it("renders job details correctly", () => {
    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Software Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/100\$\/hr/i)).toBeInTheDocument();
    expect(screen.getByText(/save job/i)).toBeInTheDocument();
  });

  it("displays toast message on save success", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });
    toast.success = vi.fn();

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    const saveButton = screen.getByText(/save job/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Job saved successfully!");
    });
  });

  it("displays toast message on unsave success", async () => {
    localStorage.setItem("savedJobs", JSON.stringify([jobData]));
    mockedAxios.delete.mockResolvedValueOnce({ data: { success: true } });
    toast.info = vi.fn();

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    const unsaveButton = screen.getByText(/unsave job/i);
    fireEvent.click(unsaveButton);

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("Job unsaved.");
    });
  });

  it("handles save job API error gracefully", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));
    toast.error = vi.fn();

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    const saveButton = screen.getByText(/save job/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to save job.");
    });
  });

  it("handles unsave job API error gracefully", async () => {
    localStorage.setItem("savedJobs", JSON.stringify([jobData]));
    mockedAxios.delete.mockRejectedValueOnce(new Error("Network error"));
    toast.error = vi.fn();

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    const unsaveButton = screen.getByText(/unsave job/i);
    fireEvent.click(unsaveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to save job.");
    });
  });

  it("loads initial saved state from local storage", () => {
    localStorage.setItem("savedJobs", JSON.stringify([jobData]));

    render(
      <MemoryRouter>
        <JobListTile data={jobData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/unsave job/i)).toBeInTheDocument();
  });
});
