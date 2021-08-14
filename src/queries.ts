
import { gql } from "@apollo/react-hooks";
export const productQuery  =  gql`
        query getProductById($productId: ID!) {
            product(productId: $productId) {
              id
              name
              power
              description
              price
              quantity
              brand
              weight
              height
              width
              length
              modelCode
              colour
              imgUrl
            }
          }`;