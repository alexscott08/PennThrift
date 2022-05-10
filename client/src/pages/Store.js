import StoreItems from "../components/StoreItems";
import Header from "../components/Header";
import { Component } from "react";
import axios from "axios";
import { getUserFavourites } from "../api/ProfileAPI";


export default class Store extends Component {

    state = {
        items:[],
        keyword:'',
        searchCategories:[],
        user:'',
        processed:false,
        favourites:[],
    }
    
    componentDidMount(){
        if(this.state.items.length === 0){
    
            axios.get('/api/item/all')
                    .then( res => this.setState({items: res.data}))
                    .catch(e => console.log(e))

        }
        this.setUp()

    }
    async setUp(){
        const user = this.state.user;
        const processed = this.state.processed;
        if(!user && !processed ){
            const res = await axios.get('/api/auth/user');
            this.setState({user:res.data});
            this.setState({processed:true});
            
        }
        if(user && this.state.favourites.length == 0){
            const favourites = await getUserFavourites(user);
            favourites.map( f => {
                this.setState({favourites: [...this.state.favourites, f._id]})
            });
            if(favourites.length == 0){
                this.setState({favourites: ['']})
            }

        }
        
    }

    refresh = async() => {
        const user = this.state.user;
        if(user){
            const favourites = await getUserFavourites(user);
            favourites.map( f => {
                this.setState({favourites: [...this.state.favourites, f._id]})
            });
            if(favourites.length == 0){
                this.setState({favourites: ['']})
            }
        }
    }
    componentDidUpdate(){
        if(this.state.items.length === 0){
    
            axios.get('/api/item/all')
                    .then( res => {this.setState({items: res.data})})
                    .catch(e => console.log(e))
        }
        this.setUp();

    }

    search(items){
        let searchedItems = []
        const keyword = this.state.keyword.toLowerCase();
        const searchCategories = this.state.searchCategories;
        if(searchCategories.length > 0){
            items.map( item => {
                if(searchCategories.includes(item.category)){
                    if(keyword && !searchedItems.includes(item) && item.name.toLowerCase().includes(keyword) ){
                        
                        searchedItems.push(item)
                    }else if(!keyword && !searchedItems.includes(item)){
                        searchedItems.push(item)
                    }
                }else{
                }
            })
        }
        if(keyword){
            items.map( item => {
                if(item.name.toLowerCase().includes(keyword )){
                    if(searchCategories.length > 0 && !searchedItems.includes(item) && searchCategories.includes(item.category)){
                        searchedItems.push(item)

                    }else if(searchCategories.length === 0 && !searchedItems.includes(item) ){
                        searchedItems.push(item)
                    }
                }
            })
        }
        const searched = !!keyword || searchCategories.length > 0 ;
        return searchedItems.length > 0 || searched ? searchedItems : items;
    }
    addSearchCategory(category){
        let searchCategories = [...this.state.searchCategories];
        if(searchCategories.includes(category)){
            searchCategories =  searchCategories.filter( (item) =>{
                return item !== category;
            });
            this.setState({searchCategories:searchCategories})
        }
        else{
            this.setState({searchCategories:[...searchCategories, category]})
        }
    }


    render(){
        
    const categories  = ['For Fun', 'Vehicle', 'Apparel', 'Tickets', 
                            'Furniture', 'Electronics', 'Books/ notes', 'Miscellaneous']

        return(
            <div>
                <Header/>
                <div className="grid grid-main justify-center w-full h-full px-5 md:px-10">
                    <div className="grid my-10 mt-20 gap-10 grid-cols-4 ">
                        <div className="lg:col-span-1 col-span-4 flex gap-2 flex-col">
                            <div className="text-base">
                                Search by <span className="font-semibold"> keyword</span>
                            </div>
                            <div className="">
                                <input onChange={(e) => this.setState({keyword:e.target.value})} placeholder="Search" className="border py-1 border-black text-sm px-5" />
                            </div>
                        </div>
                        <div className="lg:col-span-2 col-span-4 flex gap-2 flex-col">
                            <div className="text-base">
                                Search by <span className="font-semibold"> category</span>
                            </div>
                            <div className="grid grid-cols-3 gap-y-2 text-xs accent-black grid-rows-2">
                                {
                                    categories.map( catg => {
                                        return(
                                            
                                            <span  className="flex gap-2 items-center"><input  onClick={() => this.addSearchCategory(catg)} type='checkbox'/> <span>{catg}</span></span>
                                        )
                                    } )
                                }
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-4 flex gap-2 flex-col">
                            <div className="text-base">
                                Select <span className="font-semibold"> view</span>
                            </div>
                            <div className="text-xs grid gap-2 accent-black">
                                <span className="flex gap-2 items-center"><input type='checkbox'/> <span>List</span></span>
                                <span className="flex gap-2 items-center"><input type='checkbox'/> <span>Map</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {
                            this.state.processed && 
                            <StoreItems
                                refresh = {this.refresh}
                                favourites={this.state.favourites}
                                user={this.state.user}
                                data={this.search(this.state.items)}/>
                        }
                    </div>
                </div>
                
            </div>
        )
    }

    
}

