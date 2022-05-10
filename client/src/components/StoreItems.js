import axios from 'axios';
import { Component } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





class StoreItems extends Component{

    state = {
        items:[],
        favourites:[],
        updatedItems:[],

    }


    constructor(props){
        super(props);
        this.setState({items:[...props.data]}) 
        this.setState({favourites:[...props.favourites] });
    }
    componentDidMount(){
        const items = this.props.data;
        if(this.state.items != this.props.data ){
            
            this.setState({items: this.props.data})
        }
    }
    componentDidUpdate(){
        const items = this.state.items;
        if(items != this.props.data ){
            this.setState({items: this.props.data})
         }
         const favourites = this.state.favourites;
         if(favourites != this.props.favourites){
             this.setState({favourites:this.props.favourites})
         }
    }
    
    
    render(){
        

        const favourite = (id) =>{
            const favourites = this.state.favourites;
            if(favourites.includes(id)){
                return require('../assets/favourite_red.png')
            }
            return require('../assets/favourite.png')
        }

        const update = async(id) =>{
            let favourites = this.state.favourites;
            const user = this.props.user;
            
            if(user){
                
                await axios.post('/api/profile/favourites/update',{itemID:id, username:user})
                this.props.refresh()

            }else{
                this.props.navigate('/login')
            }
        }

        

        

        return(
            <div className='grid justify-center mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-2'>
                {
                    this.state.items.map(item => {
                        return(
                            <div key={item._id}  className="border-2 w-56 p-5 border-[#368481] w-fit">
                                <Link to={`/store/item/${item._id}`}>
                                    <img src={item.image} className='w-full border-[#368481] rounded-lg border-2 h-36'/>

                                </Link>
                                <div className='flex mt-5 text-xs gap-5'>
                                    <div className='font-bold'> 
                                        {item.category}
                                    </div>
                                    <div className='flex gap-2 w-full flex-col'>
                                        <div>{item.name}</div>
                                        <div> ${parseFloat(item.price)}</div>
                                       <div className='flex items-center  justify-between'> 
                                           <Link to={`/user/${item.owner}`} className='text-blue-600 w-18 truncate overflow-ellipsis underline'>@{item.owner}</Link>
                                           <img 
                                            onClick={() => update(item._id)}
                                            src={favourite(item._id)}  
                                            className='w-5 cursor-pointer h-5'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })

                }
            </div>
        )
    }
}

const withNavigation = (Component) =>{
    
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
      }
}

export default withNavigation(StoreItems);