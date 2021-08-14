import { useParams } from "react-router";
import { IProduct } from "../../types";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ProductInfo } from "./product-info";
import {Panel, PageWrapper} from '../../components';
import { useQuery } from "@apollo/react-hooks";
import {productQuery} from '../../queries';

export const ProductPage = () => {
    const { productId } = useParams<{productId:string}>(); 
    const { loading, error, data } = useQuery(productQuery, {variables:{productId}});
    
    const getProductFromData = () => {
        return data?.product as IProduct
    }
     
    return <PageWrapper render={() => { 
        return loading ? 
             <Panel>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <CircularProgress/>
                </div>
             </Panel> : 
             error ? 
             <Panel>
                 <Alert  variant="filled" severity="error">Could not load product info!</Alert>
             </Panel>
             : <ProductInfo product={getProductFromData()}/> ;  
    }} /> 
}