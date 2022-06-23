export interface ProductModel{
    product_id?: string
    product_name: string
    product_image_url: string
    product_description: string
    product_price: number
    ordered_quantity?:number
    product_in_stock?: number
    product_category: string;
    isDeleted?: boolean;
}