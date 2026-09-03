export const serviceCategories = [
  {
    id: 'CLEANING_HOUSEKEEPING',
    label: 'Deep Cleaning & Housekeeping',
    description: 'Book scheduled cleaning, sanitization or daily housekeeping.',
    subServices: ['Daily Cleaning', 'Deep Cleaning', 'Sanitization'],
  },
  {
    id: 'ON_DEMAND_REPAIR',
    label: 'On-Demand Repairs',
    description: 'Electrical, plumbing, carpentry and more with verified local technicians.',
    subServices: ['Electrical', 'Plumbing', 'Carpentry'],
  },
  {
    id: 'CONCIERGE_LIFESTYLE',
    label: 'Concierge & Lifestyle',
    description: 'Laundry pickups, parcel management and other lifestyle assistance.',
    subServices: ['Laundry Pickup', 'Parcel Management', 'Other Assistance'],
  },
]

export const statusStages = ['RECEIVED', 'ASSIGNED', 'ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED']

export const statusLabels: Record<string, string> = {
  RECEIVED: 'Request Received',
  ASSIGNED: 'Assigned',
  ON_THE_WAY: 'On The Way',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

// Design & Rent-to-Condition pricing — placeholder values, update when real pricing is finalized
export const furnishingPackages = [
  { id: 'UNFURNISHED', label: 'Unfurnished', desc: 'Basic unfurnished space.', monthlyCost: 0 },
  { id: 'SEMI_FURNISHED', label: 'Semi-Furnished (Smart Living)', desc: 'Essential fittings with smart living features.', monthlyCost: 4000 },
  { id: 'FULLY_FURNISHED', label: 'Fully Furnished (Designer Suite)', desc: 'Premium furniture & designer interiors.', monthlyCost: 8500 },
]

export const designAddOns = [
  { id: 'Modular Kitchen', label: 'Modular Kitchen', monthlyCost: 1500 },
  { id: 'Smart Home', label: 'Smart Home Automation', monthlyCost: 1000 },
  { id: 'Furniture', label: 'Premium Furniture', monthlyCost: 800 },
  { id: 'Lighting & Curtains', label: 'Lighting & Curtains', monthlyCost: 500 },
]

export const interiorStyles = ['Minimalist', 'Modern Industrial', 'Contemporary']