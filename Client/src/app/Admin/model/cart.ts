export interface Cart{
    order_id?:string
    quantity_ordered: number
    total_price:number
    product_name?: string
    product_image_url: string
    full_name: string
}