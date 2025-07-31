import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import EmployeeDetailsPage from '../[id]';

vi.mock('next/router', () => ({
  useRouter: () => ({ query: { id: '1' }, back: vi.fn() }),
}));

const mockEmployee = {
  id: 1,
  name: 'Jane Doe',
  title: 'Senior Consultant',
  studio: 'NY',
  practice: 'Tech',
  region: 'US',
  location: 'Remote',
  skill_level: 'Expert',
  current_assignment: 'Project Alpha',
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockEmployee),
  })
) as unknown as typeof fetch;

describe('EmployeeDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders employee details', async () => {
    render(<EmployeeDetailsPage />);
    await waitFor(() => {
      expect(screen.getByText(mockEmployee.name)).toBeInTheDocument();
      expect(screen.getByText(/Senior Consultant/)).toBeInTheDocument();
      expect(screen.getByText(/Project Alpha/)).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<EmployeeDetailsPage />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('shows error if fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API error'));
    render(<EmployeeDetailsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch employee/)).toBeInTheDocument();
    });
  });

  it('shows not found if employee is null', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(null) }));
    render(<EmployeeDetailsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Employee not found/)).toBeInTheDocument();
    });
  });
});
