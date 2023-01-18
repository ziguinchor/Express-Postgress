import { client } from './../config/database';



export class Product {

 
    async create(product: any) {

        let  { name, price, category } = product

        try {
        
          await client.query(`INSERT into products(name,price,category) VALUES($1,$2,$3)`,
                             [name,price,category])

        } catch (error) {
             console.log(error)
        }
    }

    async getProducts() {

           try {
            
            return  (await client.query("SELECT * FROM products")).rows

           } catch (error) {
            console.log(error)
           }
    }

    async getProductById(id: number) {

               try {

                return (await client.query(`SELECT * FROM products WHERE id = $1  LIMIT 1`,[id])).rows[0]

               } catch (error) {
                 console.log(error)
               }
    }

    async update(product: any, id: number) {

         let { name, price, category } = product


        try {

           return (await client.query(`UPDATE products SET name=$1, price=$2, category=$3 where id=$4 `,
                                 [name,price,category,id])).rows[0]
            
        } catch (error) {
            console.log(error)
        }

    }

    async delete(id: number) {

         try {
            
            return (await client.query(`DELETE FROM products WHERE id=$1`,[id])).rows[0]

         } catch (error) {
             console.log(error)
         }

    }



}