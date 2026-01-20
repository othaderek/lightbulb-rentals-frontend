export const STORES = [
  {
    code: 'NYC',
    name: 'Lightbulb Rentals New York',
    shortName: 'New York',
    address: '1027 Grand Street – Unit #133',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11211',
    phone: '(516) 515-1514',
    email: 'info@lightbulbrentals.com',
    hours: 'Mon-Fri 9 AM-5 PM',
  },
  {
    code: 'PHL',
    name: 'Lightbulb Rentals Philadelphia',
    shortName: 'Philadelphia',
    address: '4562 Worth Street',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19124',
    phone: '(215) 687-9394',
    email: 'info@lightbulbrentals.com',
    hours: 'Mon-Fri 9 AM-5 PM',
  },
  {
    code: 'PGH',
    name: 'Lightbulb Rentals Pittsburgh',
    shortName: 'Pittsburgh',
    address: '1917 Brownsville Road',
    city: 'Pittsburgh',
    state: 'PA',
    zip: '15210',
    phone: '(412) 212-0822',
    email: 'info@lightbulbrentals.com',
    hours: 'Mon-Fri 9 AM-5 PM',
  },
] as const;

export type Store = typeof STORES[number];

export const getStore = (code: string) => STORES.find(s => s.code === code);
