import { IProduct } from "../../../types";
import { Typography } from "@material-ui/core";
import { AddToCart } from "../../../cart";
import { Panel } from '../../../components';

export const Description = (props:{product:IProduct}) => {
    return <Panel title={'Description'} alternate={true}>
        <Typography variant={'body1'}>{props.product.description}</Typography>  
    </Panel>
}

export const Specifications = (props:{product:IProduct}) =>{
    const getDimensions = () => `${props.product.height} x ${props.product.length} x ${props.product.width}`; 
    const properties = [
        {label:'Brand', value:props.product.brand}, 
        {label:'Item Weight', value:props.product.weight}, 
        {label:'Dimensions', value:getDimensions()}, 
        {label:'Item Model Number', value:props.product.modelCode}, 
        {label:'Colour', value:props.product.colour}
    ]
    return <Panel title={'Specifications'}>
        {properties.map(property => <div key={property.label} style={{
            display:'flex', 
            padding:'4px 0px', 
            borderBottom:'solid 1px #02122d',
            justifyContent:'space-between'
            }}>
            <div style={{width:'33%'}}>
                <Typography variant={'body1'}>{property.label}</Typography>
            </div>
            <div style={{flex:'1 1 auto'}}>
                <Typography variant={'body1'}>{property.value}</Typography>
            </div>
        </div>)}
    </Panel>
}

export const ProductInfo = (props:{product:IProduct}) => {
    const renderHeader = () => { 
        return <>
            <Panel>
            <img src={props.product.imgUrl} alt={props.product.name} style={{
                maxHeight: '25vh',
                width: 'auto',
                margin: '32px auto',
            }}/>
            </Panel>
            <Panel alternate={true}>
                <Typography variant={'h1'}>{props.product.name}</Typography>
                <Typography variant={'caption'}>
                    {`${props.product.power} // Packet of ${props.product.quantity}`}
                </Typography>
        </Panel>
        </>
    };

    //including a dummy div with testing id so we can check this has rendered before testing
    return <>
        <div data-testid={'productInfoPage'}/> 
        {renderHeader()}
        <div>
            <AddToCart product={props.product}/>
        </div>
        <Description product={props.product}/>
        <Specifications product={props.product}/>
    </>
}