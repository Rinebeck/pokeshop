const baseUrl = "https://pokeapi.co/api/v2/";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  imageAlt: string;
  imageCredit: string;
}
export interface Item {
  id: string | number;
  name: string;
  price: number;
  description: string;
  url: string;
  imageURL: string;
}

export interface ApiItem {
  name: string;
  url: string;
}

export interface ApiItemDetail {
  id: string | number;
  name: string;
  cost: number;
  description: string;
  imageURL: string;
}

export const fetchItems = async (limit: number) => {
  const response = await fetch(`${baseUrl}item?limit=${limit}`);
  const items = await response.json();
  for (const item of items.results) {
    var product = await fetchItem(item.name);
    item.id = product.id;
    item.name = product.name;
    item.price = product.cost;
    item.description = product.description;
    item.imageURL = product.imageURL;
  }
  return items.results;
};

export const fetchItem = async (id: string): Promise<ApiItemDetail> => {
  const response = await fetch(`${baseUrl}item/${id}`);
  const item = await response.json();
  return {
    id: item.id,
    name: item.name,
    cost: item.cost < 1 ? 1000 : item.cost,
    description: item.effect_entries[0].effect,
    imageURL: item.sprites.default,
  };
};

export type CartItems = { [productID: string]: number };
