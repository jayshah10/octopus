import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";

export const Panel : FunctionComponent<{alternate?:boolean, title?:string}> = props => <div 
    style={{padding:'16px', display:'flex', flexDirection:'column', background: props.alternate ? '#02122d' : undefined}}> 
    {props.title && <Typography variant={'h4'}>{props.title}</Typography> }
    {props.children}
</div>