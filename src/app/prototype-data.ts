export interface DemoView {
  name: string;
  icon: string;
  description: string;
  metric: string;
  value: string;
  columns: string[];
  rows: string[][];
}
export const DEMO_VIEWS: DemoView[] = [
  {
    name: 'Overview',
    icon: '◫',
    description: 'A high-volume wholesale business, with every moving part connected.',
    metric: 'Sales this month',
    value: '₹1,28,40,000',
    columns: ['Invoice', 'Customer', 'Amount', 'Status'],
    rows: [
      ['INV-1048', 'Modern Stores', '₹8,40,000', 'Paid'],
      ['INV-1047', 'Green Leaf Café', '₹4,80,000', 'Pending'],
      ['INV-1046', 'Aarya Traders', '₹12,60,000', 'Paid'],
    ],
  },
  {
    name: 'Sales',
    icon: '↗',
    description: 'From the first sale to the occasional return.',
    metric: 'Sales this month',
    value: '₹1,28,40,000',
    columns: ['Document', 'Customer', 'Amount', 'Status'],
    rows: [
      ['INV-1048', 'Modern Stores', '₹8,40,000', 'Paid'],
      ['INV-1047', 'Green Leaf Café', '₹4,80,000', 'Pending'],
      ['RET-012', 'Aarya Traders', '₹36,000', 'Returned'],
    ],
  },
  {
    name: 'Purchases',
    icon: '↙',
    description: 'Keep supplier purchases and returns together.',
    metric: 'Purchases this month',
    value: '₹86,40,000',
    columns: ['Document', 'Supplier', 'Amount', 'Status'],
    rows: [
      ['PUR-241', 'South India Supply', '₹16,80,000', 'Received'],
      ['PUR-240', 'Prime Distributors', '₹9,60,000', 'Ordered'],
      ['PR-018', 'South India Supply', '₹72,000', 'Returned'],
    ],
  },
  {
    name: 'Inventory',
    icon: '▦',
    description: 'Know what you have. Know what needs attention.',
    metric: 'Products in stock',
    value: '12,480',
    columns: ['Product', 'Group', 'Stock', 'Status'],
    rows: [
      ['Classic notebook', 'Stationery', '4,800 units', 'In stock'],
      ['Ceramic mug', 'Home essentials', '8 units', 'Low stock'],
      ['Cotton tote bag', 'Accessories', '2,400 units', 'In stock'],
    ],
  },
  {
    name: 'Orders',
    icon: '▤',
    description: 'Follow every order from placed to delivered.',
    metric: 'Active orders',
    value: '186',
    columns: ['Order', 'Customer', 'Expected', 'Status'],
    rows: [
      ['ORD-381', 'Modern Stores', '26 Nov', 'Processing'],
      ['ORD-380', 'Green Leaf Café', '25 Nov', 'Dispatched'],
      ['ORD-379', 'Aarya Traders', '24 Nov', 'Delivered'],
    ],
  },
  {
    name: 'Reorders',
    icon: '⟳',
    description: 'Catch low stock before it slows business down.',
    metric: 'Items to reorder',
    value: '3',
    columns: ['Product', 'Available', 'Reorder level', 'Status'],
    rows: [
      ['Ceramic mug', '8 units', '20 units', 'Low stock'],
      ['Gift box', '4 units', '15 units', 'Low stock'],
      ['Packing tape', '6 units', '10 units', 'Low stock'],
    ],
  },
  {
    name: 'Contacts',
    icon: '♧',
    description: 'Your customers and suppliers, all in one place.',
    metric: 'Business contacts',
    value: '842',
    columns: ['Name', 'Type', 'Balance', 'Status'],
    rows: [
      ['Modern Stores', 'Customer', '₹0', 'Settled'],
      ['Green Leaf Café', 'Customer', '₹4,80,000', 'Pending'],
      ['South India Supply', 'Supplier', '₹9,60,000', 'Pending'],
    ],
  },
  {
    name: 'Accounts',
    icon: '▥',
    description: 'Make sense of money coming in and going out.',
    metric: 'Receipts this month',
    value: '₹1,18,60,000',
    columns: ['Entry', 'Ledger', 'Amount', 'Type'],
    rows: [
      ['REC-084 · Modern Stores', 'Sales ledger', '₹8,40,000', 'Receipt'],
      ['PAY-062 · Supplier', 'Purchases ledger', '₹9,60,000', 'Payment'],
      ['EXP-031 · Delivery', 'Operating expenses', '₹48,000', 'Expense'],
    ],
  },
  {
    name: 'Estimates',
    icon: '▧',
    description: 'Turn a conversation into a clear quotation.',
    metric: 'Open estimates',
    value: '64',
    columns: ['Estimate', 'Customer', 'Amount', 'Status'],
    rows: [
      ['EST-142', 'Modern Stores', '₹18,40,000', 'Accepted'],
      ['EST-141', 'Green Leaf Café', '₹9,75,000', 'Draft'],
      ['EST-140', 'Aarya Traders', '₹24,80,000', 'Sent'],
    ],
  },
  {
    name: 'AI & automation',
    icon: '✧',
    description: 'Give every enquiry a thoughtful next step.',
    metric: 'Enquiries awaiting review',
    value: '38',
    columns: ['Enquiry', 'Channel', 'Next step', 'Status'],
    rows: [
      ['Bulk order availability', 'WhatsApp', 'Review suggested reply', 'Draft'],
      ['Quotation follow-up', 'WhatsApp', 'Review reminder', 'Scheduled'],
      ['Delivery question', 'Website', 'Assign to sales', 'New'],
    ],
  },
];

// Fictional scenario, not measured customer outcomes. Sales = receipts + receivables.
export const DEMO_BUSINESS = {
  name: 'Kaveri Wholesale',
  sales: 12840000,
  purchases: 8640000,
  receipts: 11860000,
  outstanding: 980000,
  monthlyOrders: 1200,
  manualMinutesPerOrder: 6,
  connectedMinutesPerOrder: 2,
  monthlySalesLakhs: [72, 81, 94, 103, 116, 128.4],
};
