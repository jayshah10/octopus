import { AppBar, Toolbar, Typography } from "@material-ui/core"; 
import { Basket } from '../cart';
import { Panel } from "./panel";


export const PageWrapper = (props:{render:()=>React.ReactNode}) => { 
    return <div style={{height:'100vh', padding:'0 important!', display:'flex', flexDirection:'column'}}>
                <AppBar style={{ background: '#070c1f' }} position="static">
                <Toolbar>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flex:'1 1 auto'}}> 
                        <img style={{height:'1.5em'}} src={'/assets/logo.svg'} alt={'octopus logo'}/>
                        <Basket/>
                    </div>
                </Toolbar>
                </AppBar>
                <div style={{display:'flex', flex:'1 1 auto', overflow:'hidden'}}>
                    <div style={{display:'flex', flex:'1 1 auto', flexDirection:'column', overflow:'auto'}}> 
                        {props.render()}
                    </div>
                </div>
                <Panel alternate={true}>
                    <Typography style={{
                        fontSize: '0.6rem',
                        fontWeight: 'lighter',
                    }}  color={"secondary"}>
                    Octopus Energy Ltd is a company registered in England and Wales. Registered number: 09263424. Registered office: 33 Holborn, London, EC1N 2HT. Trading office: 2nd Floor, UK House, 164-182 Oxford Street, London W1D 1NN.
                    </Typography>
                </Panel>
    </div>
}