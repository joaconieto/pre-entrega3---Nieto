class ShopItem {
    constructor(id, img, description, price, quantity){
        this._id = id;
        this._img = img;
        this._description = description;
        this._price = price;
        this._quantity = quantity;
    }
    get id(){
        return this._id;
    }
    
    get img(){
        return this._img;
    }
    set img(newImg){
        this._img = newImg;
    }

    get description(){
        return this._description;
    }
    set description(newdescription){
        this._description = newdescription;
    }

    get price(){
        return this._price;
    }
    set price(newPrice){
        this._price = newPrice;
    }

    get quantity(){
        return this._quantity;
    }
    set quantity(newQuantity){
        this._quantity = newQuantity;
    }
}
export {ShopItem}