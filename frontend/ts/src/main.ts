type Employee = {
  readonly id: number,
  name: string,
  retire: (date: Date) => void
};

let worker: Employee = { id: 1, name: 'John', retire: (d) => {} };