import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.init();
    }

    async init() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]', 'utf-8');
            }
        } catch (error) {
            console.error("Error al inicializar ProductManager:", error);
        }
    }

    async getProducts(limit) {
        try {
            const products = await fs.promises.readFile(this.path, "utf8");
            let parsedProducts = JSON.parse(products);
            if (limit) {
                parsedProducts = parsedProducts.slice(0, limit);
            }
            return parsedProducts;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async createProduct(obj) {
        try {
            const product = {
                id: uuidv4(),
                status: true,
                ...obj,
            };
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const productExist = products.find((p) => p.id === id);
            if (!productExist) return null;
            return productExist;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(obj, id) {
        try {
            let products = await this.getProducts();
            const index = products.findIndex((p) => p.id === id);
            if (index === -1) {
                throw new Error("Producto no encontrado");
            }
            products[index] = { ...products[index], ...obj };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
            return products[index];
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            const filteredProducts = products.filter((p) => p.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2), 'utf-8');
            return true;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            return false;
        }
    }

    async deleteFile() {
        try {
            await fs.promises.unlink(this.path);
            console.log("Archivo de productos eliminado");
        } catch (error) {
            console.error("Error al eliminar archivo de productos:", error);
        }
    }
}
