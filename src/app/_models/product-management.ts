export interface ProductCategory {
    id: Number;
    name: string;
    imageFile:string;
}

export interface ReferenceUnit {
    name: string;
    value:number;
}

export interface Product {
    productCategoryId:number;
    id:number;
    image:string;
    name: string;
    description: string;
    maxOptions: number;
    numOptions: number;
    cost: number;
    costPerUnit: number;
    unitType: string;
    min: number;
    max: number;
}

export interface Option {
    id:number;
    name: string;
    image:string;
    description: string;
    cost: number;
    costPerUnit: number;
    unitType: string;
}

export interface Addition {
    id:number;
    name: string;
    image:string;
    description: string;
    cost: number;
    costPerUnit: number;
    unitType: string;
}