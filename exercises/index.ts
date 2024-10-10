enum Priority {
  NORMAL = "Normal",
  PRIORITY = "Priority",
  URGENT = "Urgent",
}

class Luggage {
  #weight: number;
  #description: string;
  #priority: Priority;
  #fee: number;
  constructor(
    weight: number,
    description: string,
    priority: Priority,
    fee?: number
  ) {
    this.#weight = weight;
    this.#description = description;
    this.#priority = priority;
    this.#fee = fee ? fee : 0;
  }

  getWeight() {
    return this.#weight;
  }

  setWeight(weight: number) {
    this.#weight = weight;
  }
  getDescription() {
    return this.#description;
  }
  getPriority() {
    return this.#priority;
  }
  getInsuranceValue() {
    return 0;
  }
  setInsuranceValue(insuranceValue: number) {
    throw "insurance is only applicable to fragile luggage.";
  }

  getPrice() {}
  toString() {
    return `Description: ${this.#description}, type: ${this.constructor.name}`;
  }
}

class CarryOnLuggage extends Luggage {}

class FragileLuggage extends Luggage {
  #insuranceValue: number;
  constructor(
    weight: number,
    description: string,
    priority: Priority,
    fee: number
  ) {
    super(weight, description, priority, fee);
    this.#insuranceValue = 0;
  }
  getInsuranceValue() {
    return this.#insuranceValue;
  }
  setInsuranceValue(insuranceValue: number) {
    this.#insuranceValue = insuranceValue;
  }
  toString() {
    return `${this.getDescription()} ${this.constructor.name} ${
      this.#insuranceValue
    }`;
  }
}

class RegularLuggage extends Luggage {}

const fragileLuggage = new FragileLuggage(
  10,
  "Box with fragile items",
  Priority.NORMAL,
  100
);
fragileLuggage.setInsuranceValue(17)
const regularLuggage = new RegularLuggage(
  30,
  "Luggage full of clothes",
  Priority.PRIORITY
);
const carryOnLuggage = new CarryOnLuggage(
  6,
  "Luggage with personal items",
  Priority.URGENT
);
console.log(carryOnLuggage.toString());