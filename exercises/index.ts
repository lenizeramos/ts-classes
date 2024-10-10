enum Priority {
  NORMAL = "Normal",
  PRIORITY = "Priority",
  URGENT = "Urgent",
}

abstract class Luggage {
  #weight: number;
  #description: string;
  #priority: Priority;
  protected fee: number = 5.2;
  constructor(weight: number, description: string, priority: Priority) {
    this.#weight = weight;
    this.#description = description;
    this.#priority = priority;
  }

  getWeight(): number {
    return this.#weight;
  }

  setWeight(weight: number): void {
    this.#weight = weight;
  }
  getDescription(): string {
    return this.#description;
  }
  getPriority(): Priority {
    return this.#priority;
  }
  getInsuranceValue(): number {
    return 0;
  }
  setInsuranceValue(insuranceValue: number) {
    throw "insurance is only applicable to fragile luggage.";
  }

  abstract getPrice(): number;

  toString(): string {
    return `Description: ${this.#description}, Type: ${
      this.constructor.name
    }, Price: ${this.getPrice()}, Weight: ${this.getWeight()}`;
  }
}

class CarryOnLuggage extends Luggage {
  getPrice(): number {
    if (this.getWeight() <= 5) {
      return 0;
    }
    const extraWeight = this.getWeight() - 5;
    return this.fee * 3 * extraWeight;
  }
}

class FragileLuggage extends Luggage {
  #insuranceValue: number;
  constructor(
    weight: number,
    description: string,
    priority: Priority,
    insuranceValue: number
  ) {
    super(weight, description, priority);
    this.#insuranceValue = insuranceValue;
  }
  getInsuranceValue(): number {
    return this.#insuranceValue;
  }
  setInsuranceValue(insuranceValue: number): void {
    this.#insuranceValue = insuranceValue;
  }
  getPrice(): number {
    if (this.getPriority() === Priority.NORMAL) {
      return this.getInsuranceValue();
    } else if (this.getPriority() === Priority.PRIORITY) {
      return this.fee * 5 + this.getInsuranceValue();
    } else {
      return this.fee * 10 + this.getInsuranceValue();
    }
  }

  toString(): string {
    return `${super.toString()}, Insurance value:${this.#insuranceValue}`;
  }
}

class RegularLuggage extends Luggage {
  getPrice(): number {
    let price: number = 0;
    if (this.getWeight() > 23) {
      const extraWeight = this.getWeight() - 23;
      if (this.getPriority() === Priority.NORMAL) {
        price = this.fee * extraWeight;
      }
      if (this.getPriority() === Priority.PRIORITY) {
        price = this.fee * 5 * extraWeight;
      }
      if (this.getPriority() === Priority.URGENT) {
        price = this.fee * 10 * extraWeight;
      }
    }
    return price;
  }
}

class ListOfLuggages {
  #luggages: Luggage[] = [];

  insertLuggage(luggage: Luggage): void {
    this.#luggages.push(luggage);
  }
  printAllLuggages(): void {
    this.#luggages.forEach((luggage) => {
      console.log(luggage.toString());
    });
  }
  priceOfEachLuggage(): void {
    this.#luggages.forEach((luggage) => {
      console.log(`${luggage.getPrice()}`);
    });
  }
  totalPrice(): number {
    return this.#luggages.reduce(
      (total, luggage) => total + luggage.getPrice(),
      0
    );
  }

  getFragileLuggageWithInsurance(): {    quantity: number;    totalInsurance: number;  } {
    let quantity = 0;
    let totalInsurance = 0;

    this.#luggages.forEach((luggage) => {
      if (luggage instanceof FragileLuggage) {
        quantity++;
        totalInsurance += luggage.getInsuranceValue();
      }
    });

    return { quantity, totalInsurance };
  }

  sortByPrice(): void {
    this.#luggages.sort((a, b) => a.getPrice() - b.getPrice());
  }

  sortByWeight(): void {
    this.#luggages.sort((a, b) => a.getWeight() - b.getWeight());
  }
}

const fragileLuggage = new FragileLuggage(
  10,
  "Box with fragile items",
  Priority.NORMAL,
  100
);
fragileLuggage.setInsuranceValue(17);
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

//console.log(carryOnLuggage.getPrice());
const list = new ListOfLuggages();
list.insertLuggage(fragileLuggage);
list.insertLuggage(regularLuggage);
list.insertLuggage(carryOnLuggage);

list.printAllLuggages();
list.priceOfEachLuggage();

console.log(list.totalPrice());
list.printAllLuggages();
list.sortByPrice();
list.printAllLuggages();
list.sortByWeight();
list.printAllLuggages();
//console.log(list.getFragileLuggageWithInsurance());
